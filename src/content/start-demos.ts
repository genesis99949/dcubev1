// Examples for the Start package, shown on the presentation-website service page.
// Static demos in public/demo/<slug>/: three fictional businesses built on Ramon's WordPress templates
// (exported from F:\Projects\Teme Wordpress with tools/build/publish-demos.mjs). Each demo says on the page
// itself that it is a demo, and its pages are noindex.

import { l, type L } from "./i18n";

export type StartDemo = { slug: string; name: string; sector: L; href: string; image: string; alt: L };

export const startDemos = {
  title: l("Start templates, ready to explore.", "Șabloane Start, gata de explorat."),
  text: l(
    "Three demo sites built on my WordPress templates. The businesses are fictional. Each demo shows every page its template offers; with Start you choose up to five.",
    "Trei site-uri demonstrative, construite pe șabloanele mele WordPress. Firmele sunt fictive. Fiecare demo arată toate paginile pe care le are șablonul; la Start alegi până la cinci.",
  ),
  open: l("Explore the demo", "Explorează demo-ul"),
  items: [
    {
      slug: "luma-vet",
      name: "Luma Vet",
      sector: l("Veterinary clinic", "Cabinet veterinar"),
      href: "/demo/luma-vet/",
      image: "/demo/luma-vet/preview.jpg",
      alt: l(
        "Demo of the Luma Vet template: a green header with the cat logo, the headline “Lăbuțe fericite, inimi liniștite” and a photo of a dog.",
        "Demo pentru șablonul Luma Vet: antet verde cu logo-ul pisică, titlul „Lăbuțe fericite, inimi liniștite” și fotografia unui câine.",
      ),
    },
    {
      slug: "strat",
      name: "STRAT",
      sector: l("Construction company", "Firmă de construcții"),
      href: "/demo/strat/",
      image: "/demo/strat/preview.jpg",
      alt: l(
        "Demo of the STRAT template: the headline “Facem planul. Ridicăm viitorul.” in large black type on white, with a lime button.",
        "Demo pentru șablonul STRAT: titlul „Facem planul. Ridicăm viitorul.” scris mare, negru pe alb, cu un buton verde-lime.",
      ),
    },
    {
      slug: "velora",
      name: "VELORA",
      sector: l("Real estate agency", "Agenție imobiliară"),
      href: "/demo/velora/",
      image: "/demo/velora/preview.jpg",
      alt: l(
        "Demo of the VELORA template: the headline “Case care au ceva de spus.” in burgundy and a photo of an interwar house with a balcony.",
        "Demo pentru șablonul VELORA: titlul „Case care au ceva de spus.” în burgundy și fotografia unei case interbelice cu balcon.",
      ),
    },
  ] satisfies StartDemo[],
};
