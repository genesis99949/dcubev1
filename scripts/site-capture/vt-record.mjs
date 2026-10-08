// Virtual-time recorder: captures a website frame by frame at an exact 30 fps, with every
// animation (CSS, Web Animations, requestAnimationFrame / Lenis / GSAP, timers, <video>)
// driven by a virtual clock — so motion plays at its real speed in the final video, even
// though each screenshot takes far longer than 1/30 s. Serves the site statically
// (no backend, never reads .env).
//
//   node scripts/site-capture/vt-record.mjs <config.json>
//
// config: {
//   "site": "F:/Projects/Client/site",  "page": "index.html?loader",  "out": "out/frames",
//   "seconds": 12, "mobile": false, "scale": 1,      // device pixel ratio (default 1 desktop, 2 mobile)
//   "storage": { "session": { "key": "1" }, "local": { "key": "v" } },
//   "cursor": true,                       // draw a visible pointer (for showing hover/tap interactions)
//   "actions": [ { "t": 1.5, "scroll": 900, "duration": 1.4 },          // scroll to a y position…
//                { "t": 3, "scroll": "#shelf", "offset": -80 },         // …or to an element (resolved after load)
//                { "t": 5, "click": ".next" },                          // element.click() — no pointer
//                { "t": 6, "pointer": ".card", "duration": 0.8 },       // eased real mouse move (hover states,
//                { "t": 6.5, "pointer": [720, 400], "dx": 0, "dy": 0 }, //   mousemove listeners); never scrolls
//                { "t": 7, "tap": true },                               // real mouse click at the pointer
//                { "t": 8, "cursor": "hide" },
//                { "t": 9, "eval": "document.body.classList.add('x')" } ]
// }
// Encode: ffmpeg -framerate 30 -i <out>/f%04d.jpg -c:v libx264 -crf 17 -pix_fmt yuv420p out.mp4
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import puppeteer from "puppeteer-core";

const config = JSON.parse(fs.readFileSync(process.argv[2], "utf8").replace(/^﻿/, ""));
const { site, page: pagePath, out, seconds, mobile = false, storage = {}, actions = [], injectCss = "", cursor = false } = config;
// Device pixel ratio. Desktop defaults to 1: with a fractional ratio, headless Chrome hit-tests its
// synthetic hover updates (after layout changes) at a scaled mouse position, so hover states flicker
// onto the wrong element. Mobile pages don't use hover, so they keep a sharp 2×.
const scale = config.scale ?? (mobile ? 2 : 1);
const FPS = 30;
const PORT = 4320 + Math.floor(Math.random() * 500);
const CHROME = path.resolve(
  "node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe",
);

// ---------- static server ----------
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".mp4": "video/mp4",
  ".webm": "video/webm", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf",
  ".glb": "model/gltf-binary", ".ico": "image/x-icon",
};
const root = path.resolve(site);
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(root, url === "/" ? "index.html" : url);
  if (!file.startsWith(root) || url.startsWith("/api/") || path.basename(file).startsWith(".env")) {
    res.writeHead(404).end();
    return;
  }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end(); return; }
    const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
    const range = req.headers.range;
    if (range) {
      const [s, e] = range.replace("bytes=", "").split("-");
      const start = Number(s);
      const end = e ? Number(e) : st.size - 1;
      res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Accept-Ranges": "bytes" });
    fs.createReadStream(file).pipe(res);
  });
});
await new Promise((r) => server.listen(PORT, r));

