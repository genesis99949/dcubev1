// Site-wide copy, in English and Romanian: l("English", "Română"). Every page reads from here.
// The two services live in ./services.ts, the packages in ./packages.ts, projects in ./projects.ts.

import { l } from "./i18n";

export const site = {
  /** The brand is Ramon's own name. */
  name: "Ramon Bugariu",
  /** The person behind the site. */
  owner: {
    name: "Ramon Bugariu",
    role: l("Web Designer & Web Developer", "Web designer & web developer"),
  },
  /** Public URL (social previews, canonical links, sitemap). NEXT_PUBLIC_SITE_URL overrides it, e.g. for a custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dcubev1.ramonbugariu.workers.dev",
  /** Default meta description. */
  tagline: l(
    "Ramon Bugariu designs and builds presentation websites and online stores — fast, clear and easy to run.",
    "Ramon Bugariu face site-uri de prezentare și magazine online — rapide, clare și ușor de administrat.",
  ),
  /** What the site offers, in a few words — after the name in titles ("Ramon Bugariu — …"). */
  offer: l("Websites and online stores", "Site-uri de prezentare și magazine online"),
  year: 2026,

  hero: {
    text: l(
      "Designed and built by one person, from the first sketch to launch day — fast, clear and easy to run.",
      "Gândite și construite de un singur om, de la prima schiță până în ziua lansării — rapide, clare și ușor de administrat.",
    ),
    primary: l("Get in touch", "Hai să vorbim"),
    secondary: l("See the work", "Vezi proiectele"),
  },
  work: {
    headline: l("Selected work.", "Proiecte alese."),
    text: l(
      "Online stores, from the first sketch to the last pixel — the identity included.",
      "Magazine online, de la prima schiță la ultimul pixel — inclusiv identitatea.",
    ),
  },
  services: {
    headline: l("Two things, done well.", "Două lucruri, făcute bine."),
    text: l(
      "A site that presents your business, or a store that sells your products. Designed for your brand, built to load fast, and yours to run.",
      "Un site care îți prezintă afacerea sau un magazin care îți vinde produsele. Gândite pentru brandul tău, făcute să se încarce rapid și ușor de administrat de tine.",
    ),
    /** Label before the projects listed under a service. */
    seeWork: l("See it in", "Vezi în"),
    /** Opens the contact form with the service's package picked. */
    action: l("Ask for a quote", "Cere o ofertă"),
  },
  pricing: {
    headline: l("Pick your starting point.", "Alege de unde pornești."),
    text: l(
      "Every project gets its own quote after a short call. These are the usual starting points.",
      "Fiecare proiect primește o ofertă proprie, după o discuție scurtă. Acestea sunt punctele de pornire obișnuite.",
    ),
    /** Shown before a package price, e.g. "from €1,200". */
    from: l("from", "de la"),
    onRequest: l("Price on request", "Preț la cerere"),
    action: l("Start with this", "Pornesc cu acesta"),
    /** Heading of the optional extras under the packages. */
    extras: l("Add to either one", "Se pot adăuga la oricare"),
  },
  process: {
    headline: l("How I work.", "Cum lucrez."),
    steps: [
      {
        title: l("Talk", "Discutăm"),
        text: l(
          "A short call about your goals, your audience and the deadline.",
          "O discuție scurtă despre obiective, public și termen.",
        ),
      },
      {
        title: l("Proposal", "Propunere"),
        text: l(
          "Scope, timeline and price in writing, before any work starts.",
          "Ce facem, în cât timp și la ce preț — în scris, înainte să începem.",
        ),
      },
      {
        title: l("Design & build", "Design & dezvoltare"),
        text: l(
          "Regular check-ins: you see the work as it takes shape, not just at the end.",
          "Verificări regulate: vezi lucrul pe măsură ce prinde formă, nu doar la final.",
        ),
      },
      {
        title: l("Launch", "Lansare"),
        text: l(
          "Live on your domain, with a handover so you can update the content yourself.",
          "Publicare pe domeniul tău, cu predare, ca să poți actualiza singur conținutul.",
        ),
      },
    ],
  },
  /** Eyebrow + statement of the About section, in Ramon's own voice. */
  aboutLabel: l("About me", "Despre mine"),
  about: l(
    "I'm Ramon, a web designer and developer. I make presentation websites and online stores — I design them, build them and launch them myself. You talk to the person doing the work, from the first sketch to launch day.",
    "Sunt Ramon, web designer și developer. Fac site-uri de prezentare și magazine online — le gândesc, le construiesc și le lansez eu. Vorbești direct cu omul care face treaba, de la prima schiță până în ziua lansării.",
  ),
  contact: {
    headline: l("Have a project in mind?", "Ai un proiect în minte?"),
    text: l(
      "Tell me what you're building. I'll get back to you with questions, ideas and a clear next step.",
      "Spune-mi ce construiești. Revin cu întrebări, idei și un pas următor clar.",
    ),
    action: l("Get in touch", "Hai să vorbim"),
    // Public email, once the domain exists. While empty, no address is shown anywhere.
    email: "" as string,
    /**
     * Web3Forms access key (https://web3forms.com — free). Messages from the contact form are emailed
     * to the address the key was created for; that address never appears on the site.
     * Set NEXT_PUBLIC_WEB3FORMS_KEY, or paste the key here.
     */
    formKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
    /** Budget ranges offered in the form. */
    budgets: [
      l("Under €1,000", "Sub 1.000 €"),
      l("€1,000 – €3,000", "1.000 – 3.000 €"),
      l("€3,000 – €6,000", "3.000 – 6.000 €"),
      l("Over €6,000", "Peste 6.000 €"),
      l("Not sure yet", "Încă nu știu"),
    ],
    // Add more profiles here, e.g. { label: "Instagram", href: "https://instagram.com/…" }.
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ramon-bugariu-025b4b142/" },
      { label: "Behance", href: "https://www.behance.net/ramonbugariu" },
      { label: "GitHub", href: "https://github.com/genesis99949" },
    ] as { label: string; href: string }[],
  },
} as const;
