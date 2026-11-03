// Portfolio entries, in display order. Each one gets a case-study page at /work/<slug> (and /en/work/<slug>).
// Every visible text is bilingual: l("English", "Română").
//
// Images: put them in public/work/<slug>/ and list them with their pixel size.
// Videos: render them from Remotion (public/videos), or drop in any MP4 + JPEG poster.
// Hosted videos: use a `vimeo` item with the video id.

import { l, type L } from "./i18n";
import type { Service } from "./services";
import type { ToolId } from "./tools";

// A project lists the service it was (see ./services.ts), and in `scope` everything the work covered.
export type { Service };

export type Media =
  | { kind: "image"; src: string; width: number; height: number; alt: L }
  | { kind: "video"; src: string; poster: string; width: number; height: number; alt: L }
  /** Vimeo embed, played as a silent, looping background video without controls. */
  | { kind: "vimeo"; id: string; width: number; height: number; alt: L };

/** `half` items sit side by side on wide screens; `caption` is shown under the media. */
export type GalleryItem = Media & { span?: "full" | "half"; caption?: L };

/** Finished films with audible content, separate from the silent case-study loops. */
export type VideoAd = {
  id: string;
  title: L;
  description: L;
  format: L;
  role: L;
  tools: L;
  music: { credit: L; href?: string };
  video: Extract<Media, { kind: "video" }>;
  loop?: boolean;
};

/** One chapter of a case study: a heading, a few paragraphs, then its media. */
export type ProjectSection = {
  title: L;
  text: L[];
  media: GalleryItem[];
  videoAds?: VideoAd[];
};

export type Project = {
  slug: string;
  /** The project's (brand) name — the same in every language. */
  title: string;
  /** Project status shown in tiles before opening the case study. */
  disclosure?: L;
  /** Short line under the title on the project page. */
  subtitle?: L;
  services: Service[];
  /** What the work covered, e.g. "Online store · Brand identity" (tile and page eyebrow). */
  scope: L[];
  year: number;
  /** One editorial line, shown in project lists. */
  summary: L;
  /** Search snippets, kept separate from the editorial text in portfolio tiles. */
  seo: { title: L; description: L };
  /** Intro paragraphs, shown right after the lead media. */
  description: L[];
  /** Video/image in the project's tile on the home page (16:9). */
  cover: Media;
  /** First media on the project page, above the intro. */
  lead?: GalleryItem;
  /** The case study, chapter by chapter. Every view should appear only once. */
  sections: ProjectSection[];
  /** Extra facts on the project page. */
  details?: { label: L; value: L; href?: string }[];
  /** What it runs on, and the programs used to make it (logos from ./tools.ts). */
  stack?: { built: ToolId[]; made: ToolId[] };
};

const img = (
  src: string,
  width: number,
  height: number,
  alt: L,
  caption?: L,
  span: GalleryItem["span"] = "full",
): GalleryItem => ({ kind: "image", src, width, height, alt, caption, span });

/** A value that reads the same in both languages (URLs, product names…). */
const same = (text: string) => l(text, text);

