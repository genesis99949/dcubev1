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
  /** Short line under the title on the project page. */
  subtitle?: L;
  services: Service[];
  /** What the work covered, e.g. "Online store · Brand identity" (tile and page eyebrow). */
  scope: L[];
  year: number;
  /** One line, shown in lists and as the meta description. */
  summary: L;
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
    // The brand's own line, kept in English.
    subtitle: same("The art of gathering"),
    services: ["Online store"],
    scope: [l("Online store", "Magazin online"), l("Brand identity", "Identitate de brand"), l("Motion", "Animație")],
    year: 2026,
    summary: l(
      "A digital experience for outdoor living — sculptural fire tables in a quiet, editorial e-commerce journey.",
      "O experiență digitală pentru viața în aer liber — mese cu foc sculpturale, într-un magazin online editorial și liniștit.",
    ),
    description: [
      l(
        "A digital experience for outdoor living. Sculptural fire tables, warm materials and quiet editorial layouts come together in a visual e-commerce journey for PureFlame.",
        "O experiență digitală pentru viața în aer liber. Mese cu foc sculpturale, materiale calde și pagini editoriale, liniștite, se leagă într-un parcurs vizual de cumpărare pentru PureFlame.",
      ),
      l(
        "The project covers the online shop — homepage, collection, product and about pages, on desktop and mobile — and the identity around it: the hand-lettered wordmark, the flame mark, colour, typography and a logo animation for the site.",
        "Proiectul acoperă magazinul online — pagina principală, colecția, paginile de produs și pagina despre noi, pe desktop și mobil — și identitatea din jurul lui: logotipul scris de mână, simbolul flăcării, culorile, tipografia și o animație de logo pentru site.",
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
        "The PureFlame website in a browser, scrolling through the homepage",
        "Site-ul PureFlame într-un browser, derulând pagina principală",
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
        "PureFlame homepage on a MacBook, outdoors in a wheat field",
        "Pagina principală PureFlame pe un MacBook, afară, într-un lan de grâu",
      ),
    },
    sections: [
      {
        title: l("Website", "Site-ul"),
        text: [
          l(
            "The homepage opens on a full-screen film under a single line — “Ignite the moment” — then moves through the collection, the evening ritual around the fire and a guide that helps you choose a table by the size of your terrace.",
            "Pagina principală se deschide cu un film pe tot ecranul, sub un singur rând — „Ignite the moment” — apoi trece prin colecție, prin ritualul de seară din jurul focului și printr-un ghid care te ajută să alegi masa după mărimea terasei.",
          ),
          l(
            "The about page tells the story behind the tables: the idea, the materials — flame, glass, stone — and the people who make them.",
            "Pagina despre noi spune povestea din spatele meselor: ideea, materialele — flacără, sticlă, piatră — și oamenii care le fac.",
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
              "The PureFlame website in motion: homepage and about page",
              "Site-ul PureFlame în mișcare: pagina principală și pagina despre noi",
            ),
            caption: l(
              "Homepage and about — recorded scrolling through the live site.",
              "Pagina principală și pagina despre noi — înregistrate derulând site-ul real.",
            ),
          },
        ],
      },
      {
        title: l("Collection", "Colecția"),
        text: [
          l(
            "The collection page presents the five models — Embera, Aether, Flavo, Fera and Ignite — as large lifestyle compositions with a full-screen gallery view, followed by a side-by-side comparison of their proportions and the accessories.",
            "Pagina de colecție prezintă cele cinci modele — Embera, Aether, Flavo, Fera și Ignite — în compoziții mari, de tip lifestyle, cu galerie pe tot ecranul, urmate de o comparație a proporțiilor și de accesorii.",
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
              "The PureFlame collection page on a desktop display in a wheat field: the five models, the comparison and the accessories",
              "Pagina de colecție PureFlame pe un monitor, într-un lan de grâu: cele cinci modele, comparația și accesoriile",
            ),
            caption: l(
              "Collection — the five models, the comparison and the accessories.",
              "Colecția — cele cinci modele, comparația și accesoriile.",
            ),
          },
        ],
      },
      {
        title: l("Product pages", "Paginile de produs"),
        text: [
          l(
            "Each table has its own page: a gallery with every angle, the finish selector and the buy box — with delivery, secure payment, the two-year warranty and 14-day returns spelled out right next to the price.",
            "Fiecare masă are pagina ei: o galerie din toate unghiurile, selectorul de finisaj și caseta de cumpărare — cu livrarea, plata securizată, garanția de doi ani și returul în 14 zile scrise chiar lângă preț.",
          ),
          l(
            "Further down, a 3D viewer and dimension drawings — top view for the footprint, front view for the height — help judge the table against a real terrace before ordering.",
            "Mai jos, un vizualizator 3D și desenele cu dimensiuni — vedere de sus pentru suprafață, vedere din față pentru înălțime — te ajută să vezi masa pe o terasă reală înainte de comandă.",
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
              "Embera — product page on desktop, buy box on mobile.",
              "Embera — pagina de produs pe desktop, caseta de cumpărare pe mobil.",
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
            "On a phone the pages keep the same editorial rhythm — the film-led hero, the collection and the product pages — with the menu and the cart always one tap away.",
            "Pe telefon, paginile păstrează același ritm editorial — deschiderea cu film, colecția și paginile de produs — cu meniul și coșul mereu la o atingere distanță.",
          ),
        ],
        media: [
          img(
            "/work/pure-flame/mobile.jpg",
            3840,
            2160,
            l("The PureFlame homepage and collection on mobile", "Pagina principală și colecția PureFlame pe mobil"),
            l("Homepage and collection on mobile.", "Pagina principală și colecția pe mobil."),
          ),
        ],
      },
      {
        title: l("Identity", "Identitatea"),
        text: [
          l(
            "The hand-lettered “Pure Flame” wordmark and the flame mark come straight from the logo master file. In the animation the flame ignites, then the signature is written in its original stroke order — exported with a transparent background so it can open the site itself.",
            "Logotipul „Pure Flame”, scris de mână, și simbolul flăcării vin direct din fișierul master al logo-ului. În animație, flacăra se aprinde, apoi semnătura se scrie în ordinea originală a trăsăturilor — exportată cu fundal transparent, ca să poată deschide chiar site-ul.",
          ),
          l(
            "Charcoal, olive, ember, brass and cream carry the warmth of the product. Georgia gives the brand its editorial voice; Work Sans keeps the interface quiet and legible.",
            "Cărbune, oliv, jar, alamă și crem duc mai departe căldura produsului. Georgia dă brandului vocea editorială; Work Sans păstrează interfața liniștită și ușor de citit.",
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
              "PureFlame identity film: logo animation, palette, typography and product naming",
              "Filmul de identitate PureFlame: animația logo-ului, paleta, tipografia și numele produselor",
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
            // Add music.href when the new YouTube upload is available.
            music: { credit: l("Original music by me", "Muzică originală compusă de mine") },
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
          "E-commerce, UI/UX, art direction, identity, logo animation",
          "E-commerce, UI/UX, direcție artistică, identitate, animație de logo",
        ),
      },
      { label: l("Platforms", "Platforme"), value: l("Desktop & mobile", "Desktop și mobil") },
      { label: l("Type", "Tip"), value: l("Portfolio concept", "Concept de portofoliu") },
      {
        label: l("Build", "Tehnologie"),
        value: l(
          "HTML/CSS/JS front end, Node.js + Express back end, Stripe in test mode",
          "Front end HTML/CSS/JS, back end Node.js + Express, Stripe în mod de test",
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
    // The brand's own line, kept in English.
    subtitle: same("The new age of beer"),
    services: ["Online store"],
    scope: [l("Online store", "Magazin online"), l("Brand identity", "Identitate de brand"), l("Packaging", "Ambalaje")],
    year: 2026,
    summary: l(
      "Identity and online shop for a small-batch craft beer brand — four beers, one colour each, and Hopper, a winged hop who never arrives empty-winged.",
      "Identitate și magazin online pentru un brand de bere artizanală — patru beri, câte o culoare fiecare, și Hopper, un hamei cu aripi care nu vine niciodată cu aripile goale.",
    ),
    description: [
      l(
        "Small batch, big personality: a complete identity and an animated online shop for a craft beer brand with four beers and a mascot of its own.",
        "Small batch, big personality: o identitate completă și un magazin online animat pentru un brand de bere artizanală, cu patru beri și o mascotă proprie.",
      ),
      l(
        "The identity was rebuilt as Edition 02 straight from the live site, so the brand board, the labels and the website share one set of colours, typefaces and graphic elements — and the website does the storytelling in motion.",
        "Identitatea a fost refăcută ca Ediția 02 pornind direct de la site, astfel încât planșa de brand, etichetele și site-ul folosesc aceleași culori, fonturi și elemente grafice — iar site-ul spune povestea în mișcare.",
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
        "Homepage — recorded frame by frame from the site, every animation at its real speed.",
        "Pagina principală — înregistrată cadru cu cadru de pe site, fiecare animație la viteza ei reală.",
      ),
    },
    sections: [
      {
        title: l("Identity", "Identitatea"),
        text: [
          l(
            "An 8-point star as the logomark, a slab-serif wordmark — DAVID in cocoa over CRAFT ALE in brick red — and Hopper, the winged hop, as the mascot. A rotating seal, a splash mark set in Archivo and a marquee of the brand's own lines complete the kit.",
            "O stea cu 8 colțuri ca simbol, un logotip slab-serif — DAVID în cacao peste CRAFT ALE în roșu cărămiziu — și Hopper, hameiul cu aripi, ca mascotă. Un sigiliu rotativ, un semn de deschidere scris în Archivo și o bandă cu replicile brandului completează setul.",
          ),
          l(
            "Alfa Slab One for display, Hanken Grotesk for text and interface. Cream, paper, honey, cocoa and ink carry the brand; each beer adds one colour of its own — Blonde, Amber, IPA and Dark.",
            "Alfa Slab One pentru titluri, Hanken Grotesk pentru text și interfață. Crem, hârtie, miere, cacao și cerneală poartă brandul; fiecare bere adaugă o culoare proprie — Blonde, Amber, IPA și Dark.",
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
              "Identity film — logo, splash mark, seal, the four and the marquee, joined by the site's pour transition.",
              "Filmul de identitate — logo, semnul de deschidere, sigiliul, cele patru beri și banda, legate prin tranziția „pour” a site-ului.",
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
            "Each beer has its own label set — neck, front, side and back, the back with tasting notes and ingredients — built on the same frame: the arched David Craft Ale name, Hopper and the beer's own colour.",
            "Fiecare bere are propriul set de etichete — de gât, față, lateral și spate, cea din spate cu note de degustare și ingrediente — construite pe același cadru: numele David Craft Ale în arc, Hopper și culoarea fiecărei beri.",
          ),
          l(
            "The cans and the six-pack carriers carry the same system, so the four beers read as one family on the shelf.",
            "Dozele și cutiile de șase poartă același sistem, așa că cele patru beri se citesc pe raft ca o singură familie.",
          ),
        ],
        media: [
          img(
            "/work/david-craft-ale/labels-blonde.jpg",
            1448,
            1086,
            l(
              "Blonde Ale bottle from the front, side and back: neck, front, side and back labels",
              "Sticla Blonde Ale din față, din lateral și din spate: etichetele de gât, față, lateral și spate",
            ),
            same("Blonde Ale"),
            "half",
          ),
          img(
            "/work/david-craft-ale/labels-amber.jpg",
            1448,
            1086,
            l(
              "Amber Pale Ale bottle from the front, side and back: neck, front, side and back labels",
              "Sticla Amber Pale Ale din față, din lateral și din spate: etichetele de gât, față, lateral și spate",
            ),
            same("Amber Pale Ale"),
            "half",
          ),
          img(
            "/work/david-craft-ale/labels-ipa.jpg",
            1448,
            1086,
            l(
              "IPA bottle from the front, side and back: neck, front, side and back labels",
              "Sticla IPA din față, din lateral și din spate: etichetele de gât, față, lateral și spate",
            ),
            same("IPA"),
            "half",
          ),
          img(
            "/work/david-craft-ale/labels-dark.jpg",
            1448,
            1086,
            l(
              "Dark Lager bottle from the front, side and back: neck, front, side and back labels",
              "Sticla Dark Lager din față, din lateral și din spate: etichetele de gât, față, lateral și spate",
            ),
            same("Dark Lager"),
            "half",
          ),
          img(
            "/work/david-craft-ale/cans.jpg",
            1803,
            1530,
            l("Three David Craft Ale cans", "Trei doze David Craft Ale"),
            l("Cans.", "Dozele."),
            "half",
          ),
          img(
            "/work/david-craft-ale/six-pack-ipa.jpg",
            1536,
            1024,
            l("IPA six-pack of cans in its carrier", "Pachet de șase doze IPA în cutia lui"),
            l("Six-pack carrier — IPA.", "Cutia de șase — IPA."),
            "half",
          ),
        ],
      },
      {
        title: l("Homepage & story", "Pagina principală și povestea"),
        text: [
          l(
            "The homepage opens with a splash, then lets Hopper chase the cursor around the hero. Picking a beer recolours the shelf and the “Now pouring” panel; pages hand over through “the pour” — four bands in the beer colours rising and unwinding like a glass being filled.",
            "Pagina principală se deschide cu un ecran de încărcare, apoi îl lasă pe Hopper să urmărească cursorul prin hero. Alegerea unei beri recolorează raftul și panoul „Now pouring”; paginile se schimbă prin „the pour” — patru benzi în culorile berilor care se ridică și se retrag ca un pahar care se umple.",
          ),
          l(
            "The story page reveals its illustrations through irises and curtains, then walks through the brewery journey in seven steps — milling, mashing, boiling, fermentation, conditioning, bottling and good company — each illustration linked to the next by a line that draws itself as you scroll.",
            "Pagina cu povestea își dezvăluie ilustrațiile prin efecte de iris și cortină, apoi parcurge drumul berii în șapte pași — măcinare, plămădire, fierbere, fermentare, maturare, îmbuteliere și compania bună — fiecare ilustrație legată de următoarea printr-o linie care se desenează pe măsură ce derulezi.",
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
              "Our story — iris and curtain reveals, and the brewery journey drawn by scroll.",
              "Povestea — dezvăluiri iris și cortină, și drumul berii desenat la scroll.",
            ),
          },
        ],
      },
      {
        title: l("Product pages", "Paginile de produs"),
        text: [
          l(
            "Every beer has its own page: a photo gallery, the essentials (volume, ABV, IBU) and a switch between bottle and can, single and six-pack, with photo and price following the choice.",
            "Fiecare bere are pagina ei: o galerie foto, informațiile esențiale (volum, alcool, IBU) și opțiunea între sticlă și doză, bucată sau bax de șase, cu poza și prețul care se schimbă după alegere.",
          ),
          l(
            "Hopper gets a page of his own as a limited plush drop, with a gallery and the rest of the merch — beer mats, a bottle opener and a pint glass.",
            "Hopper are propria pagină, ca jucărie de pluș în ediție limitată, cu galerie și restul produselor — suporturi de pahar, un desfăcător și un pahar de bere.",
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
              "Beer page and Hopper plushie — the pour in between is the site's own page transition.",
              "Pagina berii și jucăria Hopper — tranziția dintre ele e chiar cea a site-ului.",
            ),
          },
        ],
      },
      {
        title: l("Shop", "Magazinul"),
        text: [
          l(
            "“Pick your pour” lays out the whole lineup — bottles, cans, six-packs and accessories. Hovering a product swaps in a close-up photo, and a quick view opens any product without leaving the page.",
            "„Pick your pour” așază toată gama — sticle, doze, baxuri de șase și accesorii. La trecerea cu mouse-ul peste un produs apare o fotografie de aproape, iar quick view-ul deschide orice produs fără să părăsești pagina.",
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
              "Magazinul David Craft Ale: hover pe produse, quick view, sticle, doze și accesorii",
            ),
            caption: l(
              "Shop — hover close-ups and the quick view.",
              "Magazinul — fotografii de aproape la hover și quick view-ul.",
            ),
          },
        ],
      },
      {
        title: l("Mobile", "Mobil"),
        text: [
          l(
            "On mobile the beer shelf becomes a carousel you tap or swipe, the brewery journey turns into a vertical trail, and the quick view and distributor map stay one thumb away.",
            "Pe mobil, raftul de beri devine un carusel pe care îl atingi sau îl glisezi, drumul berii devine un traseu vertical, iar quick view-ul și harta distribuitorilor rămân la un deget distanță.",
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
