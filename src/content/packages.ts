// Pricing: every service comes in two tiers — Start (WordPress, on Ramon's own template, clear limits,
// hosting for the first year and one month of free site management included) and Custom (designed
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
  price: Record<Lang, number> | null;
  includes: L[];
};

/** "1.800 lei" on the Romanian site, "€350" on the English one. */
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
    price: { ro: 1800, en: 350 },
    includes: [
      l("Up to 5 pages, adapted for mobile", "Până la 5 pagini, adaptate pentru mobil"),
      l("My own template, with your colours, fonts and photos", "Șablon propriu, cu culorile, fonturile și pozele tale"),
      l("On WordPress: you change texts and photos yourself", "Pe WordPress: textele și pozele le schimbi singur"),
      l("Contact form, map, basic SEO and analytics", "Formular de contact, hartă, SEO de bază și statistici"),
      l("Hosting for the first year and one month of site management, included", "Găzduire în primul an și o lună de administrare, incluse"),
      l("One round of changes · about 7 days", "O rundă de modificări · aproximativ 7 zile"),
    ],
  },
  {
    id: "website-custom",
    service: "Website",
    tier: "custom",
    name: TIERS.custom,
    for: l(
      "Designed from scratch for your brand, like the work above.",
      "Gândit de la zero pentru brandul tău, ca proiectele de mai sus.",
    ),
    price: { ro: 4500, en: 900 },
    includes: [
      l("Custom design, no templates", "Design de la zero, fără șabloane"),
      l("As many pages as your business needs", "Câte pagini are nevoie afacerea ta"),
      l("Animation that tells your story as people scroll", "Animații care îți spun povestea pe măsură ce derulezi"),
      l("Contact form, SEO and analytics", "Formular de contact, SEO și statistici"),
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
      l("Card payments and one courier set up", "Plăți cu cardul și un curier configurate"),
      l("On WordPress: you manage products and orders yourself", "Pe WordPress: produsele și comenzile le gestionezi singur"),
      l("Hosting for the first year and one month of store management, included", "Găzduire în primul an și o lună de administrare, incluse"),
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
    includes: [
      l("Custom design for every shop page", "Design de la zero pentru fiecare pagină a magazinului"),
      l("Storytelling, animation and your identity built in", "Poveste, animații și identitatea ta, integrate"),
      l("Card payments, shipping and order emails", "Plăți cu cardul, livrare și emailuri de comandă"),
      l("SEO for every product, analytics", "SEO pentru fiecare produs, statistici"),
      l("Three months of store management: I add products and make changes", "Trei luni de administrare: adaug eu produsele și fac modificările"),
    ],
  },
];

/** Optional extras, added to any package. */
export const extras: L[] = [
  l("Admin panel (CMS) for Custom sites", "Panou de administrare (CMS) la Personalizat"),
  l("Extra pages and languages", "Pagini și limbi în plus"),
  l("Logo & visual identity", "Logo și identitate vizuală"),
  l("Launch content: animations, social posts", "Conținut de lansare: animații, postări"),
  l("Monthly management after the free months", "Administrare lunară, după lunile gratuite"),
  l("SEO & copywriting", "SEO și texte"),
];
