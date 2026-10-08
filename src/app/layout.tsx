import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import type React from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { BRAND } from "@/remotion/brand";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={sans.variable}
      style={brandVariables}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
