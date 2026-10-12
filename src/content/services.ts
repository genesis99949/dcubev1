// The six faces of the Dcube — one service per face of the cube.
// The cube's three axes are the three disciplines; each axis has two opposite faces.
// `name` is the service's id (projects refer to it); `label` and `short` are what visitors read.
// Order = face number (01–06).

import { l, type L } from "./i18n";

export const AXES = ["Web", "Branding", "Marketing"] as const;
export type Axis = (typeof AXES)[number];

export const SERVICES = [
  {
    name: "Web Design",
    axis: "Web",
    label: l("Web Design", "Web design"),
    short: l(
      "Websites and interfaces designed around one clear idea — and built to load fast.",
      "Site-uri și interfețe construite în jurul unei idei clare — și făcute să se încarce rapid.",
    ),
  },
  {
    name: "E-commerce",
    axis: "Web",
    label: l("E-commerce", "E-commerce"),
    short: l(
      "Online shops that sell: collection and product pages, cart and checkout.",
      "Magazine online care vând: pagini de colecție și de produs, coș și checkout.",
    ),
  },
  {
    name: "Brand Identity",
    axis: "Branding",
    label: l("Brand Identity", "Identitate de brand"),
    short: l(
      "Logos, type and colour systems that hold together everywhere.",
      "Logo, tipografie și sisteme de culoare care rămân coerente peste tot.",
    ),
  },
  {
    name: "Packaging & Print",
    axis: "Branding",
    label: l("Packaging & Print", "Ambalaje & print"),
    short: l(
      "Labels, packaging and printed matter that carry the brand off-screen.",
      "Etichete, ambalaje și materiale tipărite care duc brandul dincolo de ecran.",
    ),
  },
  {
    name: "Social Media & Ads",
    axis: "Marketing",
    label: l("Social Media & Ads", "Social media & reclame"),
    short: l(
      "Campaign visuals and ad creative built to stop the scroll.",
      "Vizualuri de campanie și reclame făcute să oprească scroll-ul.",
    ),
  },
  {
    name: "Motion & Content",
    axis: "Marketing",
    label: l("Motion & Content", "Motion & conținut"),
    short: l(
      "Logo animations, brand films and content for every channel.",
      "Animații de logo, filme de brand și conținut pentru fiecare canal.",
    ),
  },
] as const satisfies readonly { name: string; axis: Axis; label: L; short: L }[];

export type Service = (typeof SERVICES)[number]["name"];
export const SERVICE_NAMES = SERVICES.map((s) => s.name) as Service[];

/** Visible label of a service, by id. */
export const serviceLabel = (name: Service) => SERVICES.find((s) => s.name === name)!.label;
