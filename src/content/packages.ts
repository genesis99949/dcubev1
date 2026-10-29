// Pricing: every service comes in two tiers — Start (WordPress, on Ramon's own template, clear limits,
// one month of free site management; the client pays hosting in their own name, Ramon sets it up) and Custom (designed
// from scratch, like the portfolio work; three months of free management; an admin panel/CMS is an extra). Shown in the "Pricing" section of the homepage.
// `price` is the starting price per language: lei on the Romanian site, euro on the English one. They are
// round amounts set by Ramon (about 5 lei to the euro), not live conversions. null = "Price on request".

import { l, type L, type Lang } from "./i18n";
import type { Service } from "./services";

export type Tier = "start" | "custom";

export type Package = {
  id: string;
  service: Service;
  tier: Tier;
  /** Tier name on the card ("Start", "Custom"); the contact form shows "<service> · <name>". */
  name: L;
  /** Who it's for, in one line. */
  for: L;
  /** Optional clarification below the included features. */
  editing?: L;
  price: Record<Lang, number> | null;
  includes: L[];
};

/** "1.500 lei" on the Romanian site, "€300" on the English one. */
export const formatPrice = (value: number, lang: Lang) =>
  lang === "ro" ? `${value.toLocaleString("ro-RO")} lei` : `€${value.toLocaleString("en-GB")}`;

export const TIERS: Record<Tier, L> = {
  start: l("Start", "Start"),
  custom: l("Custom", "Personalizat"),
};

export const packages: Package[] = [
  {
    id: "website-start",
    service: "Website",
    tier: "start",
    name: TIERS.start,
    for: l(
      "A website tailored to your business, ready for mobile and launched on your domain.",
      "Un site adaptat afacerii tale, pregătit pentru mobil și lansat pe domeniul tău.",
    ),
    price: { ro: 1500, en: 300 },
    includes: [
      l("Up to 5 pages, adapted for mobile", "Până la 5 pagini, adaptate pentru mobil"),
      l("My own template, with your colours, fonts and photos", "Șablon propriu, cu culorile, fonturile și pozele tale"),
      l("On WordPress: you change texts and photos yourself", "Pe WordPress: textele și pozele le schimbi singur"),
      l("Contact form, map, basic SEO and analytics", "Formular de contact, hartă, SEO de bază și statistici"),
      l("Hosting set up by me in your company's account, plus one month of site management", "Găzduire configurată de mine, în contul firmei tale, plus o lună de administrare"),
      l("One round of changes · about 7 days", "O rundă de modificări · aproximativ 7 zile"),
    ],
  },
  {
    id: "website-custom",
    service: "Website",
    tier: "custom",
    name: TIERS.custom,
    for: l(
      "Designed from scratch for your brand.",
      "Gândit de la zero pentru brandul tău.",
    ),
    price: { ro: 4500, en: 900 },
    editing: l("Want to edit texts and images yourself? An admin panel is an optional extra.", "Vrei să schimbi singur textele și imaginile? Panoul de administrare se adaugă separat."),
    includes: [
      l("Custom design, no templates", "Design de la zero, fără șabloane"),
      l("Pages and features agreed in the written quote", "Pagini și funcții stabilite în oferta scrisă"),
      l("Animation that tells your story as people scroll", "Animații care îți spun povestea pe măsură ce derulezi"),
      l("Contact form, basic SEO and analytics", "Formular de contact, SEO de bază și statistici"),
      l("Three months of site management, included", "Trei luni de administrare, incluse"),
    ],
  },
  {
    id: "store-start",
    service: "Online store",
    tier: "start",
    name: TIERS.start,
    for: l(
      "Your products and payments set up, ready to take your first orders.",
      "Un magazin cu produsele și plățile configurate, gata să primească primele comenzi.",
    ),
    price: { ro: 3000, en: 600 },
    includes: [
      l("Shop, product, cart and checkout pages, adapted for mobile", "Pagini de magazin, produs, coș și checkout, adaptate pentru mobil"),
      l("My own template, adapted to your brand", "Șablon propriu, adaptat brandului tău"),
      l("Up to 30 products uploaded by me", "Până la 30 de produse urcate de mine"),
      l("Card payments and shipping rates set up", "Plăți cu cardul și tarife de livrare configurate"),
      l("On WordPress: you manage products and orders yourself", "Pe WordPress: produsele și comenzile le gestionezi singur"),
      l("Hosting set up by me in your company's account, plus one month of store management", "Găzduire configurată de mine, în contul firmei tale, plus o lună de administrare"),
      l("One round of changes · about 14 days", "O rundă de modificări · aproximativ 14 zile"),
    ],
  },
  {
    id: "store-custom",
    service: "Online store",
    tier: "custom",
    name: TIERS.custom,
    for: l(
      "A store designed around your products, like Pure Flame and David Craft Ale.",
      "Un magazin gândit în jurul produselor tale, ca Pure Flame și David Craft Ale.",
    ),
    price: { ro: 10000, en: 2000 },
    editing: l("Want to manage products and orders yourself? An admin panel is an optional extra.", "Vrei să gestionezi singur produsele și comenzile? Panoul de administrare se adaugă separat."),
    includes: [
      l("Custom design for every shop page", "Design de la zero pentru fiecare pagină a magazinului"),
      l("Storytelling, animation and your brand built in", "Poveste, animații și brandul tău, integrate"),
      l("Card payments, shipping rules and order emails", "Plăți cu cardul, reguli de livrare și emailuri de comandă"),
      l("Basic SEO for every product, analytics", "SEO de bază pentru fiecare produs, statistici"),
      l("Three months of store management: I add products and make changes", "Trei luni de administrare: adaug eu produsele și fac modificările"),
    ],
  },
];

/** Optional extras, added to any package. */
export const extras: L[] = [
  l("Admin panel (CMS) for Custom sites", "Panou de administrare (CMS) la Personalizat"),
  l("Extra pages and languages", "Pagini și limbi în plus"),
  l("Launch content: animations, social posts", "Conținut de lansare: animații, postări"),
  l("Monthly management after the free months", "Administrare lunară, după lunile gratuite"),
  l("Additional SEO work & copywriting", "Optimizare SEO suplimentară și redactare texte"),
];
