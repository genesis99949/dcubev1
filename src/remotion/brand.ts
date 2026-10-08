// Single source of truth for the Dcube visual identity.
// Used by every Remotion composition AND injected as CSS variables into the website
// (see src/app/layout.tsx), so videos and site always match.

export const BRAND = {
  name: "Dcube",
  colors: {
    paper: "#F2F1EC", // background
    ink: "#111110", // primary text / shapes
    muted: "#8C8B85", // secondary text
    line: "#D6D4CC", // hairlines, borders
    accent: "#FF4A1C", // use sparingly: one accent per frame
  },
  fonts: {
    // Loaded in videos by src/remotion/fonts.ts and on the site by next/font in layout.tsx.
    sans: "Inter Tight",
    mono: "Geist Mono",
  },
} as const;

export type BrandColor = keyof typeof BRAND.colors;