export const projects: Project[] = [
  {
    slug: "pure-flame",
    title: "Pure Flame",
    disclosure: l("Portfolio concept", "Concept de portofoliu"),
    seo: {
      title: l("Pure Flame: online store & rebrand", "Pure Flame: magazin online și rebranding"),
      description: l(
        "Explore Pure Flame, a portfolio concept by Ramon Bugariu: an online store for sculptural fire tables, with a small rebrand, logo animation and mobile design.",
        "Descoperă Pure Flame, un concept de portofoliu de Ramon Bugariu: magazin online pentru mese cu foc, un mic rebranding, animație de logo și design pentru mobil.",
      ),
    },
    // The brand's own line, kept in English.
    subtitle: same("The art of gathering"),
    services: ["Online store"],
    scope: [l("Online store", "Magazin online"), l("Rebrand", "Rebranding"), l("Motion", "Animație")],
    year: 2026,
    summary: l(
      "Sculptural fire tables in a quiet, editorial online store.",
      "Mese cu foc sculpturale, într-un magazin online editorial și liniștit.",
    ),
    description: [
      l(
        "An online store for sculptural fire tables, with warm materials and quiet editorial pages.",
        "Un magazin online pentru mese cu foc sculpturale, cu materiale calde și pagini editoriale, liniștite.",
      ),
      l(
        "The project covers the online store (homepage, collection, product and about pages, on desktop and mobile) and a small rebrand: the existing hand-lettered logo in a new colour, plus a logo animation for the site.",
        "Proiectul acoperă magazinul online (pagina principală, colecția, paginile de produs și pagina despre noi, pe desktop și mobil) și un mic rebranding: logo-ul existent, scris de mână, într-o culoare nouă, plus o animație de logo pentru site.",
      ),
    ],
    // Media is generated from the live site and the logo source files:
    // `npm run render:pureflame` (compositions in src/remotion/compositions/PureFlame).
    cover: {
      kind: "video",
      src: "/videos/pureflame/showcase.mp4",
      poster: "/videos/pureflame/showcase.jpg",
      width: 1920,
      height: 1080,
      alt: l(
        "The Pure Flame website in a browser, scrolling through the homepage",
        "Site-ul Pure Flame într-un browser, derulând pagina principală",
      ),
    },
    // Self-hosted (the Vimeo copy is private and asked visitors to log in). Source:
    // Pureflame/Behance/mockups/macbook_field_mockup_homepage.mp4, re-encoded without audio.
    // scripts/encode-pureflame-macbook.mjs corrects the baked-in label to PUREFLAME.
    lead: {
      kind: "video",
      src: "/videos/pureflame/macbook-field-corrected.mp4",
      poster: "/videos/pureflame/macbook-field-corrected.jpg",
      width: 1920,
      height: 1080,
      alt: l(
        "Pure Flame homepage on a MacBook, outdoors in a wheat field",
        "Pagina principală Pure Flame pe un MacBook, afară, într-un lan de grâu",
      ),
    },
    sections: [
      {
        title: l("Website", "Site-ul"),
        text: [
          l(
            "The homepage opens on a full-screen film under a single line, “Ignite the moment”. It then moves through the collection, the evening ritual around the fire and a guide that helps you choose a table by the size of your terrace.",
            "Pagina principală se deschide cu un film pe tot ecranul, sub un singur rând: „Ignite the moment”. Apoi trece prin colecție, prin ritualul de seară din jurul focului și printr-un ghid care te ajută să alegi masa după mărimea terasei.",
          ),
          l(
            "The about page tells the story behind the tables: the idea, the materials (flame, glass, stone) and the people who make them.",
            "Pagina despre noi spune povestea din spatele meselor: ideea, materialele (flacără, sticlă, piatră) și oamenii care le fac.",
          ),
        ],
        media: [
          {
            kind: "video",
            src: "/videos/pureflame/showcase.mp4",
            poster: "/videos/pureflame/showcase.jpg",
            width: 1920,
            height: 1080,
            alt: l(
              "The Pure Flame website in motion: homepage and about page",
              "Site-ul Pure Flame în mișcare: pagina principală și pagina despre noi",
            ),
            caption: l(
              "Homepage and about page, recorded on the live site.",
              "Pagina principală și pagina despre noi, înregistrate pe site-ul real.",
            ),
          },
        ],
      },
      {
        title: l("Collection", "Colecția"),
        text: [
          l(
            "The collection page shows the five models (Embera, Aether, Flavo, Fera and Ignite) in large lifestyle photos with a full-screen gallery, then compares their sizes and lists the accessories.",
            "Pagina de colecție arată cele cinci modele (Embera, Aether, Flavo, Fera și Ignite) în fotografii mari, cu galerie pe tot ecranul, apoi le compară mărimile și prezintă accesoriile.",
          ),
        ],
        media: [
          // Source: Pureflame/Behance/mockups/Collection_1.mp4, re-encoded without audio.
          {
            kind: "video",
            src: "/videos/pureflame/collection-field.mp4",
            poster: "/videos/pureflame/collection-field.jpg",
            width: 1536,
            height: 1024,
            alt: l(
              "The Pure Flame collection page on a desktop display in a wheat field: the five models, the comparison and the accessories",
              "Pagina de colecție Pure Flame pe un monitor, într-un lan de grâu: cele cinci modele, comparația și accesoriile",
            ),
            caption: l(
              "The collection: the five models, the comparison and the accessories.",
              "Colecția: cele cinci modele, comparația și accesoriile.",
            ),
          },
        ],
      },
      {
        title: l("Product pages", "Paginile de produs"),
        text: [
          l(
            "Each table has its own page: a gallery with every angle, the finish selector and the buy box. Delivery, secure payment, the two-year warranty and 14-day returns are spelled out right next to the price.",
            "Fiecare masă are pagina ei: o galerie din toate unghiurile, alegerea finisajului și caseta de cumpărare. Livrarea, plata securizată, garanția de doi ani și returul în 14 zile sunt scrise chiar lângă preț.",
          ),
          l(
            "Further down, a 3D view and dimension drawings help you picture the table on your own terrace before ordering.",
            "Mai jos, o vedere 3D și desenele cu dimensiuni te ajută să-ți imaginezi masa pe terasa ta înainte de comandă.",
          ),
        ],
        media: [
          img(
            "/work/pure-flame/product.jpg",
            3840,
            2160,
            l(
              "Embera product page on desktop and the buy box on mobile",
              "Pagina de produs Embera pe desktop și caseta de cumpărare pe mobil",
            ),
            l(
              "Embera: product page on desktop, buy box on mobile.",
              "Embera: pagina de produs pe desktop, caseta de cumpărare pe mobil.",
            ),
          ),
          img(
            "/work/pure-flame/details.jpg",
            3840,
            2160,
            l(
              "Embera details: 3D viewer and dimensions, with the product page on mobile",
              "Detalii Embera: vizualizator 3D și dimensiuni, cu pagina de produs pe mobil",
            ),
            l(
              "3D viewer, footprint and height drawings, specifications.",
              "Vizualizator 3D, desene de suprafață și înălțime, specificații.",
            ),
          ),
        ],
      },
      {
        title: l("Mobile", "Mobil"),
        text: [
          l(
            "On a phone the pages keep the same calm rhythm, with the menu and the cart always one tap away.",
            "Pe telefon, paginile păstrează același ritm liniștit, cu meniul și coșul mereu la o atingere distanță.",
          ),
        ],
        media: [
          img(
            "/work/pure-flame/mobile.jpg",
            3840,
            2160,
            l("The Pure Flame homepage and collection on mobile", "Pagina principală și colecția Pure Flame pe mobil"),
            l("Homepage and collection on mobile.", "Pagina principală și colecția pe mobil."),
          ),
        ],
      },
      {
        title: l("Rebrand", "Rebranding"),
        text: [
          l(
            "The hand-lettered “Pure Flame” logo and the flame mark already existed; I gave them a new colour. In the animation the flame ignites, then the signature writes itself, ready to open the site.",
            "Logo-ul „Pure Flame”, scris de mână, și simbolul flăcării existau deja; eu le-am dat o culoare nouă. În animație, flacăra se aprinde, apoi semnătura se scrie singură, gata să deschidă site-ul.",
          ),
          l(
            "Charcoal, olive, ember, brass and cream carry the warmth of the product, with an editorial serif for headings and a plain, legible sans-serif for the rest.",
            "Cărbune, oliv, jar, alamă și crem duc mai departe căldura produsului, cu un font serif pentru titluri și unul simplu, ușor de citit, pentru restul paginii.",
          ),
        ],
        media: [
          {
            kind: "video",
            src: "/videos/pureflame/identity.mp4",
            poster: "/videos/pureflame/identity.jpg",
            width: 1920,
            height: 1080,
            alt: l(
              "Pure Flame brand film: logo animation, palette, typography and product naming",
              "Filmul de brand Pure Flame: animația logo-ului, paleta, tipografia și numele produselor",
            ),
            caption: l(
              "Logo animation, palette, typography and product naming.",
              "Animația logo-ului, paleta, tipografia și numele produselor.",
            ),
          },
        ],
      },
      {
        title: l("Video ads", "Reclame video"),
        text: [
          l(
            "Two vertical films made pro bono for a friend’s business. Created as portfolio pieces, they were not run as paid campaigns. The footage is AI-generated; I handled the concept, direction and post-production.",
            "Două reclame verticale realizate pro bono pentru afacerea unui prieten, ca piese de portofoliu. Nu au fost difuzate în campanii plătite. Cadrele sunt generate cu AI; conceptul, regia și post-producția îmi aparțin.",
          ),
        ],
        media: [],
        videoAds: [
          {
            id: "forme-create",
            title: same("Forme create în jurul focului"),
            format: l("32 s · Romanian voice-over and captions", "32 s · Voce și subtitrări în română"),
            description: l(
              "A child’s drawing of home becomes a story about a family gathering around the fire. My own voice-over carries the film, with Romanian captions embedded in the picture.",
              "Un desen de copil despre „acasă” devine o poveste despre familia care se adună în jurul focului. Vocea este a mea, iar subtitrările în română sunt incluse în imagine.",
            ),
            role: l(
              "Concept, script, storyboard, AI direction, edit, titles, colour grade with my own LUT, voice-over and sound mix; fire simulation test in Blender.",
              "Concept, scenariu, storyboard, regie AI, montaj, titluri, color grading cu LUT propriu, voce și mix audio; test de simulare a focului în Blender.",
            ),
            tools: same("Krea (MiniMax H3, Kling 3.0, Nano Banana) · Blender · Premiere Pro · After Effects"),
            music: {
              credit: l(
                "Music: Sonican, “Slow Piano – Intimate Cinematic” (Pixabay license).",
                "Muzică: Sonican, „Slow Piano – Intimate Cinematic” (licență Pixabay).",
              ),
            },
            video: {
              kind: "video",
              src: "/videos/pureflame/ads/forme-create.mp4",
              poster: "/videos/pureflame/ads/forme-create.jpg",
              width: 720,
              height: 1280,
              alt: l(
                "Pure Flame: Forme create în jurul focului. A family gathers around a fire table, with Romanian voice-over and embedded captions.",
                "Pure Flame: Forme create în jurul focului. O familie se adună în jurul unei mese cu foc, cu voce și subtitrări în română.",
              ),
            },
          },
          {
            id: "ignite-the-moment",
            title: same("Ignite the Moment"),
            format: l("17 s · English titles · Original music", "17 s · Titluri în engleză · Muzică originală"),
            description: l(
              "A sunset dance on the terrace, cut to the beat of my own music. Close-ups of the Ignite fire table lead into kinetic titles set in the brand’s Anton typeface.",
              "Un dans la apus pe terasă, montat pe ritmul muzicii compuse de mine. Prim-planurile mesei cu foc Ignite duc spre titluri cinetice în Anton, fontul brandului.",
            ),
            role: l(
              "Concept, AI direction, beat-synced edit, kinetic titles, sound and original music.",
              "Concept, regie AI, montaj pe ritm, titluri cinetice, sunet și muzică originală.",
            ),
            tools: same("Seedance 2.0 (1080p) · MiniMax H3 / Krea · Premiere Pro · Anton"),
            music: {
              credit: l("Original music by me", "Muzică originală compusă de mine"),
              href: "https://www.youtube.com/watch?v=RW0nDiGbXQw",
            },
            loop: true,
            video: {
              kind: "video",
              src: "/videos/pureflame/ads/ignite-the-moment.mp4",
              poster: "/videos/pureflame/ads/ignite-the-moment.jpg",
              width: 720,
              height: 1280,
              alt: l(
                "Pure Flame: Ignite the Moment. A sunset terrace dance and close-ups of the Ignite fire table, edited to original music.",
                "Pure Flame: Ignite the Moment. Un dans pe terasă la apus și prim-planuri cu masa cu foc Ignite, montate pe muzică originală.",
              ),
            },
          },
        ],
      },
    ],
    details: [
      {
        label: l("Scope", "Ce include"),
        value: l(
          "E-commerce, UI/UX, art direction, rebrand (logo colour), logo animation",
          "E-commerce, UI/UX, direcție artistică, rebranding (culoarea logo-ului), animație de logo",
        ),
      },
      { label: l("Platforms", "Platforme"), value: l("Desktop & mobile", "Desktop și mobil") },
      { label: l("Type", "Tip"), value: l("Portfolio concept", "Concept de portofoliu") },
      {
        label: l("Build", "Tehnologie"),
        value: l(
          "Hand-coded site, card payments with Stripe in test mode",
          "Site scris în cod, plăți cu cardul prin Stripe, în mod de test",
        ),
      },
      {
        label: l("Live demo", "Demo live"),
        value: l(
          "pureflameportofolioeditorial.vercel.app (front end only)",
          "pureflameportofolioeditorial.vercel.app (doar front end)",
        ),
        href: "https://pureflameportofolioeditorial.vercel.app",
      },
      {
        label: l("Source", "Cod sursă"),
        value: same("github.com/genesis99949/pureflame_portofolio_editorial"),
        href: "https://github.com/genesis99949/pureflame_portofolio_editorial",
      },
    ],
    // From the project files: package.json (Express, Stripe), the pages (GSAP, three.js), Vercel deploy,
    // and the design/motion sources (.psd, .ai, .aep, .prproj, .blend, Claude/Codex setup).
    stack: {
      built: ["html", "css", "javascript", "gsap", "threejs", "nodejs", "express", "stripe", "vercel", "github"],
      made: ["photoshop", "illustrator", "afterEffects", "premierePro", "blender", "claude", "codex"],
    },
  },
  {
    slug: "david-craft-ale",
    title: "David Craft Ale",
    disclosure: l("Portfolio concept", "Concept de portofoliu"),
    seo: {
      title: l("David Craft Ale: online store & branding", "David Craft Ale: magazin online și branding"),
      description: l(
        "Explore David Craft Ale, a portfolio concept by Ramon Bugariu: an animated craft beer online store, with visual identity, label design and packaging.",
        "Descoperă David Craft Ale, un concept de portofoliu de Ramon Bugariu: magazin online animat pentru bere artizanală, identitate vizuală, etichete și ambalaje.",
      ),
    },
    // The brand's own line, kept in English.
    subtitle: same("The new age of beer"),
    services: ["Online store"],
    scope: [l("Online store", "Magazin online"), l("Brand identity", "Identitate de brand"), l("Packaging", "Ambalaje")],
    year: 2026,
    summary: l(
      "Identity and online store for a craft beer brand: four beers, one colour each, and Hopper, a winged hop.",
      "Identitate și magazin online pentru un brand de bere artizanală: patru beri, câte o culoare fiecare, și Hopper, un hamei cu aripi.",
    ),
    description: [
      l(
        "Small batch, big personality: a complete identity and an animated online shop for a craft beer brand with four beers and a mascot of its own.",
        "Small batch, big personality: o identitate completă și un magazin online animat pentru un brand de bere artizanală, cu patru beri și o mascotă proprie.",
      ),
      l(
        "The brand board, the labels and the website share the same colours, typefaces and graphic elements, and the website tells the story in motion. The identity was part of this portfolio concept; I no longer take on logo or identity projects.",
        "Planșa de brand, etichetele și site-ul folosesc aceleași culori, fonturi și elemente grafice, iar site-ul spune povestea în mișcare. Identitatea a făcut parte din acest concept de portofoliu; acum nu mai preiau proiecte de logo sau identitate.",
      ),
    ],
    cover: {
      kind: "video",
      src: "/videos/davidcraft/home-cover.mp4",
      poster: "/videos/davidcraft/home-cover.jpg",
      width: 1920,
      height: 1080,
      alt: l(
        "The David Craft Ale homepage in a browser: Hopper, the four beers and the brew picker",
        "Pagina principală David Craft Ale într-un browser: Hopper, cele patru beri și selectorul de bere",
      ),
    },
    lead: {
      kind: "video",
      src: "/videos/davidcraft/home.mp4",
      poster: "/videos/davidcraft/home.jpg",
      width: 1920,
      height: 1080,
      alt: l(
        "The David Craft Ale homepage in motion: splash loader, Hopper following the cursor, the brew picker and reviews",
        "Pagina principală David Craft Ale în mișcare: ecranul de încărcare, Hopper care urmărește cursorul, selectorul de bere și recenziile",
      ),
      caption: l(
        "The homepage, recorded on the live site.",
        "Pagina principală, înregistrată pe site-ul real.",
      ),
    },
    sections: [
      {
        title: l("Identity", "Identitatea"),
        text: [
          l(
            "An eight-point star as the symbol, the name in bold letters (DAVID in cocoa over CRAFT ALE in brick red) and Hopper, the winged hop, as the mascot. A rotating seal and a strip with the brand's own lines complete the set.",
            "O stea cu opt colțuri ca simbol, numele scris cu litere groase (DAVID în cacao peste CRAFT ALE în roșu cărămiziu) și Hopper, hameiul cu aripi, ca mascotă. Un sigiliu rotativ și o bandă cu replicile brandului completează setul.",
          ),
          l(
            "Cream, paper, honey, cocoa and ink carry the brand; each beer (Blonde, Amber, IPA and Dark) adds one colour of its own.",
            "Crem, hârtie, miere, cacao și cerneală poartă brandul; fiecare bere (Blonde, Amber, IPA și Dark) adaugă o culoare proprie.",
          ),
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/identity.mp4",
            poster: "/videos/davidcraft/identity.jpg",
            width: 1920,
            height: 1080,
            alt: l(
              "David Craft Ale identity film: primary logo, splash mark and rotating seal, the four beers and the marquee",
              "Filmul de identitate David Craft Ale: logo-ul principal, semnul de deschidere și sigiliul rotativ, cele patru beri și banda",
            ),
            caption: l(
              "Identity film: logo, seal, the four beers and the strip.",
              "Filmul de identitate: logo-ul, sigiliul, cele patru beri și banda.",
            ),
          },
          img(
            "/work/david-craft-ale/brand-identity.jpg",
            3840,
            3162,
            l(
              "David Craft Ale brand identity, Edition 02: primary logo, on-colour versions, seal, logomark, Hopper, palette, typography, graphic elements and the four beers",
              "Identitatea David Craft Ale, Ediția 02: logo principal, versiuni pe culoare, sigiliu, simbol, Hopper, paletă, tipografie, elemente grafice și cele patru beri",
            ),
            l("Brand board, Edition 02.", "Planșa de brand, Ediția 02."),
          ),
        ],
      },
      {
        title: l("Labels & packaging", "Etichete și ambalaje"),
        text: [
          l(
            "Each beer has a neck label and a front label on the same cream frame: Hopper, the David Craft Ale wordmark, \"Good beer. Good company.\" and the essentials (volume, alcohol, bitterness).",
            "Fiecare bere are o etichetă de gât și una de față pe același cadru crem: Hopper, numele David Craft Ale, „Good beer. Good company.” și datele de bază (volum, alcool, amăreală).",
          ),
          l(
            "Only the beer's name and colour change from one label to the next, and the cans carry the same label, so the four beers read as one family on the shelf.",
            "De la o etichetă la alta se schimbă doar numele și culoarea berii, iar dozele poartă aceeași etichetă, așa că cele patru beri se citesc pe raft ca o singură familie.",
          ),
        ],
        media: [
          img(
            "/work/david-craft-ale/bottles.jpg",
            1440,
            941,
            l(
              "The four David Craft Ale bottles: Blonde Ale, Amber Pale Ale, IPA and Dark Lager, each with its neck and front label",
              "Cele patru sticle David Craft Ale: Blonde Ale, Amber Pale Ale, IPA și Dark Lager, fiecare cu eticheta de gât și de față",
            ),
            l("Blonde Ale, Amber Pale Ale, IPA and Dark Lager.", "Blonde Ale, Amber Pale Ale, IPA și Dark Lager."),
          ),
          img(
            "/work/david-craft-ale/cans.jpg",
            1803,
            1530,
            l("Three David Craft Ale cans", "Trei doze David Craft Ale"),
            l("Cans.", "Dozele."),
          ),
        ],
      },
      {
        title: l("Homepage & story", "Pagina principală și povestea"),
        text: [
          l(
            "On the homepage, Hopper follows the cursor. Picking a beer recolours the shelf, and pages change through “the pour”: four bands in the beer colours that rise like beer filling a glass.",
            "Pe pagina principală, Hopper urmărește cursorul. Alegerea unei beri recolorează raftul, iar paginile se schimbă prin „the pour”: patru benzi în culorile berilor, care se ridică precum berea într-un pahar.",
          ),
          l(
            "The story page walks through the brewery journey in seven steps, from milling to bottling and good company, each illustration linked to the next by a line that draws itself as you scroll.",
            "Pagina cu povestea parcurge drumul berii în șapte pași, de la măcinare la îmbuteliere și compania bună, fiecare ilustrație legată de următoarea printr-o linie care se desenează pe măsură ce derulezi.",
          ),
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/story.mp4",
            poster: "/videos/davidcraft/story.jpg",
            width: 1920,
            height: 1080,
            alt: l(
              "The David Craft Ale story page: image reveals, the seven-step brewery journey and the courtyard",
              "Pagina cu povestea David Craft Ale: dezvăluirea imaginilor, drumul berii în șapte pași și curtea",
            ),
            caption: l(
              "The story page and the brewery journey.",
              "Povestea și drumul berii.",
            ),
          },
        ],
      },
      {
        title: l("Product pages", "Paginile de produs"),
        text: [
          l(
            "Every beer has its own page: a photo gallery, the essentials (volume, alcohol, bitterness) and a choice between bottle and can, single or six-pack, with the photo and price following the choice.",
            "Fiecare bere are pagina ei: o galerie foto, informațiile esențiale (volum, alcool, amăreală) și alegerea între sticlă și doză, bucată sau bax de șase, cu poza și prețul care se schimbă după alegere.",
          ),
          l(
            "Hopper gets a page of his own as a limited-edition plush toy, next to the rest of the merch: beer mats, a bottle opener and a pint glass.",
            "Hopper are propria pagină, ca jucărie de pluș în ediție limitată, lângă restul produselor: suporturi de pahar, un desfăcător și un pahar de bere.",
          ),
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/product.mp4",
            poster: "/videos/davidcraft/product.jpg",
            width: 1920,
            height: 1080,
            alt: l(
              "The Blonde Ale product page and the Hopper plushie page, joined by the pour transition",
              "Pagina de produs Blonde Ale și pagina jucăriei Hopper, legate prin tranziția „pour”",
            ),
            caption: l(
              "The beer page and the Hopper plush page, with the site's own page transition between them.",
              "Pagina berii și jucăria Hopper, cu tranziția dintre pagini a site-ului.",
            ),
          },
        ],
      },
      {
        title: l("Shop", "Magazinul"),
        text: [
          l(
            "“Pick your pour” lays out the whole range: bottles, cans, six-packs and accessories. Pointing at a product shows a close-up photo, and a quick preview opens any product without leaving the page.",
            "„Pick your pour” așază toată gama: sticle, doze, baxuri de șase și accesorii. Când treci cu mouse-ul peste un produs apare o fotografie de aproape, iar o previzualizare rapidă deschide orice produs fără să părăsești pagina.",
          ),
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/shop.mp4",
            poster: "/videos/davidcraft/shop.jpg",
            width: 1920,
            height: 1080,
            alt: l(
              "The David Craft Ale shop: product hover, quick view, bottles, cans and accessories",
              "Magazinul David Craft Ale: fotografii de aproape, previzualizare rapidă, sticle, doze și accesorii",
            ),
            caption: l(
              "The shop: close-ups and the quick preview.",
              "Magazinul: fotografii de aproape și previzualizarea rapidă.",
            ),
          },
        ],
      },
      {
        title: l("Mobile", "Mobil"),
        text: [
          l(
            "On mobile the beer shelf becomes a carousel you tap or swipe, the brewery journey turns into a vertical trail, and the quick preview and distributor map stay one tap away.",
            "Pe mobil, raftul de beri devine un carusel pe care îl atingi sau îl glisezi, drumul berii devine un traseu vertical, iar previzualizarea rapidă și harta distribuitorilor rămân la o atingere distanță.",
          ),
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/mobile.mp4",
            poster: "/videos/davidcraft/mobile.jpg",
            width: 1920,
            height: 1080,
            alt: l(
              "The David Craft Ale website on three phones: story, homepage and shop",
              "Site-ul David Craft Ale pe trei telefoane: povestea, pagina principală și magazinul",
            ),
            caption: l("Story, homepage and shop on mobile.", "Povestea, pagina principală și magazinul pe mobil."),
          },
        ],
      },
    ],
    details: [
      {
        label: l("Scope", "Ce include"),
        value: l(
          "Identity, mascot, labels & packaging, website, e-commerce",
          "Identitate, mascotă, etichete și ambalaje, site, e-commerce",
        ),
      },
      { label: l("Identity", "Identitate"), value: l("Edition 02 · October 2026", "Ediția 02 · octombrie 2026") },
      { label: l("Platforms", "Platforme"), value: l("Desktop, tablet & mobile", "Desktop, tabletă și mobil") },
      { label: l("Type", "Tip"), value: l("Portfolio concept", "Concept de portofoliu") },
      { label: l("Live demo", "Demo live"), value: same("dca-murex.vercel.app"), href: "https://dca-murex.vercel.app" },
    ],
    // From the project files: static pages with GSAP, Lenis and Remotion-made animations, Vercel deploy;
    // Blender scenes, Python asset scripts (OpenAI images) and the Claude setup.
    stack: {
      built: ["html", "css", "javascript", "gsap", "lenis", "remotion", "vercel"],
      made: ["blender", "python", "chatgpt", "claude"],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
