// The two things on offer: presentation websites and online stores.
// `name` is the service's id (projects, packages and the contact form refer to it); `label`, `short`
// and `for` are what visitors read.

import { l, type L } from "./i18n";

export const SERVICES = [
  {
    name: "Website",
    label: l("Presentation website", "Site de prezentare"),
    short: l(
      "A fast, clear site that tells people who you are, what you do and how to reach you — and makes them want to.",
      "Un site rapid și clar, care le spune oamenilor cine ești, ce faci și cum te găsesc — și îi face să vrea asta.",
    ),
    for: l(
      "For businesses, studios, clinics, restaurants and professionals.",
      "Pentru firme, studiouri, clinici, restaurante și profesioniști.",
    ),
  },
  {
    name: "Online store",
    label: l("Online store", "Magazin online"),
    short: l(
      "A shop that sells: product and collection pages people enjoy browsing, a short checkout and payments that just work.",
      "Un magazin care vinde: pagini de produs și de colecție prin care e plăcut să navighezi, un checkout scurt și plăți care merg.",
    ),
    for: l(
      "For brands selling their own products, from a handful to a few hundred.",
      "Pentru branduri care își vând propriile produse, de la câteva la câteva sute.",
    ),
  },
] as const satisfies readonly { name: string; label: L; short: L; for: L }[];

export type Service = (typeof SERVICES)[number]["name"];

/** Visible label of a service, by id. */
export const serviceLabel = (name: Service) => SERVICES.find((s) => s.name === name)!.label;
