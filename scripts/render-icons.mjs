// Rasterises src/app/icon.svg into the icons Google and phones look for:
//   src/app/favicon.ico      48×48 (Google Search shows favicons from /favicon.ico; multiples of 48 px)
//   src/app/apple-icon.png   180×180 (iPhone home screen)
// Run after changing icon.svg:  node scripts/render-icons.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = path.resolve(
  "node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe",
);
const svg = fs.readFileSync("src/app/icon.svg", "utf8");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "icons-"));

const browser = await puppeteer.launch({ executablePath: CHROME, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
const render = async (size, file) => {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`,
  );
  await page.screenshot({ path: file, omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
};

await render(180, "src/app/apple-icon.png");
const png48 = path.join(tmp, "48.png");
await render(48, png48);
await browser.close();

// An .ico that wraps the PNG as-is (supported by every current browser and by Next's image decoder;
// ffmpeg's BMP-style .ico is rejected by Next).
const png = fs.readFileSync(png48);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(48, 6); // width
header.writeUInt8(48, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, png]));
fs.rmSync(tmp, { recursive: true, force: true });
console.log("✓ src/app/favicon.ico (48×48), src/app/apple-icon.png (180×180)");
