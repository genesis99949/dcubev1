// Languages. English lives at the root (/, /work/…), Romanian under /ro (/ro, /ro/work/…).
// Every visible text in src/content is written as l("English", "Română").

export const LANGS = ["en", "ro"] as const;
export type Lang = (typeof LANGS)[number];

/** A text in both languages. */
export type L = { readonly en: string; readonly ro: string };

/** Shorthand for writing a bilingual text: l("English", "Română"). */
export const l = (en: string, ro: string): L => ({ en, ro });

/** The text for one language. */
export const tr = (text: L, lang: Lang) => text[lang];

/** Open Graph locale per language. */
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", ro: "ro_RO" };

/**
 * A site path in a language: "/" → "/ro", "/work/x" → "/ro/work/x", "/#work" → "/ro#work".
 * English paths are returned unchanged.
 */
export const localePath = (lang: Lang, path = "/") => {
  if (lang === "en") return path;
  if (path === "/") return "/ro";
  if (path.startsWith("/#")) return `/ro${path.slice(1)}`;
  return `/ro${path}`;
};

/** The same page in the other language, from a pathname (used by the language switch). */
export const switchPath = (pathname: string, to: Lang) => {
  const bare = pathname === "/ro" ? "/" : pathname.startsWith("/ro/") ? pathname.slice(3) : pathname;
  return localePath(to, bare);
};
