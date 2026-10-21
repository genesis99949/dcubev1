// The two things on offer: presentation websites and online stores.
// `name` is the service's id (projects, packages and the contact form refer to it); `label`, `short`
// and `for` are what visitors read.

import { l, type L } from "./i18n";

export const SERVICES = [
  {
    name: "Website",
    label: l("Presentation website", "Site de prezentare"),
    short: l(
      "A few clear pages that say who you are, what you do and how to reach you, with a contact form that lands straight in your inbox.",
      "Câteva pagini clare care spun cine ești, ce faci și cum te găsește clientul, cu un formular care ajunge direct în emailul tău.",
    ),
    for: l(
      "For businesses, studios, clinics, restaurants and professionals.",
      "Pentru firme, studiouri, clinici, restaurante și profesioniști.",
    ),
    // No client presentation site in the portfolio yet: this site is one (no cart, services + contact form).
    // Replace it with a Start demo project once there is one.
    ownSite: l("This very site", "Chiar site-ul ăsta"),
  },
  {
    name: "Online store",
    label: l("Online store", "Magazin online"),
    short: l(
      "Product pages people enjoy browsing, a short checkout and card payments that work from the first order.",
      "Pagini de produs pe care oamenii le răsfoiesc cu plăcere, un checkout scurt și plăți cu cardul care merg de la prima comandă.",
    ),
    for: l(
      "For brands selling their own products, from a handful to a few hundred.",
      "Pentru branduri care își vând propriile produse, de la câteva la câteva sute.",
    ),
  },
] as const satisfies readonly { name: string; label: L; short: L; for: L; ownSite?: L }[];

export type Service = (typeof SERVICES)[number]["name"];

/** Visible label of a service, by id. */
export const serviceLabel = (name: Service) => SERVICES.find((s) => s.name === name)!.label;
