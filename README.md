# Dcube

Minimal portfolio website + programmatic motion graphics, in one project.

- **Website:** Next.js 16 (App Router) — `src/app`
- **Videos:** Remotion 4.0.533 — `src/remotion` (rendered to `public/videos`, plus a live showreel via `@remotion/player`)

Requires Node.js 20+ and npm.

## Quick start

```bash
npm install
npm run dev        # website → http://localhost:3000
npm run studio     # Remotion Studio → http://localhost:3100
```

## Everyday commands

| What | Command |
| --- | --- |
| Preview the website | `npm run dev` |
| Preview / edit videos | `npm run studio` |
| Export a video to MP4 | `npm run render -- BrandIntro out/brand-intro.mp4` |
| Export the vertical version | `npm run render -- BrandIntro-Vertical out/brand-intro-vertical.mp4` |
| Export a still image | `npm run still -- BrandIntro out/frame.png --frame=60` |
| Re-render all videos used on the site | `npm run render:portfolio` |
| Check code | `npm run typecheck` and `npm run lint` |
| Production build | `npm run build` then `npm start` |

## Where things live

- `src/content/site.ts` — name, tagline, about text, email and social links
- `src/content/services.ts` — the six services, one per face of the Dcube
- `src/content/projects.ts` — portfolio entries (each gets `/work/<slug>`), with services, cover and gallery
- `public/work/<slug>/` — case-study images for each project
- `src/remotion/config.ts` — resolution and frame rate for all videos
- `src/remotion/brand.ts` — colours and fonts shared by the site and the videos
- `src/remotion/compositions/BrandIntro/timing.ts` — scene durations of the sample video (seconds)
- `src/remotion/Root.tsx` — list of all compositions

## Working with AI agents

Project instructions for agents are in [`AGENTS.md`](AGENTS.md) (Claude Code loads them via `CLAUDE.md`).
The official Remotion Agent Skills are installed in `.agents/skills` (linked to `.claude/skills`); update them
with `npx remotion skills update`.

## Licences

Remotion is free for individuals and companies of up to 3 people; larger companies need a
[company licence](https://remotion.dev/license).
