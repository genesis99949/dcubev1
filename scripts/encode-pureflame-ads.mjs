// Re-encode the final exports for the web; the source files are only read.
// Usage: node scripts/encode-pureflame-ads.mjs "F:/Projects/Pureflame/Ads"
import { spawnSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error("Pass the folder containing the two final ad exports.");
const output = path.resolve("public/videos/pureflame/ads");
mkdirSync(output, { recursive: true });

const jobs = [
  {
    id: "forme-create",
    source: "Ad 3 - Forme Create In Jurul Focului/Formev2 - final (-14 LUFS).mp4",
    posterAt: "12",
  },
  {
    id: "ignite-the-moment",
    source: "Dancing Ad/Vids/Ignite - Dancing Ad.mp4",
    posterAt: "5",
  },
];

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`ffmpeg failed (${result.status})`);
}

for (const job of jobs) {
  const source = path.resolve(sourceRoot, job.source);
  const mp4 = path.join(output, `${job.id}.mp4`);
  const poster = path.join(output, `${job.id}.jpg`);
  ffmpeg([
    "-i", source, "-map", "0:v:0", "-map", "0:a:0", "-map_metadata", "-1",
    "-vf", "scale=720:1280:flags=lanczos,setsar=1",
    "-c:v", "libx264", "-preset", "slow", "-crf", "25",
    "-maxrate", "1800k", "-bufsize", "3600k", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", mp4,
  ]);
  ffmpeg(["-ss", job.posterAt, "-i", mp4, "-frames:v", "1", "-q:v", "2", "-update", "1", poster]);
  console.log(`${job.id}: video ${(statSync(mp4).size / 1e6).toFixed(2)} MB; poster ${(statSync(poster).size / 1e3).toFixed(0)} kB`);
}
