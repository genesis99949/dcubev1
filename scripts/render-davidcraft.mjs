// Renders every David Craft Ale video (compositions in src/remotion/compositions/DavidCraft)
// into public/videos/davidcraft, each with a JPEG poster taken at a moment where the
// site's own animations have finished playing.
//
//   npm run render:davidcraft                 → everything
//   npm run render:davidcraft -- home shop    → only those (identity | home | home-cover | story | product | shop | mobile)
//
// Source recordings: public/remotion/dca/*.mp4 (scripts/site-capture/vt-record.mjs).
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const OUT = "public/videos/davidcraft";

const JOBS = {
  identity: { id: "DCA-Identity", poster: 100 }, // primary logo, complete
  home: { id: "DCA-Home", poster: 96 }, // hero after the splash
  // Home grid card: the same film, starting on the hero instead of the splash.
  "home-cover": { id: "DCA-Home", poster: 96, frames: "84-629" },
  story: { id: "DCA-Story", poster: 45 }, // "Plans change. Good."
  product: { id: "DCA-Product", poster: 120 }, // beer page gallery at rest
  shop: { id: "DCA-Shop", poster: 165 }, // quick view open
  mobile: { id: "DCA-Mobile", poster: 120 }, // three phones in place
};

const run = (args) => {
  const result = spawnSync("npx", ["remotion", ...args], { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const only = process.argv.slice(2);
const unknown = only.filter((name) => !JOBS[name]);
if (unknown.length) {
  console.error(`Unknown job(s): ${unknown.join(", ")}. Use: ${Object.keys(JOBS).join(" | ")}`);
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
for (const [name, job] of Object.entries(JOBS)) {
  if (only.length && !only.includes(name)) continue;
  run(["render", job.id, `${OUT}/${name}.mp4`, "--crf=20", ...(job.frames ? [`--frames=${job.frames}`] : [])]);
  run(["still", job.id, `${OUT}/${name}.jpg`, `--frame=${job.poster}`, "--image-format=jpeg", "--jpeg-quality=88"]);
}

console.log("\n✓ David Craft Ale videos rendered.");
