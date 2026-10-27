// Re-encode the original loops for delivery without changing their content or speed.
// Requires ffmpeg on PATH (or FFMPEG_PATH).
import { spawnSync } from "node:child_process";

for (const [name, suffix, width, crf] of [
  ["laptop", "light", 1280, 29],
  ["phone", "light", 480, 30],
  ["laptop", "mobile", 720, 29],
  ["phone", "mobile", 320, 30],
]) {
  const result = spawnSync(process.env.FFMPEG_PATH ?? "ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", `public/videos/hero/${name}.mp4`,
    "-vf", `scale=${width}:-2,fps=24`,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(crf),
    "-an", "-movflags", "+faststart", `public/videos/hero/${name}-${suffix}.mp4`,
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
