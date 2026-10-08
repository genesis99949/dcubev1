// The six faces of the Dcube — one service per face of the cube.
// The cube's three axes are the three disciplines; each axis has two opposite faces.
// Edit names/descriptions freely; order = face number (01–06).

export const AXES = ["Web", "Branding", "Marketing"] as const;
export type Axis = (typeof AXES)[number];

export const SERVICES = [
  {
    name: "Web Design",
    axis: "Web",
    short: "Websites and interfaces designed around one clear idea — and built to load fast.",
  },
  {
    name: "E-commerce",
    axis: "Web",
    short: "Online shops that sell: collection and product pages, cart and checkout.",
  },
  {
    name: "Brand Identity",
    axis: "Branding",
    short: "Logos, type and colour systems that hold together everywhere.",
  },
  {
    name: "Packaging & Print",
    axis: "Branding",
    short: "Labels, packaging and printed matter that carry the brand off-screen.",
  },
  {
    name: "Social Media & Ads",
    axis: "Marketing",
    short: "Campaign visuals and ad creative built to stop the scroll.",
  },
  {
    name: "Motion & Content",
    axis: "Marketing",
    short: "Logo animations, brand films and content for every channel.",
  },
] as const satisfies readonly { name: string; axis: Axis; short: string }[];

export type Service = (typeof SERVICES)[number]["name"];
export const SERVICE_NAMES = SERVICES.map((s) => s.name) as Service[];
