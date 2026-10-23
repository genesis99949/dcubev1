// Fix the baked-in mockup label while encoding the untouched master for the site.
// Usage: node scripts/encode-pureflame-macbook.mjs <master.mp4> [font.ttf]
import { spawnSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { BRAND } from "../src/remotion/brand.ts";

const source = process.argv[2];
if (!source) throw new Error("Pass the original 1920×1080 MacBook mockup export.");
const font = process.argv[3] ?? "C:/Windows/Fonts/arial.ttf";
const escapedFont = path.resolve(font).replaceAll("\\", "/").replaceAll(":", "\\:");
const output = path.resolve("public/videos/pureflame");
mkdirSync(output, { recursive: true });
const mp4 = path.join(output, "macbook-field-corrected.mp4");
const poster = path.join(output, "macbook-field-corrected.jpg");

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`ffmpeg failed (${result.status})`);
}

// The label is fixed in the 1920×1080 master. Interpolate only the old letters
// from the surrounding blank label, retaining its original background and edges.
const filter = [
  "delogo=x=328:y=992:w=84:h=20",
  `drawtext=fontfile='${escapedFont}':text='PUREFLAME':fontsize=13:fontcolor=${BRAND.colors.ink}` +
    ":x=318+(106-text_w)/2:y=982+(36-text_h)/2",
].join(",");

ffmpeg([
  "-i", path.resolve(source), "-map", "0:v:0", "-an", "-map_metadata", "-1",
  "-vf", filter, "-c:v", "libx264", "-preset", "slow", "-crf", "22",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4,
]);
ffmpeg(["-i", mp4, "-frames:v", "1", "-q:v", "2", "-update", "1", poster]);
console.log(`Corrected mockup: ${(statSync(mp4).size / 1e6).toFixed(2)} MB`);
