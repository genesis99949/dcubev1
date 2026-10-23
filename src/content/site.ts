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
    "I design and build websites and online stores for your business. Work directly with me, from the first design to launch. Explore projects and prices.",
    "Creez site-uri de prezentare și magazine online pentru afacerea ta. Lucrezi direct cu mine, de la design la lansare. Vezi proiectele și prețurile.",
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
      "Both start either from my own WordPress template, which you can run yourself, or from a design made from scratch for your brand. For the first months after launch, I look after the site for free.",
      "Amândouă pornesc fie de la un șablon al meu pe WordPress, pe care îl administrezi ușor singur, fie de la un design făcut de la zero pentru brandul tău. În primele luni după lansare, site-ul îl administrez eu, gratuit.",
    ),
    /** Label before the projects listed under a service. */
    seeWork: l("Examples", "Exemple"),
    /** Jumps to the pricing, switched to this service. */
    action: l("See prices", "Vezi prețurile"),
  },
  pricing: {
    headline: l("Pick your starting point.", "Alege de unde pornești."),
    /** Label of the switch between the two services. */
    switchLabel: l("Choose a service", "Alege serviciul"),
    /** Shown before a package price, e.g. "de la 1.800 lei" / "from €350". */
    from: l("from", "de la"),
    onRequest: l("Price on request", "Preț la cerere"),
    action: l("Choose this package", "Aleg acest pachet"),
    /** Heading of the optional extras under the packages. */
    extras: l("Add to any package", "Se pot adăuga la orice pachet"),
    payment: l("Payment: 50% to start, 50% at launch.", "Plata: 50% avans, 50% la lansare."),
    ownHosting: l(
      "Already have hosting for Start? If it's up to date, I install the site there and take its cost off the price.",
      "Ai deja găzduire pentru Start? Dacă e potrivită, instalez site-ul pe ea și scad costul găzduirii din preț.",
    ),
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
          "The site goes live on your domain, and I look after it for free at first: one month on Start, three on Custom.",
          "Site-ul intră live pe domeniul tău, iar la început îl administrez eu, gratuit: o lună la Start, trei luni la Personalizat.",
        ),
      },
    ],
  },
  /** Eyebrow + statement of the About section, in Ramon's own voice. "\n\n" starts a new paragraph. */
  aboutLabel: l("About me", "Despre mine"),
  about: l(
    "I'm Ramon, a web designer and developer in Timișoara, and besides websites I make video ads and online content, more and more often with the help of AI. I started with banners, ads and logos, then moved to code.\n\nPlenty of businesses get a website just to have one. I start by asking what it has to bring in: a call, a booking, an order. That way I begin with the end in mind and know from day one what your business needs.\n\nI like drawing every page from scratch and taking risks with the design, but in the end the page has to be fast and have a clear purpose.",
    "Sunt Ramon, web designer și developer din Timișoara, iar pe lângă site-uri fac reclame video și conținut online, tot mai des cu ajutorul AI. Am început cu bannere, reclame și logo-uri, apoi am trecut la cod.\n\nMulte firme își fac un site doar ca să existe. Eu încep cu întrebarea ce trebuie să aducă: un telefon, o rezervare, o comandă. Așa pornesc cu finalul în minte și știu de la început de ce are nevoie afacerea ta.\n\nÎmi place să desenez fiecare pagină de la zero și să-mi asum riscuri în design, dar la final pagina trebuie să fie rapidă și să aibă un scop clar.",
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
    formKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "fe20cbd5-f67f-4ba2-b4f0-1fe94baec65a",
    /** Budget ranges offered in the form (lei in Romanian, euro in English, as in the pricing). */
    budgets: [
      l("Under €500", "Sub 2.500 lei"),
      l("€500 – €1,000", "2.500 – 5.000 lei"),
      l("€1,000 – €2,500", "5.000 – 12.500 lei"),
      l("Over €2,500", "Peste 12.500 lei"),
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
