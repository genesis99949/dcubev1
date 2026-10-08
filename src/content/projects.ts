// Portfolio entries, in display order. Each one gets a case-study page at /work/<slug>.
//
// Images: put them in public/work/<slug>/ and list them with their pixel size.
// Videos: render them from Remotion (public/videos), or drop in any MP4 + JPEG poster.
// Hosted videos: use a `vimeo` item with the video id.

import type { Service } from "./services";

// A project lists only the services (cube faces, see ./services.ts) it actually involved.
export type { Service };

export type Media =
  | { kind: "image"; src: string; width: number; height: number; alt: string }
  | { kind: "video"; src: string; poster: string; width: number; height: number; alt: string }
  /** Vimeo embed, played as a silent, looping background video without controls. */
  | { kind: "vimeo"; id: string; width: number; height: number; alt: string };

/** `half` items sit side by side on wide screens; `caption` is shown under the media. */
export type GalleryItem = Media & { span?: "full" | "half"; caption?: string };

/** One chapter of a case study: a heading, a few paragraphs, then its media. */
export type ProjectSection = {
  title: string;
  text: string[];
  media: GalleryItem[];
};

export type Project = {
  slug: string;
  title: string;
  /** Short line under the title on the project page. */
  subtitle?: string;
  services: Service[];
  year: number;
  /** One line, shown in lists and as the meta description. */
  summary: string;
  /** Intro paragraphs, shown right after the lead media. */
  description: string[];
  /** Video/image in the project's tile on the home page (16:9). */
  cover: Media;
  /** First media on the project page, above the intro. */
  lead?: GalleryItem;
  /** The case study, chapter by chapter. Every view should appear only once. */
  sections: ProjectSection[];
  /** Extra facts on the project page. */
  details?: { label: string; value: string }[];
};

const img = (
  src: string,
  width: number,
  height: number,
  alt: string,
  caption?: string,
  span: GalleryItem["span"] = "full",
): GalleryItem => ({ kind: "image", src, width, height, alt, caption, span });

