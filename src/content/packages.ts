// Service packages shown in the "Pricing" section of the homepage.
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
    name: l("Website", "Website"),
    for: l("For a business that needs a fast, modern site.", "Pentru o afacere care are nevoie de un site rapid și modern."),
    price: null,
    services: ["Web Design"],
    includes: [
      l("Custom design for desktop and mobile", "Design personalizat, pentru desktop și mobil"),
      l("Development and launch on your domain", "Dezvoltare și lansare pe domeniul tău"),
      l("Contact form, basic SEO and analytics", "Formular de contact, SEO de bază și statistici"),
      l("A short guide to update your own content", "Un ghid scurt ca să-ți actualizezi singur conținutul"),
    ],
  },
  {
    id: "identity",
    name: l("Brand identity", "Identitate de brand"),
    for: l("For a new brand, or one that has outgrown its logo.", "Pentru un brand nou sau unul care și-a depășit logo-ul."),
    price: null,
    services: ["Brand Identity"],
    includes: [
      l("Logo, logomark and their variations", "Logo, simbol și variantele lor"),
      l("Colour palette and typography", "Paletă de culori și tipografie"),
      l("Brand guidelines", "Ghid de brand"),
      l("Templates for social media and print", "Șabloane pentru social media și print"),
    ],
  },
  {
    id: "brand-website",
    name: l("Brand + Website", "Brand + Website"),
    for: l("For launching a brand properly, all at once.", "Pentru lansarea unui brand cum trebuie, totul deodată."),
    price: null,
    services: ["Brand Identity", "Web Design", "Motion & Content"],
    featured: true,
    includes: [
      l("Everything in Brand identity", "Tot ce include Identitatea de brand"),
      l("Everything in Website", "Tot ce include Website-ul"),
      l("Launch content: a logo animation and social posts", "Conținut de lansare: animație de logo și postări pentru social media"),
    ],
  },
];
