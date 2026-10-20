// Tools and platforms: one registry used by the homepage logo rows and by each case study
// ("Built with" / "Made with", see `stack` in projects.ts).
// Logos: public/logos/*.svg, from gilbarbara/logos via Iconify (CC0). The brands are trademarks
// of their owners and appear only to name the tools used. Tools without a logo show their name only.

import { l } from "./i18n";

export type Tool = {
  name: string;
  /** SVG in public/logos — omitted for tools without an available logo (shown as text). */
  logo?: string;
  /** Intrinsic size of the SVG (its viewBox), for the aspect ratio. */
  width?: number;
  height?: number;
  /** The logo already spells the name (a wordmark), so no text label next to it. */
  wordmark?: boolean;
};

const logo = (name: string, file: string, width: number, height: number, wordmark = false): Tool => ({
  name,
  logo: `/logos/${file}.svg`,
  width,
  height,
  wordmark,
});

export const TOOLS = {
  // Design & motion
  figma: logo("Figma", "figma", 256, 384),
  photoshop: logo("Photoshop", "photoshop", 256, 250),
  illustrator: logo("Illustrator", "illustrator", 256, 250),
  afterEffects: logo("After Effects", "after-effects", 256, 250),
  premierePro: logo("Premiere Pro", "premiere-pro", 256, 250),
  blender: logo("Blender", "blender", 256, 208),
  // Web & code
  html: logo("HTML", "html", 256, 361),
  css: logo("CSS", "css", 256, 361),
  javascript: logo("JavaScript", "javascript", 256, 256),
  typescript: logo("TypeScript", "typescript", 256, 256),
  react: logo("React", "react", 256, 228),
  nextjs: logo("Next.js", "nextjs", 256, 256),
  nodejs: logo("Node.js", "nodejs", 256, 289),
  // The Express wordmark is a hairline grey: as plain text it reads better.
  express: { name: "Express" },
  python: logo("Python", "python", 256, 255),
  gsap: logo("GSAP", "gsap", 512, 190, true),
  threejs: logo("three.js", "threejs", 256, 259),
  lenis: { name: "Lenis" },
  remotion: { name: "Remotion" },
  wordpress: logo("WordPress", "wordpress", 256, 255),
  shopify: logo("Shopify", "shopify", 256, 292),
  // AI & platforms
  claude: logo("Claude", "claude", 256, 257),
  chatgpt: logo("ChatGPT", "chatgpt", 256, 260),
  codex: logo("Codex", "codex", 256, 256),
  github: logo("GitHub", "github", 256, 250),
  vercel: logo("Vercel", "vercel", 256, 222),
  cloudflare: logo("Cloudflare", "cloudflare", 256, 117),
  stripe: logo("Stripe", "stripe", 512, 214, true),
} satisfies Record<string, Tool>;

export type ToolId = keyof typeof TOOLS;

export const tools = {
  label: l("The tools I work with", "Uneltele cu care lucrez"),
  /** Homepage: one moving row each (alternating directions) — design & motion, web & code, AI & platforms. */
  rows: [
    ["figma", "photoshop", "illustrator", "afterEffects", "premierePro"],
    ["wordpress", "shopify", "javascript", "typescript", "react", "nextjs", "nodejs", "python"],
    ["claude", "chatgpt", "github", "vercel", "cloudflare", "stripe"],
  ] satisfies ToolId[][],
};