export const projects: Project[] = [
  {
    slug: "pure-flame",
    title: "PureFlame",
    subtitle: "The art of gathering",
    services: ["Web Design", "E-commerce", "Brand Identity", "Motion & Content"],
    year: 2026,
    summary:
      "A digital experience for outdoor living — sculptural fire tables in a quiet, editorial e-commerce journey.",
    description: [
      "A digital experience for outdoor living. Sculptural fire tables, warm materials and quiet editorial layouts come together in a visual e-commerce journey for PureFlame.",
      "The project covers the online shop — homepage, collection, product and about pages, on desktop and mobile — and the identity around it: the hand-lettered wordmark, the flame mark, colour, typography and a logo animation for the site.",
    ],
    // Media is generated from the live site and the logo source files:
    // `npm run render:pureflame` (compositions in src/remotion/compositions/PureFlame).
    cover: {
      kind: "video",
      src: "/videos/pureflame/showcase.mp4",
      poster: "/videos/pureflame/showcase.jpg",
      width: 1920,
      height: 1080,
      alt: "The PureFlame website in a browser, scrolling through the homepage",
    },
    lead: {
      kind: "vimeo",
      id: "1230886081",
      width: 1920,
      height: 1080,
      alt: "PureFlame homepage on a MacBook, outdoors in a wheat field",
    },
    sections: [
      {
        title: "Website",
        text: [
          "The homepage opens on a full-screen film under a single line — “Ignite the moment” — then moves through the collection, the evening ritual around the fire and a guide that helps you choose a table by the size of your terrace.",
          "The collection page presents the five models — Embera, Aether, Flavo, Fera and Ignite — as large lifestyle compositions, followed by a side-by-side comparison and the accessories. The about page tells the story behind the tables: the idea, the materials — flame, glass, stone — and the people who make them.",
        ],
        media: [
          {
            kind: "video",
            src: "/videos/pureflame/showcase.mp4",
            poster: "/videos/pureflame/showcase.jpg",
            width: 1920,
            height: 1080,
            alt: "The PureFlame website in motion: homepage, collection and about pages",
            caption: "Homepage, collection and about — recorded scrolling through the live site.",
          },
        ],
      },
      {
        title: "Product pages",
        text: [
          "Each table has its own page: a gallery with every angle, the finish selector and the buy box — with delivery, secure payment, the two-year warranty and 14-day returns spelled out right next to the price.",
          "Further down, a 3D viewer and dimension drawings — top view for the footprint, front view for the height — help judge the table against a real terrace before ordering.",
        ],
        media: [
          img(
            "/work/pure-flame/product.jpg",
            3840,
            2160,
            "Embera product page on desktop and the buy box on mobile",
            "Embera — product page on desktop, buy box on mobile.",
          ),
          img(
            "/work/pure-flame/details.jpg",
            3840,
            2160,
            "Embera details: 3D viewer and dimensions, with the product page on mobile",
            "3D viewer, footprint and height drawings, specifications.",
          ),
        ],
      },
      {
        title: "Mobile",
        text: [
          "On a phone the pages keep the same editorial rhythm — the film-led hero, the collection and the product pages — with the menu and the cart always one tap away.",
        ],
        media: [
          img(
            "/work/pure-flame/mobile.jpg",
            3840,
            2160,
            "The PureFlame homepage and collection on mobile",
            "Homepage and collection on mobile.",
          ),
        ],
      },
      {
        title: "Identity",
        text: [
          "The hand-lettered “Pure Flame” wordmark and the flame mark come straight from the logo master file. In the animation the flame ignites, then the signature is written in its original stroke order — exported with a transparent background so it can open the site itself.",
          "Charcoal, olive, ember, brass and cream carry the warmth of the product. Georgia gives the brand its editorial voice; Work Sans keeps the interface quiet and legible.",
        ],
        media: [
          {
            kind: "video",
            src: "/videos/pureflame/identity.mp4",
            poster: "/videos/pureflame/identity.jpg",
            width: 1920,
            height: 1080,
            alt: "PureFlame identity film: logo animation, palette, typography and product naming",
            caption: "Logo animation, palette, typography and product naming.",
          },
        ],
      },
    ],
    details: [
      { label: "Scope", value: "E-commerce, UI/UX, art direction, identity, logo animation" },
      { label: "Platforms", value: "Desktop & mobile" },
      { label: "Type", value: "Portfolio concept" },
      { label: "Build", value: "HTML/CSS/JS front end, Node.js + Express back end, Stripe in test mode" },
    ],
  },
  {
    slug: "david-craft-ale",
    title: "David Craft Ale",
    subtitle: "The new age of beer",
    services: ["Web Design", "E-commerce", "Brand Identity"],
    year: 2026,
    summary:
      "Identity and online shop for a small-batch craft beer brand — four beers, one colour each, and Hopper, a winged hop who never arrives empty-winged.",
    description: [
      "Small batch, big personality: a complete identity and an animated online shop for a craft beer brand with four beers and a mascot of its own.",
      "The identity was rebuilt as Edition 02 straight from the live site, so the brand board, the labels and the website share one set of colours, typefaces and graphic elements — and the website does the storytelling in motion.",
    ],
    cover: {
      kind: "video",
      src: "/videos/davidcraft/home-cover.mp4",
      poster: "/videos/davidcraft/home-cover.jpg",
      width: 1920,
      height: 1080,
      alt: "The David Craft Ale homepage in a browser: Hopper, the four beers and the brew picker",
    },
    lead: {
      kind: "video",
      src: "/videos/davidcraft/home.mp4",
      poster: "/videos/davidcraft/home.jpg",
      width: 1920,
      height: 1080,
      alt: "The David Craft Ale homepage in motion: splash loader, Hopper following the cursor, the brew picker and reviews",
      caption: "Homepage — recorded frame by frame from the site, every animation at its real speed.",
    },
    sections: [
      {
        title: "Identity",
        text: [
          "An 8-point star as the logomark, a slab-serif wordmark — DAVID in cocoa over CRAFT ALE in brick red — and Hopper, the winged hop, as the mascot. A rotating seal, a splash mark set in Archivo and a marquee of the brand's own lines complete the kit.",
          "Alfa Slab One for display, Hanken Grotesk for text and interface. Cream, paper, honey, cocoa and ink carry the brand; each beer adds one colour of its own — Blonde, Amber, IPA and Dark.",
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/identity.mp4",
            poster: "/videos/davidcraft/identity.jpg",
            width: 1920,
            height: 1080,
            alt: "David Craft Ale identity film: primary logo, splash mark and rotating seal, the four beers and the marquee",
            caption: "Identity film — logo, splash mark, seal, the four and the marquee, joined by the site's pour transition.",
          },
          img(
            "/work/david-craft-ale/brand-identity.jpg",
            3840,
            3162,
            "David Craft Ale brand identity, Edition 02: primary logo, on-colour versions, seal, logomark, Hopper, palette, typography, graphic elements and the four beers",
            "Brand board, Edition 02.",
          ),
        ],
      },
      {
        title: "Homepage & story",
        text: [
          "The homepage opens with a splash, then lets Hopper chase the cursor around the hero. Picking a beer recolours the shelf and the “Now pouring” panel; pages hand over through “the pour” — four bands in the beer colours rising and unwinding like a glass being filled.",
          "The story page reveals its illustrations through irises and curtains, then walks through the brewery journey in seven steps — milling, mashing, boiling, fermentation, conditioning, bottling and good company — each illustration linked to the next by a line that draws itself as you scroll.",
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/story.mp4",
            poster: "/videos/davidcraft/story.jpg",
            width: 1920,
            height: 1080,
            alt: "The David Craft Ale story page: image reveals, the seven-step brewery journey and the courtyard",
            caption: "Our story — iris and curtain reveals, and the brewery journey drawn by scroll.",
          },
        ],
      },
      {
        title: "Product pages",
        text: [
          "Every beer has its own page: a photo gallery, the essentials (volume, ABV, IBU) and a switch between bottle and can, single and six-pack, with photo and price following the choice.",
          "Hopper gets a page of his own as a limited plush drop, with a gallery and the rest of the merch — beer mats, a bottle opener and a pint glass.",
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/product.mp4",
            poster: "/videos/davidcraft/product.jpg",
            width: 1920,
            height: 1080,
            alt: "The Blonde Ale product page and the Hopper plushie page, joined by the pour transition",
            caption: "Beer page and Hopper plushie — the pour in between is the site's own page transition.",
          },
        ],
      },
      {
        title: "Shop",
        text: [
          "“Pick your pour” lays out the whole lineup — bottles, cans, six-packs and accessories. Hovering a product swaps in a close-up photo, and a quick view opens any product without leaving the page.",
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/shop.mp4",
            poster: "/videos/davidcraft/shop.jpg",
            width: 1920,
            height: 1080,
            alt: "The David Craft Ale shop: product hover, quick view, bottles, cans and accessories",
            caption: "Shop — hover close-ups and the quick view.",
          },
        ],
      },
      {
        title: "Mobile",
        text: [
          "On mobile the beer shelf becomes a carousel you tap or swipe, the brewery journey turns into a vertical trail, and the quick view and distributor map stay one thumb away.",
        ],
        media: [
          {
            kind: "video",
            src: "/videos/davidcraft/mobile.mp4",
            poster: "/videos/davidcraft/mobile.jpg",
            width: 1920,
            height: 1080,
            alt: "The David Craft Ale website on three phones: story, homepage and shop",
            caption: "Story, homepage and shop on mobile.",
          },
        ],
      },
    ],
    details: [
      { label: "Scope", value: "Identity, mascot, labels, website, e-commerce" },
      { label: "Identity", value: "Edition 02 · October 2026" },
      { label: "Platforms", value: "Desktop, tablet & mobile" },
      { label: "Type", value: "Portfolio concept" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
