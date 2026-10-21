// Site-wide copy, in English and Romanian: l("English", "Română"). Every page reads from here.
// Romanian is the main language: write the Romanian line first, then the English one to match.
// For copy work, use the copywriting / copy-editing skills (context in .agents/product-marketing.md).
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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ramonbugariu.ro",
  /** Default meta description. */
  tagline: l(
    "Presentation websites and online stores, designed and built by Ramon Bugariu. From €350 on his own template, or designed from scratch.",
    "Site-uri de prezentare și magazine online, gândite și construite de Ramon Bugariu. De la 350 € pe un șablon propriu sau cu design de la zero.",
  ),
  /** What the site offers, in a few words — after the name in titles ("Ramon Bugariu — …"). */
  offer: l("Websites and online stores", "Site-uri de prezentare și magazine online"),
  year: 2026,

  hero: {
    text: l(
      "Design and code from the same person. A site that looks like your business and opens fast on a phone.",
      "Design și cod de la același om. Un site care arată ca afacerea ta și se deschide repede pe telefon.",
    ),
    primary: l("Get a quote", "Cere o ofertă"),
    secondary: l("See the work", "Vezi proiectele"),
  },
  work: {
    headline: l("Online stores, from logo to checkout.", "Magazine online, de la logo la checkout."),
    text: l(
      "Identity, site and store, made end to end by me. Open one to see every page in motion.",
      "Identitate, site și magazin, făcute cap-coadă de mine. Deschide unul ca să vezi fiecare pagină în mișcare.",
    ),
  },
  services: {
    headline: l("A site that presents you, or a store that sells.", "Un site care te prezintă sau un magazin care vinde."),
    text: l(
      "Both start either from my own template or from a design made from scratch for your brand. After launch, you change texts, photos and products yourself.",
      "Amândouă pornesc fie de la un șablon al meu, fie de la un design făcut de la zero pentru brandul tău. După lansare, textele, pozele și produsele le schimbi singur.",
    ),
    /** Label before the projects listed under a service. */
    seeWork: l("Examples", "Exemple"),
    /** Jumps to the pricing, switched to this service. */
    action: l("See prices", "Vezi prețurile"),
  },
  pricing: {
    headline: l("Pick your starting point.", "Alege de unde pornești."),
    text: l(
      "Start is built on my own template and has clear limits, which is why it costs less. Custom is designed from scratch. You get the exact price in writing after a short call.",
      "Start pornește de la un șablon al meu și are limite clare, de aceea costă mai puțin. Personalizat e gândit de la zero. Prețul exact îl primești în scris, după o discuție scurtă.",
    ),
    /** Label of the switch between the two services. */
    switchLabel: l("Choose a service", "Alege serviciul"),
    /** Shown before a package price, e.g. "from €1,200". */
    from: l("from", "de la"),
    onRequest: l("Price on request", "Preț la cerere"),
    action: l("Choose this package", "Aleg acest pachet"),
    /** Heading of the optional extras under the packages. */
    extras: l("Add to any package", "Se pot adăuga la orice pachet"),
    payment: l("Payment: 50% to start, 50% at launch.", "Plata: 50% avans, 50% la lansare."),
  },
  process: {
    headline: l("How I work.", "Cum lucrez."),
    steps: [
      {
        title: l("Talk", "Discutăm"),
        text: l(
          "A short call or video chat about your business, who it's for, and when you need the site.",
          "O discuție scurtă, la telefon sau online, despre afacerea ta, clienții tăi și când ai nevoie de site.",
        ),
      },
      {
        title: l("Proposal", "Propunere"),
        text: l(
          "You get the scope, the deadline and the price in writing. Work starts after the deposit.",
          "Primești în scris ce include proiectul, termenul și prețul. Începem după avans.",
        ),
      },
      {
        title: l("Design & build", "Design & dezvoltare"),
        text: l(
          "I send you the site in progress on a test link, so you can check it on your phone and tell me what to change.",
          "Îți trimit site-ul în lucru pe un link de test, ca să-l verifici pe telefon și să-mi spui ce schimbăm.",
        ),
      },
      {
        title: l("Launch", "Lansare"),
        text: l(
          "The site goes live on your domain, and I show you how to change texts and photos yourself.",
          "Site-ul intră live pe domeniul tău și îți arăt cum schimbi singur textele și pozele.",
        ),
      },
    ],
  },
  /** Eyebrow + statement of the About section, in Ramon's own voice. */
  aboutLabel: l("About me", "Despre mine"),
  about: l(
    "I'm Ramon, a web designer and developer. I work alone, so the person you talk to first is the one who designs, codes and launches your site. To me, a site is finished only when it opens fast on an ordinary phone and looks like your business.",
    "Sunt Ramon, web designer și developer. Lucrez singur, așa că omul cu care vorbești la început e același care desenează, scrie codul și lansează site-ul. Pentru mine, un site e gata abia când se deschide repede pe un telefon obișnuit și arată ca afacerea ta.",
  ),
  contact: {
    headline: l("Tell me about your business.", "Spune-mi despre afacerea ta."),
    text: l(
      "I'll reply with a few questions, a first idea and a ballpark price.",
      "Îți răspund cu câteva întrebări, o primă idee și un preț orientativ.",
    ),
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
      l("Under €500", "Sub 500 €"),
      l("€500 – €1,000", "500 – 1.000 €"),
      l("€1,000 – €2,500", "1.000 – 2.500 €"),
      l("Over €2,500", "Peste 2.500 €"),
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
