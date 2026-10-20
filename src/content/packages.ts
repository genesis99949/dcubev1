// Service packages shown in the "Pricing" section of the homepage — one per service, plus extras.
// `price` is the starting price in euro ("from €…"); leave it null to show "Price on request".

import { l, type L } from "./i18n";
import type { Service } from "./services";

export type Package = {
  id: string;
  name: L;
  /** Who it's for, in one line. */
  for: L;
  price: number | null;
  includes: L[];
  /** Services ticked in the contact form when a visitor picks this package. */
  services: Service[];
  /** Visually emphasised (the most complete option). */
  featured?: boolean;
};

export const CURRENCY = "€";

export const packages: Package[] = [
  {
    id: "website",
    name: l("Presentation website", "Site de prezentare"),
    for: l("For a business that needs to be found — and trusted — online.", "Pentru o afacere care vrea să fie găsită online și să inspire încredere."),
    price: null,
    services: ["Website"],
    includes: [
      l("Custom design for desktop and mobile", "Design personalizat, pentru desktop și mobil"),
      l("Pages for your services, about and contact", "Pagini pentru servicii, despre și contact"),
      l("Contact form, basic SEO and analytics", "Formular de contact, SEO de bază și statistici"),
      l("Fast loading, launched on your domain", "Încărcare rapidă, lansare pe domeniul tău"),
      l("A short guide to update your own content", "Un ghid scurt ca să-ți actualizezi singur conținutul"),
    ],
  },
  {
    id: "online-store",
    name: l("Online store", "Magazin online"),
    for: l("For selling your products online, from the first order on.", "Pentru a-ți vinde produsele online, de la prima comandă."),
    price: null,
    services: ["Online store"],
    featured: true,
    includes: [
      l("Custom design for product, collection and cart pages", "Design personalizat pentru paginile de produs, colecție și coș"),
      l("Card payments, shipping and order emails set up", "Plăți cu cardul, livrare și emailuri de comandă configurate"),
      l("Products and orders you can manage yourself", "Produse și comenzi pe care le gestionezi singur"),
      l("SEO for every product, analytics", "SEO pentru fiecare produs, statistici"),
      l("Fast loading, launched on your domain", "Încărcare rapidă, lansare pe domeniul tău"),
    ],
  },
];

/** Optional extras, added to either package. */
export const extras: L[] = [
  l("Logo & visual identity", "Logo și identitate vizuală"),
  l("Launch content: animations, social posts", "Conținut de lansare: animații, postări"),
  l("Monthly maintenance", "Mentenanță lunară"),
  l("SEO & copywriting", "SEO și texte"),
];
