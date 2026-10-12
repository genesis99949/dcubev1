// Site-wide copy, in English and Romanian: l("English", "Română"). Every page reads from here.
// The six services live in ./services.ts, the packages in ./packages.ts, projects in ./projects.ts.

import { l } from "./i18n";

export const site = {
  name: "Dcube",
  /** The person behind the studio. */
  owner: {
    name: "Ramon Bugariu",
    role: l("Web Designer & Web Developer", "Web designer & web developer"),
  },
  /** Public URL (social previews, canonical links, sitemap). NEXT_PUBLIC_SITE_URL overrides it, e.g. for a custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dcubev1.ramonbugariu.workers.dev",
  /** Default meta description. */
  tagline: l(
    "Dcube is the studio of Ramon Bugariu — web design, branding and marketing, every face of your brand from one idea.",
    "Dcube este studioul lui Ramon Bugariu — web design, branding și marketing, fiecare față a brandului tău pornind de la o singură idee.",
  ),
  year: 2026,

  hero: {
    headline: l("Every face of your brand.", "Fiecare față a brandului tău."),
    text: l(
      "Websites, identities and campaigns — designed as one, by one studio.",
      "Site-uri, identități vizuale și campanii — gândite împreună, de un singur studio.",
    ),
    primary: l("Get in touch", "Hai să vorbim"),
    secondary: l("See the work", "Vezi proiectele"),
  },
  work: {
    headline: l("Selected work.", "Proiecte alese."),
    text: l(
      "Identities and online shops, from the first sketch to the last pixel.",
      "Identități și magazine online, de la prima schiță la ultimul pixel.",
    ),
  },
  services: {
    headline: l("Six faces. One cube.", "Șase fețe. Un singur cub."),
    text: l(
      "Web, branding and marketing — three axes, two faces each. Most brands need several of them; they work best when they come from one idea.",
      "Web, branding și marketing — trei axe, câte două fețe fiecare. Cele mai multe branduri au nevoie de mai multe dintre ele; funcționează cel mai bine când pornesc de la aceeași idee.",
    ),
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
    note: l(
      "Need something else — an online shop, packaging, a campaign? Tell me about it.",
      "Ai nevoie de altceva — un magazin online, ambalaje, o campanie? Spune-mi despre ce e vorba.",
    ),
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
    "I'm Ramon, a web designer and developer. Dcube is my studio — I build brands, websites and the content around them, from the first sketch to launch day. One person, one idea, carried all the way through.",
    "Sunt Ramon, web designer și developer. Dcube e studioul meu — construiesc branduri, site-uri și conținutul din jurul lor, de la prima schiță până în ziua lansării. Un singur om, o singură idee, dusă până la capăt.",
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
