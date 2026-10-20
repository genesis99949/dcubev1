// Metadata helpers: titles, descriptions, Open Graph and the links between the two languages.

import type { Metadata } from "next";
import { LANGS, OG_LOCALE, localePath, tr, type Lang } from "./i18n";
import { site } from "./site";

/** Canonical + hreflang links for a page, given its English path (e.g. "/", "/work/pure-flame"). */
export const alternates = (
  lang: Lang,
  path: string,
): Metadata["alternates"] => ({
  canonical: localePath(lang, path),
  languages: {
    ...Object.fromEntries(LANGS.map((l) => [l, localePath(l, path)])),
    "x-default": path,
  },
});

/** Site-wide metadata for one language (used by the root layouts). */
export const rootMetadata = (lang: Lang): Metadata => {
  const title = `${site.name} — ${tr(site.offer, lang)}`;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description: tr(site.tagline, lang),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: OG_LOCALE[lang],
      title,
      description: tr(site.tagline, lang),
      url: localePath(lang, "/"),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tr(site.tagline, lang),
      images: ["/og.png"],
    },
  };
};
