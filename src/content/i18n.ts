// Languages. Romanian is the main language and lives at the root (/, /work/…); English is under /en
// (/en, /en/work/…). Every visible text in src/content is written as l("English", "Română").

export const LANGS = ["ro", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** The site's main language: unprefixed URLs, x-default. */
export const DEFAULT_LANG: Lang = "ro";
/** A text in both languages. */
export type L = { readonly en: string; readonly ro: string };

/** Shorthand for writing a bilingual text: l("English", "Română"). */
export const l = (en: string, ro: string): L => ({ en, ro });

/** The text for one language. */
export const tr = (text: L, lang: Lang) => text[lang];

/** Open Graph locale per language. */
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", ro: "ro_RO" };

/**
 * A site path in a language: "/" → "/en", "/work/x" → "/en/work/x", "/#work" → "/en#work".
 * Romanian (the default language) paths are returned unchanged.
 */
export const localePath = (lang: Lang, path = "/") => {
  if (lang === DEFAULT_LANG) return path;
  if (path === "/") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
};

/** The same page in the other language, from a pathname (used by the language switch). */
export const switchPath = (pathname: string, to: Lang) => {
  const bare = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  return localePath(to, bare);
};
