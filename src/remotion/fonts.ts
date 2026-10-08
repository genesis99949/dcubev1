// Fonts for compositions. loadFont() blocks rendering until the font is ready,
// so frames never render with a fallback font. Load only the weights you use.
import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

const sans = loadInterTight("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

const mono = loadGeistMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const FONT = {
  sans: sans.fontFamily,
  mono: mono.fontFamily,
} as const;
