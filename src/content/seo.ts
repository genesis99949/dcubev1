// Metadata helpers: titles, descriptions, Open Graph and the links between the two languages.

import type { Metadata } from "next";
import { DEFAULT_LANG, LANGS, OG_LOCALE, l, localePath, tr, type Lang } from "./i18n";
import { site } from "./site";

/** Canonical + hreflang links for a page, given its English path (e.g. "/", "/work/pure-flame"). */
export const alternates = (
  lang: Lang,
  path: string,
): Metadata["alternates"] => ({
  canonical: localePath(lang, path),
  languages: {
    ...Object.fromEntries(LANGS.map((l) => [l, localePath(l, path)])),
    "x-default": localePath(DEFAULT_LANG, path),
  },
});

const homeTitle = l("Website design & online stores", "Creare site-uri și magazine online");

type SocialImage = { url: string; width: number; height: number; alt: string };

/** Define both social previews: nested metadata is replaced, not merged, by Next.js. */
export const pageMetadata = ({
  lang,
  path,
  title,
  description,
  image,
}: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  image?: SocialImage;
}): Metadata => {
  const fullTitle = `${title} | ${site.name}`;
  const socialImage = image ?? { url: "/og.png", width: 1200, height: 630, alt: fullTitle };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: alternates(lang, path),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((other) => other !== lang).map((other) => OG_LOCALE[other]),
      title: fullTitle,
      description,
      url: localePath(lang, path),
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
};

/** Site-wide defaults; individual pages supply their own complete metadata. */
export const rootMetadata = (lang: Lang): Metadata => ({
  ...pageMetadata({ lang, path: "/", title: tr(homeTitle, lang), description: tr(site.tagline, lang) }),
  metadataBase: new URL(site.url),
  title: {
    default: `${tr(homeTitle, lang)} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
});
