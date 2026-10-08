// PureFlame identity tokens — taken from the PureFlame website (assets/css/site.css)
// and the logo source (Logo PF/New Logo.ai, flame colour #ED7424).
import { loadFont as loadGelasio } from "@remotion/google-fonts/Gelasio";
import { loadFont as loadWorkSans } from "@remotion/google-fonts/WorkSans";

export const PF = {
  name: "PureFlame",
  domain: "pureflame.ro",
  tagline: "The art of gathering",
  colors: {
    charcoal: "#110F0A",
    charcoalSoft: "#1A1811",
    olive: "#5A5627",
    oliveDeep: "#3F3C1B",
    ember: "#D9772E",
    emberBright: "#F0913F",
    emberDeep: "#A8541E",
    flame: "#ED7424",
    brass: "#CCC575",
    cream: "#FEFFFD",
    creamSoft: "#E1E2DB",
  },
  /** The 2026 collection, in site order. Cut-outs live in public/remotion/pureflame/products. */
  products: ["Embera", "Aether", "Flavo", "Fera", "Ignite"] as const,
} as const;

// The site uses Georgia (editorial) + Work Sans (utility). Gelasio is Georgia's
// metric-compatible open-source twin, so renders look the same on any machine.
const serif = loadGelasio("normal", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] });
loadGelasio("italic", { weights: ["400"], subsets: ["latin", "latin-ext"] });
const sans = loadWorkSans("normal", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] });

export const PF_FONT = {
  serif: serif.fontFamily,
  sans: sans.fontFamily,
} as const;
