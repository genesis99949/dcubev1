// Frame-accurate scroll recording of a client page (static server, no backend). 30 fps JPEG frames;
// encode with: ffmpeg -framerate 30 -i <outDir>/f%04d.jpg -c:v libx264 -crf 17 -pix_fmt yuv420p out.mp4
// Needs puppeteer-core: `npm i -D puppeteer-core`.
// usage: node scripts/site-capture/record.mjs <outDir> <page.html> <keyframes "t:y,t:y,..."> [seconds] [mobile]
// PureFlame homepage: "0:0,1.3:0,2.6:900,3.3:900,4.6:1800,5.3:1800,6.9:3600,7.7:3600,9.2:5600,11:5600" 11
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

// Folder of the static site to capture (set SITE_DIR or edit this default).
const SITE = process.env.SITE_DIR ?? "F:\\Projects\\Pureflame\\Website\\PF Copy - Git - Editorial Integration";
// Remotion's bundled headless Chrome (downloaded on the first render).
const CHROME = path.resolve(
  "node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe",
);
const PORT = 4311;
const [OUT, PAGE, KEYS, SECONDS = "11", MODE = "desktop"] = process.argv.slice(2);
const FPS = 30;

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".mp4": "video/mp4",
  ".webm": "video/webm", ".woff2": "font/woff2", ".ttf": "font/ttf", ".otf": "font/otf",
  ".glb": "model/gltf-binary",
};
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(SITE, url === "/" ? "index.html" : url);
  if (!file.startsWith(SITE) || url.startsWith("/api/")) { res.writeHead(404).end(); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end(); return; }
    const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
    const range = req.headers.range;
    if (range) {
      const [s, e] = range.replace("bytes=", "").split("-");
      const start = Number(s); const end = e ? Number(e) : st.size - 1;
      res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Accept-Ranges": "bytes" });
    fs.createReadStream(file).pipe(res);
  });
});
await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport(
  MODE === "mobile"
    ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900, deviceScaleFactor: 4 / 3 },
);
await page.evaluateOnNewDocument(() => {
  try { sessionStorage.setItem("pf-signature-intro-seen-v5", "1"); } catch {}
  try { localStorage.setItem("pf-newsletter", JSON.stringify({ subscribed: true })); } catch {}
  // Remove ScrollSmoother's lag so every frame sits exactly at the requested scroll position.
  let real;
  Object.defineProperty(window, "ScrollSmoother", {
    configurable: true,
    get: () => real,
    set: (v) => {
      real = v;
      const create = v.create.bind(v);
      v.create = (opts) => create({ ...opts, smooth: 0, smoothTouch: 0 });
    },
  });
});
await page.goto(`http://localhost:${PORT}/${PAGE}`, { waitUntil: "networkidle2", timeout: 60000 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(2500);

const scrollTo = (y) =>
  page.evaluate(async (yy) => {
    const s = window.ScrollSmoother && window.ScrollSmoother.get && window.ScrollSmoother.get();
    if (s) s.scrollTo(yy, false); else window.scrollTo(0, yy);
    if (window.ScrollTrigger) window.ScrollTrigger.update();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, y);

// Reveal everything once, then return to the top.
const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < height; y += 400) { await scrollTo(y); await sleep(250); }
await scrollTo(0);
await sleep(1500);

const keys = KEYS.split(",").map((k) => k.split(":").map(Number));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const yAt = (t) => {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, y0] = keys[i]; const [t1, y1] = keys[i + 1];
    if (t <= t1) return y0 + (y1 - y0) * ease((t - t0) / (t1 - t0));
  }
  return keys[keys.length - 1][1];
};

// Freeze page videos and drive them from the recording clock, so they play at real speed
// in the final 30 fps video even though each screenshot takes longer than 1/30 s.
await page.evaluate(() => {
  document.querySelectorAll("video").forEach((v) => {
    v.pause();
    v.dataset.recT0 = String(v.currentTime || 0);
  });
});
const syncVideos = (t) =>
  page.evaluate(async (tt) => {
    const vids = [...document.querySelectorAll("video")].filter((v) => v.readyState >= 1 && v.duration > 0);
    await Promise.all(
      vids.map((v) => new Promise((resolve) => {
        v.pause();
        const target = (Number(v.dataset.recT0 || 0) + tt) % v.duration;
        if (Math.abs(v.currentTime - target) < 0.001) return resolve();
        const done = () => { clearTimeout(timer); resolve(); };
        const timer = setTimeout(done, 800);
        v.addEventListener("seeked", done, { once: true });
        v.currentTime = target;
      })),
    );
  }, t);

fs.mkdirSync(OUT, { recursive: true });
const frames = Math.round(Number(SECONDS) * FPS);
for (let f = 0; f < frames; f++) {
  await syncVideos(f / FPS);
  await scrollTo(Math.round(yAt(f / FPS)));
  await page.screenshot({ path: path.join(OUT, `f${String(f).padStart(4, "0")}.jpg`), type: "jpeg", quality: 90 });
  if (f % 30 === 0) console.log(`frame ${f}/${frames}`);
}
console.log(`page height ${height}`);
await browser.close();
server.close();
