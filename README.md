# Dcube

Minimal portfolio website + programmatic motion graphics, in one project.

- **Website:** Next.js 16 (App Router) — `src/app`
- **Videos:** Remotion 4.0.533 — `src/remotion` (rendered to MP4 in `public/videos`)

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
| Build the static site | `npm run build` → plain HTML/CSS/JS in `out/` (that folder is what gets deployed) |

## Cum schimbi textele site-ului

**Nu edita fișierele `.html` din `out/`.** Sunt generate automat de `npm run build` (de aceea sunt pe un
singur rând) și se rescriu complet la fiecare build. În plus, Next.js păstrează textele și într-o copie pentru
navigarea între pagini, așa că o modificare făcută doar în HTML ar dispărea când treci de la o pagină la alta.

Toate textele stau în trei fișiere din `src/content/`, scrise frumos, câte un câmp pe rând:

| Ce vezi pe site | Fișier | Câmp |
| --- | --- | --- |
| Titlul mare, fraza și butoanele din hero | `src/content/site.ts` | `hero.headline`, `hero.text`, `hero.primary`, `hero.secondary` |
| „Selected work.” și fraza de sub el | `src/content/site.ts` | `work.headline`, `work.text` |
| „Six faces. One cube.” și fraza de sub el | `src/content/site.ts` | `services.headline`, `services.text` |
| Numele și descrierile celor 6 servicii | `src/content/services.ts` | `name`, `short` |
| Secțiunea About | `src/content/site.ts` | `aboutLabel`, `about` |
| Contact, email, linkurile sociale (Behance, GitHub; adaugi LinkedIn aici) | `src/content/site.ts` | `contact.*`, `contact.socials` |
| Numele tău, anul din footer | `src/content/site.ts` | `owner.name`, `year` |
| Descrierea pentru Google și social media | `src/content/site.ts` | `tagline` |
| Tot ce ține de un proiect (titlu, subtitlu, texte, secțiuni, legende sub poze/video, detalii) | `src/content/projects.ts` | intrarea proiectului (`title`, `subtitle`, `summary`, `description`, `sections`, `details`) |

Pașii:
1. `npm run dev` și deschide http://localhost:3000 — vezi modificările pe loc, la fiecare salvare.
2. Schimbă textul între ghilimele în fișierul de mai sus și salvează. Păstrează ghilimelele și virgula de la
   final; dacă textul conține ghilimele drepte (`"`), folosește ghilimele tipografice („ ” / “ ”) sau `\"`.
3. `npm run build` — regenerează site-ul static în `out/`.
4. Publică `out/` ca de obicei (Cloudflare, vezi `wrangler.jsonc`).

Dacă redenumești un serviciu în `services.ts`, schimbă numele și în lista `services` a proiectelor care îl
folosesc; `npm run typecheck` îți arată exact unde.

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
