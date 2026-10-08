// Serves a client site statically (no backend, no .env) and captures hi-res screenshots.
// Used for the PureFlame case study. Needs puppeteer-core: `npm i -D puppeteer-core`.
// usage: node scripts/site-capture/capture.mjs <outDir> [jobName ...]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

// Folder of the static site to capture (set SITE_DIR or edit this default).
const SITE = process.env.SITE_DIR ?? "F:\\Projects\\Pureflame\\Website\\PF Copy - Git - Editorial Integration";
const OUT = process.argv[2];
// Remotion's bundled headless Chrome (downloaded on the first render).
const CHROME = path.resolve(
  "node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe",
);
const PORT = 4310;

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".mp4": "video/mp4",
  ".webm": "video/webm", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
  ".otf": "font/otf", ".ico": "image/x-icon", ".glb": "model/gltf-binary", ".gltf": "model/gltf+json",
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (url.startsWith("/api/")) { res.writeHead(404).end(); return; }
  let file = path.join(SITE, url === "/" ? "index.html" : url);
  if (!file.startsWith(SITE)) { res.writeHead(403).end(); return; }
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

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required", "--hide-scrollbars"],
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(pageName, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  // Skip the one-per-session brand intro.
  await page.evaluateOnNewDocument(() => {
    try { sessionStorage.setItem("pf-signature-intro-seen-v5", "1"); } catch {}
    try { localStorage.setItem("pf-newsletter", JSON.stringify({ subscribed: true })); } catch {}
  });
  await page.goto(`http://localhost:${PORT}/${pageName}`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(2500);
  return page;
}

async function revealAll(page) {
  // Scroll through to trigger [data-reveal] / lazy media, then back to top.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewport().height;
  for (let y = 0; y < h; y += Math.round(vh * 0.6)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(350);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1200);
}

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

const jobs = [
  { name: "home", page: "index.html", vp: DESKTOP, full: true, shots: [0, 1, 2, 3, 4] },
  { name: "collection", page: "colectie.html", vp: DESKTOP, full: true, shots: [0, 1, 2] },
  { name: "embera", page: "embera.html", vp: DESKTOP, full: true, shots: [0, 1, 2] },
  { name: "about", page: "despre-noi.html", vp: DESKTOP, full: false, shots: [0, 1] },
  { name: "m-home", page: "index.html", vp: MOBILE, full: true, shots: [0, 1, 2] },
  { name: "m-collection", page: "colectie.html", vp: MOBILE, full: false, shots: [0, 1] },
  { name: "m-embera", page: "embera.html", vp: MOBILE, full: false, shots: [0, 1] },
];

const only = process.argv.slice(3);
fs.mkdirSync(OUT, { recursive: true });

for (const job of jobs) {
  if (only.length && !only.includes(job.name)) continue;
  const page = await open(job.page, job.vp);
  await revealAll(page);
  const vh = job.vp.height;
  for (const i of job.shots) {
    await page.evaluate((yy) => window.scrollTo(0, yy), i * vh);
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT, `${job.name}-${i}.jpg`), type: "jpeg", quality: 92 });
  }
  if (job.full) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(800);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const maxCss = Math.floor(16000 / job.vp.deviceScaleFactor);
    await page.screenshot({
      path: path.join(OUT, `${job.name}-full.jpg`),
      type: "jpeg",
      quality: 90,
      fullPage: height <= maxCss,
      clip: height > maxCss ? { x: 0, y: 0, width: job.vp.width, height: maxCss } : undefined,
      captureBeyondViewport: true,
    });
    console.log(`${job.name}: page height ${height}px${height > maxCss ? ` (clipped to ${maxCss})` : ""}`);
  }
  console.log(`✓ ${job.name}`);
  await page.close();
}

await browser.close();
server.close();
