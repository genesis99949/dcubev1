// Renders every PureFlame asset (compositions in src/remotion/compositions/PureFlame).
//
//   npm run render:pureflame            → everything
//   npm run render:pureflame -- stills  → only one group: videos | stills | logo
//
// Portfolio media  → public/videos/pureflame (videos + posters), public/work/pure-flame (4K stills)
// For the PureFlame website → exports/pureflame (logo animation, incl. transparent WebM)
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const run = (args) => {
  const result = spawnSync("npx", ["remotion", ...args], { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const group = process.argv[2];
const want = (name) => !group || group === name;

for (const dir of ["public/videos/pureflame", "public/work/pure-flame", "exports/pureflame"]) {
  fs.mkdirSync(dir, { recursive: true });
}

if (want("videos")) {
  // Identity film + website showcase (portfolio), with JPEG posters.
  run(["render", "PureFlame-Identity", "public/videos/pureflame/identity.mp4", "--crf=20"]);
  run(["still", "PureFlame-Identity", "public/videos/pureflame/identity.jpg", "--frame=200", "--image-format=jpeg", "--jpeg-quality=88"]);
  run(["render", "PureFlame-Showcase", "public/videos/pureflame/showcase.mp4", "--crf=20"]);
  run(["still", "PureFlame-Showcase", "public/videos/pureflame/showcase.jpg", "--frame=40", "--image-format=jpeg", "--jpeg-quality=88"]);
}

if (want("stills")) {
  // 4K presentation stills (1920×1080 compositions rendered at 2×) — only views that
  // the videos don't already show, so the case study never repeats itself.
  const stills = ["Product", "Details", "Mobile"];
  for (const s of stills) {
    run(["still", `PureFlame-Still-${s}`, `public/work/pure-flame/${s.toLowerCase()}.jpg`, "--scale=2", "--image-format=jpeg", "--jpeg-quality=88"]);
  }
}

if (want("logo")) {
  // Logo animation for use on pureflame.ro: MP4 on charcoal + WebM with alpha.
  run(["render", "PureFlame-Logo", "exports/pureflame/pureflame-logo.mp4", "--crf=18"]);
  run([
    "render",
    "PureFlame-Logo-Transparent",
    "exports/pureflame/pureflame-logo-transparent.webm",
    "--codec=vp9",
    "--image-format=png",
    "--pixel-format=yuva420p",
  ]);
  run(["still", "PureFlame-Logo-Transparent", "exports/pureflame/pureflame-logo-transparent.png", "--frame=224", "--image-format=png"]);
}

console.log("\n✓ PureFlame assets rendered.");