// ---------- virtual clock (installed before any page script runs) ----------
const VIRTUAL_TIME = () => {
  const realNow = performance.now.bind(performance);
  const realDateNow = Date.now.bind(Date);
  const base = realNow();
  const baseDate = realDateNow();
  let vt = 0;
  performance.now = () => base + vt;
  Date.now = () => baseDate + vt;

  let rafQueue = new Map();
  let nextId = 1;
  window.requestAnimationFrame = (cb) => { const id = nextId++; rafQueue.set(id, cb); return id; };
  window.cancelAnimationFrame = (id) => { rafQueue.delete(id); };

  const timers = new Map();
  const add = (fn, ms, args, repeat) => {
    const id = nextId++;
    timers.set(id, { at: vt + Math.max(0, Number(ms) || 0), fn, args, repeat: repeat ? Math.max(1, Number(ms) || 0) : 0 });
    return id;
  };
  window.setTimeout = (fn, ms, ...args) => add(fn, ms, args, false);
  window.setInterval = (fn, ms, ...args) => add(fn, ms, args, true);
  window.clearTimeout = window.clearInterval = (id) => { timers.delete(id); };

  const seen = new WeakSet();

  window.__vt = {
    now: () => vt,
    /** Advance the clock by `dt` ms: timers, then rAF callbacks, then CSS/WAAPI animations. */
    step(dt) {
      const target = vt + dt;
      for (;;) {
        let nextT = null;
        for (const [id, t] of timers) if (t.at <= target && (!nextT || t.at < nextT[1].at)) nextT = [id, t];
        if (!nextT) break;
        const [id, t] = nextT;
        vt = Math.max(vt, t.at);
        if (t.repeat) t.at += t.repeat; else timers.delete(id);
        try { if (typeof t.fn === "function") t.fn(...t.args); else (0, eval)(t.fn); } catch (e) { console.error(e); }
      }
      vt = target;
      const queue = rafQueue;
      rafQueue = new Map();
      for (const cb of queue.values()) { try { cb(base + vt); } catch (e) { console.error(e); } }
      this.syncAnimations(dt);
    },
    /** CSS animations/transitions and element.animate(): paused and advanced by hand. */
    syncAnimations(dt) {
      for (const a of document.getAnimations()) {
        if (!seen.has(a)) {
          seen.add(a);
          a.pause();
          a.currentTime = 0; // started in real time since the last frame — restart on the virtual clock
          continue;
        }
        if (a.playState === "finished" || a.playState === "idle") continue;
        const end = a.effect?.getComputedTiming?.().endTime;
        const next = (Number(a.currentTime) || 0) + dt * (a.playbackRate || 1);
        if (Number.isFinite(end) && next >= end) { try { a.finish(); } catch { a.currentTime = end; } }
        else a.currentTime = next;
      }
    },
    /** Page <video>s follow the virtual clock. */
    async syncVideos() {
      const vids = [...document.querySelectorAll("video")].filter((v) => v.readyState >= 1 && v.duration > 0);
      await Promise.all(vids.map((v) => new Promise((resolve) => {
        v.pause();
        if (v.dataset.vt0 === undefined) v.dataset.vt0 = String(v.currentTime || 0);
        const target = (Number(v.dataset.vt0) + vt / 1000) % v.duration;
        if (Math.abs(v.currentTime - target) < 0.001) return resolve();
        const done = () => { clearTimeoutReal(timer); resolve(); };
        const timer = setTimeoutReal(done, 800);
        v.addEventListener("seeked", done, { once: true });
        v.currentTime = target;
      })));
    },
    /** Wait for images in or near the viewport to finish decoding. */
    async settleImages() {
      const near = [...document.images].filter((img) => {
        const r = img.getBoundingClientRect();
        return r.bottom > -200 && r.top < innerHeight + 200 && !img.complete;
      });
      await Promise.race([
        Promise.all(near.map((img) => img.decode().catch(() => {}))),
        new Promise((r) => setTimeoutReal(r, 1500)),
      ]);
    },
  };
  const setTimeoutReal = (...a) => window.__realTimers.setTimeout(...a);
  const clearTimeoutReal = (...a) => window.__realTimers.clearTimeout(...a);
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required", "--font-render-hinting=none"],
});
const page = await browser.newPage();
await page.setViewport(
  mobile
    ? { width: 390, height: 844, deviceScaleFactor: scale, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900, deviceScaleFactor: scale },
);
await page.evaluateOnNewDocument(
  (store, css, withCursor) => {
    window.__realTimers = { setTimeout: window.setTimeout.bind(window), clearTimeout: window.clearTimeout.bind(window) };
    try { for (const [k, v] of Object.entries(store.session ?? {})) sessionStorage.setItem(k, v); } catch {}
    try { for (const [k, v] of Object.entries(store.local ?? {})) localStorage.setItem(k, v); } catch {}
    // Optional CSS for the recording only (e.g. a missing custom property) — the site files are untouched.
    if (css) {
      const add = () => { const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s); };
      if (document.head) add(); else document.addEventListener("DOMContentLoaded", add, { once: true });
    }
    // A drawn pointer, so hover/tap interactions read in the video (headless has no visible cursor).
    if (withCursor) {
      let el = null;
      const mount = () => {
        el = document.createElement("div");
        el.innerHTML =
          '<i style="display:block;position:absolute;left:-17px;top:-17px;width:34px;height:34px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1.5px rgba(17,17,16,.55);opacity:0"></i>' +
          '<svg width="30" height="30" viewBox="0 0 30 30" style="position:absolute;left:-6px;top:-3px;display:block;width:30px;height:30px;max-width:none;max-height:none;overflow:visible;transform-origin:6px 3px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.28))">' +
          '<path d="M6 3 L6 23.5 L11.2 18.6 L15 27 L18.6 25.4 L14.9 17.2 L21.8 17.2 Z" fill="#111110" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/></svg>';
        el.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;z-index:2147483647;pointer-events:none;opacity:0";
        document.documentElement.appendChild(el);
      };
      window.__cursor = (x, y, alpha, press) => {
        if (!el) mount();
        el.style.opacity = String(alpha);
        el.style.transform = `translate(${x}px, ${y}px)`;
        const svg = el.lastChild;
        const ring = el.firstChild;
        const dip = press > 0 && press < 1 ? Math.sin(Math.min(1, press * 3) * Math.PI) : 0;
        svg.style.transform = `scale(${1 - 0.14 * dip})`;
        ring.style.opacity = press > 0 && press < 1 ? String(1 - press) : "0";
        ring.style.transform = `scale(${0.4 + press * 1.3})`;
      };
    }
  },
  storage,
  injectCss,
  cursor,
);
await page.evaluateOnNewDocument(VIRTUAL_TIME);
page.on("pageerror", (e) => console.warn("[page error]", e.message));

