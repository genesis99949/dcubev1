import { Inter_Tight } from "next/font/google";
import type React from "react";
import "@/app/globals.css";
import type { Lang } from "@/content/i18n";
import { BRAND } from "@/remotion/brand";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

// One family for the whole site, as in the videos (src/remotion/fonts.ts).
const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

// One palette for site + videos.
const brandVariables = {
  "--paper": BRAND.colors.paper,
  "--ink": BRAND.colors.ink,
  "--muted": BRAND.colors.muted,
  "--line": BRAND.colors.line,
  "--accent": BRAND.colors.accent,
} as React.CSSProperties;

/**
 * The <html> document shared by both root layouts — app/(en)/layout.tsx and app/(ro)/layout.tsx —
 * so every page carries the right `lang` attribute.
 */
export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={sans.variable} style={brandVariables}>
      <body>
        <SiteHeader lang={lang} />
        {children}
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
