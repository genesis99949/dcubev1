// Renders every video the website uses into public/videos (MP4 + JPEG poster).
//
//   npm run render:portfolio              → render everything below
//   npm run render:portfolio -- Shapes    → render only the listed composition ids
//
// Add a line to JOBS when you add a project video, then reference
// `/videos/<file>.mp4` and `/videos/<file>.jpg` in src/content/projects.ts.
import { spawnSync } from "node:child_process";

const JOBS = [
  // id = composition id in src/remotion/Root.tsx; posterFrame = frame used as the still. Example:
  // { id: "BrandIntro", file: "brand-intro", posterFrame: 300 },
  // (PureFlame media has its own script: scripts/render-pureflame.mjs)
];

const only = process.argv.slice(2);
const jobs = only.length ? JOBS.filter((job) => only.includes(job.id)) : JOBS;

if (JOBS.length === 0) {
  console.log("Nothing to render: no jobs in scripts/render-portfolio.mjs yet.");
  process.exit(0);
}

if (jobs.length === 0) {
  console.error(`No matching compositions. Known ids: ${JOBS.map((j) => j.id).join(", ")}`);
  process.exit(1);
}

const run = (args) => {
  const result = spawnSync("npx", ["remotion", ...args], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

for (const job of jobs) {
  console.log(`\n▶ ${job.id} → public/videos/${job.file}.mp4`);
  run(["render", job.id, `public/videos/${job.file}.mp4`, "--crf=20"]);
  run([
    "still",
    job.id,
    `public/videos/${job.file}.jpg`,
    `--frame=${job.posterFrame}`,
    "--image-format=jpeg",
    "--jpeg-quality=85",
  ]);
}

console.log("\n✓ Done. Videos are in public/videos/");
