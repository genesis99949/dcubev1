# Ramon Bugariu — portfolio

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

Site-ul e bilingv: româna (limba principală) la `/`, engleza la `/en` (comutatorul RO/EN din header duce la aceeași pagină
în cealaltă limbă). Fiecare text e scris o singură dată, în ambele limbi, așa: `l("English", "Română")`.

Toate textele stau în `src/content/`, scrise frumos, câte un câmp pe rând:

| Ce vezi pe site | Fișier | Câmp |
| --- | --- | --- |
| Titlul mare din hero (și din titlul paginii) | `site.ts` | `offer` |
| Fraza și butoanele din hero | `site.ts` | `hero.text`, `hero.primary`, `hero.secondary` |
| „Selected work” / „Proiecte alese” și fraza de sub el | `site.ts` | `work.headline`, `work.text` |
| „Two things, done well.” și fraza de sub el | `site.ts` | `services.headline`, `services.text` |
| Numele și descrierile celor 2 servicii | `services.ts` | `label`, `short`, `for` (`name` e doar un cod intern — nu-l schimba) |
| „How I work” / „Cum lucrez” (cei 4 pași) | `site.ts` | `process.steps` |
| Titlul și textele secțiunii de prețuri | `site.ts` | `pricing.*` |
| **Pachetele (Start / Personalizat, pentru fiecare serviciu): pentru cine, ce includ, prețul „de la”** | `packages.ts` | `for`, `includes`, `price` (număr în euro; `null` = „Preț la cerere”) |
| Condițiile de plată de sub prețuri | `site.ts` | `pricing.payment` |
| Opțiunile extra de sub pachete | `packages.ts` | `extras` |
| Eticheta de deasupra unui proiect („Magazin online · Identitate de brand”) | `projects.ts` | `scope` |
| Secțiunea About | `site.ts` | `aboutLabel`, `about` |
| Contact, intervalele de buget, linkurile sociale | `site.ts` | `contact.*`, `contact.budgets`, `contact.socials` |
| Cheia formularului de contact (Web3Forms) | `site.ts` | `contact.formKey` — vezi mai jos |
| Numele tău, anul din footer | `site.ts` | `owner.name`, `year` |
| Descrierea pentru Google și social media | `site.ts` | `tagline` |
| Pagina de confidențialitate | `privacy.ts` | `sections` |
| Rândurile cu logo-urile uneltelor (ordine, ce apare) | `tools.ts` | `rows` — un rând pe listă; logo-urile sunt în `public/logos/` |
| „Built with” / „Made with” de pe fiecare studiu de caz | `projects.ts` | `stack.built`, `stack.made` — coduri din `TOOLS` (`tools.ts`) |
| Butoane, meniu, etichetele formularului | `ui.ts` | — |
| Tot ce ține de un proiect (subtitlu, texte, secțiuni, legende, detalii) | `projects.ts` | intrarea proiectului (`subtitle`, `summary`, `description`, `sections`, `details`) |

Pașii:
1. `npm run dev` și deschide http://localhost:3000 (sau http://localhost:3000/en) — vezi modificările pe loc.
2. Schimbă textul între ghilimele — și pe cel englezesc, și pe cel românesc — și salvează. Păstrează
   ghilimelele și virgulele; dacă textul conține ghilimele drepte (`"`), folosește ghilimele tipografice
   („ ” / “ ”) sau `\"`.
3. `npm run build` — regenerează site-ul static în `out/`.
4. Publică `out/` ca de obicei (Cloudflare, vezi `wrangler.jsonc`).

### Publicare prin GitHub și Cloudflare

Repo-ul `genesis99949/dcubev1` este conectat la Cloudflare Workers Builds. Un push pe `origin/main`
declanșează construirea și publicarea site-ului `dcubev1`. Urmărește verificarea GitHub
`Workers Builds: dcubev1` până la succes, apoi verifică domeniul public `ramonbugariu.ro`.
Această integrare folosește accesul Cloudflare configurat în serviciu; autentificarea locală Wrangler
este separată și nu este necesară pentru fluxul prin GitHub.

Dacă redenumești un serviciu în `services.ts`, schimbă doar `label`; `name` rămâne codul folosit de proiecte.
`npm run typecheck` îți arată exact unde e o greșeală.

### Formularul de contact

Mesajele din formular îți vin pe email prin [Web3Forms](https://web3forms.com) (gratuit; site-ul e static, deci
nu are server propriu). Îți faci cont cu adresa la care vrei să primești mesajele, copiezi „Access Key” și o
pui în `site.ts` → `contact.formKey` (sau în `.env.local` ca `NEXT_PUBLIC_WEB3FORMS_KEY=…`), apoi
`npm run build`. Cheia e publică prin natura ei; adresa ta de email nu apare nicăieri pe site.
Până pui cheia, formularul afișează un mesaj că e în curs de configurare și trimite vizitatorii spre LinkedIn.

## Where things live

- `src/content/site.ts` — all homepage copy (EN + RO), contact form settings and social links
- `src/content/packages.ts` — the pricing packages (what's included, starting price)
- `src/content/privacy.ts`, `src/content/ui.ts` — privacy policy and interface labels
- `src/content/i18n.ts` — the two languages (Romanian at `/`, English at `/en`)
- `src/app/(en)`, `src/app/(ro)` — one root layout per language; pages are shared components in `src/components/pages`
- `src/content/services.ts` — the two services: presentation website and online store
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