await page.goto(`http://localhost:${PORT}/${pagePath}`, { waitUntil: "networkidle0", timeout: 90000 });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => window.__vt.settleImages());

// ---------- actions ----------
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const VW = mobile ? 390 : 1440;
const VH = mobile ? 844 : 900;
const scrolls = actions.filter((a) => a.scroll !== undefined).sort((a, b) => a.t - b.t);
const pending = actions.filter((a) => a.scroll === undefined).sort((a, b) => a.t - b.t);

// Scroll targets given as selectors are resolved once, after load.
for (const s of scrolls) {
  if (typeof s.scroll !== "string") continue;
  const y = await page.evaluate(
    (sel) => { const el = document.querySelector(sel); return el ? el.getBoundingClientRect().top + scrollY : null; },
    s.scroll,
  );
  if (y === null) throw new Error(`scroll target not found: ${s.scroll}`);
  s.scroll = Math.max(0, Math.round(y + (s.offset ?? 0)));
}

/** Scroll position at time t (eased between the previous position and each target). */
let from = 0;
const scrollAt = (t) => {
  let y = 0;
  let prev = 0;
  for (const s of scrolls) {
    if (t < s.t) break;
    const p = Math.min(1, (t - s.t) / (s.duration ?? 1.2));
    y = prev + (s.scroll - prev) * ease(p);
    prev = s.scroll;
  }
  return y;
};

// Pointer state: real mouse events (hover styles, mousemove listeners) + the drawn cursor.
let ptr = null;
let move = null;
let shown = null; // { t, to: 0 | 1 } — cursor fade in/out
let pressAt = null;
const pointTo = async (a) => {
  let to = a.pointer ?? a.hover;
  if (typeof to === "string") {
    to = await page.evaluate((sel) => {
      const r = document.querySelector(sel)?.getBoundingClientRect();
      return r ? [r.left + r.width / 2, r.top + r.height / 2] : null;
    }, to);
    if (!to) { console.warn(`pointer target not found: ${a.pointer ?? a.hover}`); return; }
  }
  to = [to[0] + (a.dx ?? 0), to[1] + (a.dy ?? 0)];
  move = { t0: a.t, from: ptr ?? [VW * 0.74, VH * 0.94], to, dur: a.duration ?? 0.8 };
  if (!shown || shown.to === 0) shown = { t: a.t, to: 1 };
};

fs.mkdirSync(out, { recursive: true });
const frames = Math.round(seconds * FPS);
const dt = 1000 / FPS;
for (let f = 0; f < frames; f++) {
  const t = f / FPS;
  while (pending.length && pending[0].t <= t) {
    const a = pending.shift();
    if (a.click) await page.evaluate((s) => document.querySelector(s)?.click(), a.click);
    if (a.pointer !== undefined || a.hover !== undefined) await pointTo(a);
    if (a.tap && ptr) { await page.mouse.click(ptr[0], ptr[1]); pressAt = t; }
    if (a.cursor === "hide") shown = { t, to: 0 };
    if (a.eval) await page.evaluate(a.eval);
    if (a.log) console.log(`[t=${t.toFixed(2)}]`, JSON.stringify(await page.evaluate(a.log)));
  }
  if (scrolls.length) {
    const y = Math.round(scrollAt(t));
    if (y !== from) {
      await page.evaluate((yy) => {
        // Prefer the site's own smooth-scroll instance so its scroll listeners fire normally.
        const l = typeof lenis !== "undefined" ? lenis : window.lenis;
        if (l && l.scrollTo) l.scrollTo(yy, { immediate: true, force: true });
        else window.scrollTo(0, yy);
      }, y);
      from = y;
    }
  }
  if (move) {
    const p = Math.min(1, Math.max(0, (t - move.t0) / move.dur));
    const e = ease(p);
    const next = [move.from[0] + (move.to[0] - move.from[0]) * e, move.from[1] + (move.to[1] - move.from[1]) * e];
    if (!ptr || Math.abs(next[0] - ptr[0]) + Math.abs(next[1] - ptr[1]) > 0.2) await page.mouse.move(next[0], next[1]);
    ptr = next;
    if (p >= 1) move = null;
  }
  await page.evaluate((d) => window.__vt.step(d), f === 0 ? 0 : dt);
  await page.evaluate(() => window.__vt.syncVideos());
  await page.evaluate(() => window.__vt.settleImages());
  if (cursor && ptr) {
    const fade = shown ? Math.min(1, (t - shown.t) / 0.25) : 0;
    const alpha = shown?.to === 1 ? fade : 1 - fade;
    const press = pressAt === null ? 0 : Math.min(1, (t - pressAt) / 0.45);
    await page.evaluate((x, y, al, pr) => window.__cursor?.(x, y, al, pr), ptr[0], ptr[1], alpha, press);
  }
  await page.screenshot({ path: path.join(out, `f${String(f).padStart(4, "0")}.jpg`), type: "jpeg", quality: 90 });
  if (f % 60 === 0) console.log(`frame ${f}/${frames}`);
}

console.log(`✓ ${frames} frames → ${out}`);
await browser.close();
server.close();
