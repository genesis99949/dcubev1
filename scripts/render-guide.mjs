// Prints the free website guide to A4 PDFs, one per language, into public/guide/.
//
//   npm run dev                 (in another terminal; or point BASE at any server running the site)
//   npm run render:guide        → public/guide/ghid-site-ramon-bugariu.pdf + website-guide-ramon-bugariu.pdf
//
// The source is the guide's own page (/ghid-site/document, /en/website-guide/document), built from
// src/content/guide.ts. Re-run after changing the guide's copy or the Start prices it quotes.

import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = process.env.BASE ?? "http://localhost:3000";
const CHROME = path.join(
  ROOT,
  "node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe",
);

// Kept in step with guide.pdf and LOCALIZED_PATHS in src/content.
const JOBS = [
  { url: "/ghid-site/document", out: "public/guide/ghid-site-ramon-bugariu.pdf", title: "Ce pregătești înainte să-ți faci site-ul" },
  { url: "/en/website-guide/document", out: "public/guide/website-guide-ramon-bugariu.pdf", title: "What to sort out before you build your website" },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--font-render-hinting=none"] });
try {
  for (const job of JOBS) {
    const page = await browser.newPage();
    const res = await page.goto(BASE + job.url, { waitUntil: "networkidle0" });
    if (!res?.ok()) throw new Error(`${job.url}: HTTP ${res?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    fs.mkdirSync(path.dirname(path.join(ROOT, job.out)), { recursive: true });
    await page.pdf({
      path: path.join(ROOT, job.out),
      format: "A4",
      printBackground: true,
      margin: { top: "18mm", bottom: "18mm", left: "18mm", right: "18mm" },
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="width:100%;padding:0 18mm;font:8pt sans-serif;color:#77756f;display:flex;justify-content:space-between"><span>Ramon Bugariu · ${job.title}</span><span class="pageNumber"></span></div>`,
    });
    await page.close();
    console.log(`✓ ${job.out}`);
  }
} finally {
  await browser.close();
}
