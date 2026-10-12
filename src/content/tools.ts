// The platforms and tools shown in the moving logo strip on the homepage.
// Logos: public/logos/*.svg, from gilbarbara/logos via Iconify (CC0). The brands are trademarks
// of their owners and appear only to name the tools used. Add/remove entries freely.

import { l } from "./i18n";

export type Tool = {
  name: string;
  logo: string;
  /** Intrinsic size of the SVG (its viewBox), for the aspect ratio. */
  width: number;
  height: number;
  /** The logo already spells the name (a wordmark), so no text label next to it. */
  wordmark?: boolean;
};

const tool = (name: string, file: string, width: number, height: number, wordmark = false): Tool => ({
  name,
  logo: `/logos/${file}.svg`,
  width,
  height,
  wordmark,
});

export const tools = {
  label: l("The tools I work with", "Uneltele cu care lucrez"),
  /** One moving row each (alternating directions): design & motion, web & code, AI & platforms. */
  rows: [
    [
      tool("Figma", "figma", 256, 384),
      tool("Photoshop", "photoshop", 256, 250),
      tool("Illustrator", "illustrator", 256, 250),
      tool("After Effects", "after-effects", 256, 250),
      tool("Premiere Pro", "premiere-pro", 256, 250),
    ],
    [
      tool("WordPress", "wordpress", 256, 255),
      tool("Shopify", "shopify", 256, 292),
      tool("JavaScript", "javascript", 256, 256),
      tool("TypeScript", "typescript", 256, 256),
      tool("React", "react", 256, 228),
      tool("Next.js", "nextjs", 256, 256),
      tool("Node.js", "nodejs", 256, 289),
      tool("Python", "python", 256, 255),
    ],
    [
      tool("Claude", "claude", 256, 257),
      tool("ChatGPT", "chatgpt", 256, 260),
      tool("GitHub", "github", 256, 250),
      tool("Vercel", "vercel", 256, 222),
      tool("Cloudflare", "cloudflare", 256, 117),
      tool("Stripe", "stripe", 512, 214, true),
    ],
  ] satisfies Tool[][],
};
