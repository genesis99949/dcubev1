// Pricing: every service comes in two tiers — Start (fast, on my own template, clear limits) and
// Custom (designed from scratch, like the portfolio work). Shown in the "Pricing" section of the homepage.
// `price` is the starting price in euro ("from €…"); leave it null to show "Price on request".

import { l, type L } from "./i18n";
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
  price: number | null;
  includes: L[];
};

export const CURRENCY = "€";

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
      "A clean site on my own template. Live in about a week.",
      "Un site curat, pe șablonul meu. Gata în aproximativ o săptămână.",
    ),
    price: 350,
    includes: [
      l("Up to 5 pages", "Până la 5 pagini"),
      l("Your colours, fonts, texts and photos", "Culorile, fonturile, textele și pozele tale"),
      l("Contact form, map, basic SEO and analytics", "Formular de contact, hartă, SEO de bază și statistici"),
      l("Mobile-first, launched on your domain", "Gândit pentru mobil, lansat pe domeniul tău"),
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
    price: 900,
    includes: [
      l("Custom design, no templates", "Design de la zero, fără șabloane"),
      l("As many pages as your business needs", "Câte pagini are nevoie afacerea ta"),
      l("Animation that tells your story as people scroll", "Animații care îți spun povestea pe măsură ce derulezi"),
      l("Contact form, SEO and analytics", "Formular de contact, SEO și statistici"),
      l("Regular check-ins while it takes shape", "Verificări regulate pe măsură ce prinde formă"),
    ],
  },
  {
    id: "store-start",
    service: "Online store",
    tier: "start",
    name: TIERS.start,
    for: l(
      "A complete store on my own template, ready to take orders.",
      "Un magazin complet, pe șablonul meu, gata să primească comenzi.",
    ),
    price: 600,
    includes: [
      l("Shop, product, cart and checkout pages", "Pagini de magazin, produs, coș și checkout"),
      l("Up to 30 products uploaded by me", "Până la 30 de produse urcate de mine"),
      l("Card payments and one courier set up", "Plăți cu cardul și un curier configurate"),
      l("Products and orders you manage yourself", "Produse și comenzi pe care le gestionezi singur"),
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
    price: 2000,
    includes: [
      l("Custom design for every shop page", "Design de la zero pentru fiecare pagină a magazinului"),
      l("Storytelling, animation and your identity built in", "Poveste, animații și identitatea ta, integrate"),
      l("Card payments, shipping and order emails", "Plăți cu cardul, livrare și emailuri de comandă"),
      l("Products and orders you manage yourself", "Produse și comenzi pe care le gestionezi singur"),
      l("SEO for every product, analytics", "SEO pentru fiecare produs, statistici"),
    ],
  },
];

/** Optional extras, added to any package. */
export const extras: L[] = [
  l("Extra pages and languages", "Pagini și limbi în plus"),
  l("Logo & visual identity", "Logo și identitate vizuală"),
  l("Launch content: animations, social posts", "Conținut de lansare: animații, postări"),
  l("Monthly maintenance", "Mentenanță lunară"),
  l("SEO & copywriting", "SEO și texte"),
];
