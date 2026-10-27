// Static, responsive WebP variants for homepage posters and small video thumbnails.
// Run after replacing source posters: npm run optimize:images.
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const sources = [
  "/videos/hero/laptop.jpg",
  "/videos/hero/phone.jpg",
  "/videos/pureflame/showcase.jpg",
  "/videos/davidcraft/home-cover.jpg",
  "/videos/pureflame/ads/forme-create.jpg",
  "/videos/pureflame/ads/ignite-the-moment.jpg",
];
const widths = [128, 256, 384, 640, 960, 1280, 1920];
const output = "public/images/optimized";
const manifest = {};
await fs.mkdir(output, { recursive: true });

for (const src of sources) {
  const input = await fs.readFile(path.join("public", src));
  const metadata = await sharp(input).metadata();
  const hash = createHash("sha256").update(input).update("webp-q78-v1").digest("hex").slice(0, 12);
  const sizes = [...new Set([...widths.filter((w) => w < metadata.width), metadata.width])];
  manifest[src] = [];
  for (const width of sizes) {
    const name = `${hash}-${width}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(path.join(output, name));
    manifest[src].push({ width, src: `/images/optimized/${name}` });
  }
  console.log(`${src}: ${sizes.length} responsive sizes`);
}
await fs.writeFile("src/content/image-variants.json", `${JSON.stringify(manifest, null, 2)}\n`);
