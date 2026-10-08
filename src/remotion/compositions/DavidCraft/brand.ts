// David Craft Ale — identity tokens, Edition 02 (brand/brand-identity.html, css/index.css,
// css/pour.css of the client's site). Nothing here is invented.
import { loadFont as loadAlfa } from "@remotion/google-fonts/AlfaSlabOne";
import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadHanken } from "@remotion/google-fonts/HankenGrotesk";

export const DCA = {
  name: "David Craft Ale",
  tagline: "Small batch. Big personality.",
  colors: {
    cream: "#FCE4CD", // canvas
    creamSoft: "#FDEEDF",
    paper: "#FFF6EA", // cards
    peach: "#F6D4B4",
    honey: "#FFC24B", // hero band
    honeyDeep: "#E8A81E",
    cocoa: "#572010", // wordmark, CTA
    ink: "#2E1A0E", // body text
    brick: "#B23A27",
    teal: "#2F8577",
  },
  /** The four, in order. */
  beers: [
    { key: "blonde", name: "Blonde", style: "Ale", n: "01", abv: "4.8%", ibu: "18", color: "#D9A126", ink: "#A87409" },
    { key: "amber", name: "Amber", style: "Pale Ale", n: "02", abv: "5.4%", ibu: "28", color: "#B23A27", ink: "#A33322" },
    { key: "ipa", name: "IPA", style: "India Pale Ale", n: "03", abv: "6.5%", ibu: "55", color: "#2F8577", ink: "#25655A" },
    { key: "dark", name: "Dark", style: "Lager", n: "04", abv: "5.0%", ibu: "22", color: "#2C2925", ink: "#2C2925" },
  ],
  /** The site's marquee, word for word. */
  marquee: ["Brewed in small batches", "Drink David Craft Ale", "Est. 2023", "One for everyone", "Chill for best results"],
  /** The pour transition bands (css/pour.css), bottom to top. */
  pour: ["#FFC24B", "#B23A27", "#2F8577", "#572010"],
} as const;

const alfa = loadAlfa("normal", { weights: ["400"], subsets: ["latin"] });
const hanken = loadHanken("normal", { weights: ["400", "600", "800"], subsets: ["latin", "latin-ext"] });
const archivo = loadArchivo("normal", { weights: ["600", "900"], subsets: ["latin"] });

export const DCA_FONT = {
  display: alfa.fontFamily,
  body: hanken.fontFamily,
  mark: archivo.fontFamily,
} as const;

/** The site's star generator (js/index.js starPath): 8-point logomark by default. */
export const starPath = (cx: number, cy: number, R: number, points = 8, innerRatio = 0.42) => {
  const r = R * innerRatio;
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }
  return `${d}Z`;
};

/** Thin 4-point sparkle (decoration only — one per band). */
export const sparklePath = (cx: number, cy: number, R: number) => starPath(cx, cy, R, 4, 0.2);

/** The pour overlay's logomark (js/pour.js STAR, viewBox 0 0 24 24). */
export const POUR_STAR =
  "M12 0l2.3 7.2L21 4.6l-4.4 6 7.4 1.4-7.4 1.4 4.4 6-6.7-2.6L12 24l-2.3-7.2L3 19.4l4.4-6L0 12l7.4-1.4-4.4-6 6.7 2.6z";

/** Pour bubbles (js/pour.js): [left %, diameter px, speed, delay]. */
export const POUR_BUBBLES = [
  [14, 17, 1.05, 0], [31, 25, 0.78, 0.18], [47, 12, 1.25, 0.07],
  [59, 29, 0.7, 0.3], [71, 19, 0.95, 0.12], [83, 21, 0.6, 0.4], [26, 10, 1.35, 0.24],
] as const;

/** Mix a colour toward another (0 = a, 1 = b). Used for the soft card tones of the brand board. */
export const tint = (a: string, b: string, t: number) => {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift: number) => Math.round(((pa >> shift) & 255) * (1 - t) + ((pb >> shift) & 255) * t);
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
};

/** Client artwork, copied from the site's /assets into public/remotion/dca/art. */
export const DCA_ART = "remotion/dca/art";
/** Site recordings (scripts/site-capture/vt-record.mjs) in public/remotion/dca. */
export const DCA_MEDIA = "remotion/dca";
