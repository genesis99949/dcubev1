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
    "I create websites, online stores and AI video ads. Design, code and voice-over, working directly with me. Explore projects and prices.",
    "Creez site-uri de prezentare, magazine online și reclame video cu AI. Design, cod și voice-over, direct cu mine. Vezi proiectele și prețurile.",
  ),
  /** What the site offers, in a few words — after the name in titles ("Ramon Bugariu — …"). */
  offer: l("Websites and online stores", "Site-uri de prezentare și magazine online"),
  year: 2026,
  /** Confirmed PFA details. The owner has not authorised publishing the street address. */
  business: {
    name: "BUGARIU RAMON-DAVID PERSOANĂ FIZICĂ AUTORIZATĂ",
    cui: "55131615",
    registration: "F2026034188004",
    euid: "ROONRC.F2026034188004",
    clients: l("I work with companies, sole traders and private persons. Online stores are for companies and sole traders only.", "Lucrez cu firme, PFA-uri și persoane fizice. Magazinele online le fac doar pentru firme și PFA-uri."),
    /** Private persons (B2C, Ramon's call 2026-11-12): the 14-day withdrawal right, said plainly where prices are shown. */
    withdrawal: l(
      "If you order as a private person, you can withdraw from the contract within 14 days of signing it, without giving a reason. If you ask me to start work before then, you pay only for the part already done.",
      "Dacă ești persoană fizică, poți renunța la contract în 14 zile de la semnare, fără să-mi spui motivul. Dacă îmi ceri să încep lucrul mai devreme, plătești doar partea făcută până atunci.",
    ),
    vat: l("Not registered for VAT. VAT is not added to the displayed prices.", "Neplătitor de TVA. TVA nu se adaugă prețurilor afișate."),
  },

  hero: {
    text: l(
      "Design and code from the same person. A site that looks like your business and opens fast on a phone.",
      "Design și cod de la același om. Un site care arată ca afacerea ta și se deschide repede pe telefon.",
    ),
    primary: l("Get a quote", "Cere o ofertă"),
    secondary: l("See the work", "Vezi proiectele"),
  },
  work: {
    headline: l("Online stores, from homepage to checkout.", "Magazine online, de la pagina principală la checkout."),
    text: l(
      "Every page designed and built by me. Open one to see them in motion.",
      "Fiecare pagină, desenată și construită de mine. Deschide unul ca să le vezi în mișcare.",
    ),
  },
  services: {
    headline: l("A site that presents you, or a store that sells.", "Un site care te prezintă sau un magazin care vinde."),
    text: l(
      "Start is a WordPress site you manage yourself. Custom is designed from scratch for your brand.",
      "Start e un site pe WordPress, pe care îl administrezi singur. Personalizat e gândit de la zero pentru brandul tău.",
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
    hosting: l(
      "For Start, you pay hosting directly to the provider, in your name or your company's. I help you choose it and set it up.",
      "La Start, găzduirea o plătești direct furnizorului, pe numele tău sau al firmei. Te ajut să o alegi și o configurez eu.",
    ),
    detailsTitle: l("Costs and materials", "Costuri și materiale"),
    details: [
      {
        question: l("What about the domain, hosting and renewals?", "Cum rămâne cu domeniul, găzduirea și reînnoirile?"),
        answer: l("The domain and hosting are in your name or your company's and you pay the providers directly. Hosting usually costs €50–70 a year for a WordPress presentation site and €80–150 a year for a WooCommerce store, which needs a stronger plan. I don't sell hosting: I help you choose it and set it up. For Custom, hosting depends on how the site is built. The written quote lists these costs, any paid licences and renewals, so you know the recurring costs before work starts.", "Domeniul și găzduirea sunt pe numele tău sau al firmei și le plătești direct furnizorilor. Găzduirea costă de obicei 250–350 lei pe an pentru un site de prezentare pe WordPress și 400–750 lei pe an pentru un magazin WooCommerce, care are nevoie de un plan mai puternic. Nu vând găzduire: te ajut să o alegi și o configurez eu. La Personalizat, găzduirea depinde de cum e construit site-ul. Oferta scrisă trece aceste costuri, eventualele licențe plătite și reînnoirile, ca să cunoști costurile recurente înainte să începem."),
      },
      {
        question: l("Can I order as a private person?", "Pot comanda ca persoană fizică?"),
        answer: l(
          "Yes, for a presentation website; online stores are for companies and sole traders only. The prices are final: I'm not registered for VAT, so nothing is added. The delivery time is in the quote and the contract. You can withdraw from the contract within 14 days of signing it, without giving a reason; if you ask me to start work before then, you pay only for the part already done. Payment is by bank transfer, with an invoice from my sole-trader business.",
          "Da, pentru un site de prezentare; magazinele online le fac doar pentru firme și PFA-uri. Prețurile sunt finale: sunt neplătitor de TVA, deci nu se adaugă nimic. Termenul de livrare e trecut în ofertă și în contract. Poți renunța la contract în 14 zile de la semnare, fără să-mi spui motivul; dacă îmi ceri să încep lucrul mai devreme, plătești doar partea făcută până atunci. Plata se face prin transfer bancar, cu factură de la PFA-ul meu.",
        ),
      },
      {
        question: l("What does site management cover after launch?", "Ce acoperă administrarea după lansare?"),
        answer: l("The included period is one month with Start or three with Custom. I handle the agreed content changes and check that the site works. The quote defines the number of interventions and the optional monthly fee afterwards. New pages, features and redesigns are quoted separately.", "Perioada inclusă este de o lună la Start sau trei la Personalizat. Mă ocup de modificările de conținut convenite și verific funcționarea site-ului. Oferta precizează numărul de intervenții și tariful lunar opțional de după. Paginile, funcțiile noi și schimbările de design se cotează separat."),
      },
      {
        question: l("Who provides the texts, photos and logo?", "Cine pregătește textele, fotografiile și logo-ul?"),
        answer: l("Before starting, we list the pages, features and materials needed. You send the texts, images and logo you already have. If you need copywriting, we include it separately in the quote.", "Înainte să începem, facem lista paginilor, funcțiilor și materialelor necesare. Îmi trimiți textele, imaginile și logo-ul pe care le ai. Dacă ai nevoie de redactarea textelor, o includem separat în ofertă."),
      },
    ],
  },
  process: {
    headline: l("How we build your website.", "Cum lucrăm la site-ul tău."),
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
          "The site goes live on your domain, and I show you how to use it.",
          "Site-ul intră live pe domeniul tău și îți arăt cum îl folosești.",
        ),
      },
    ],
  },
  /** Eyebrow + statement of the About section, in Ramon's own voice. "\n\n" starts a new paragraph. */
  aboutLabel: l("About me", "Despre mine"),
  about: l(
    "I'm Ramon, a web designer and developer in Timișoara. Alongside websites, I create video ads with AI and handle video editing, sound design and voice-over.\n\nPlenty of businesses get a website just to have one. I start by asking what it has to bring in: a call, a booking, an order. That way I begin with the end in mind and know from day one what your business needs.\n\nI like drawing every page from scratch and taking risks with the design, but in the end the page has to be fast and have a clear purpose.",
    "Sunt Ramon, web designer și developer din Timișoara. Pe lângă site-uri, creez reclame video cu ajutorul AI și mă ocup de montaj, sound design și voice-over.\n\nMulte firme își fac un site doar ca să existe. Eu încep cu întrebarea ce trebuie să aducă: un telefon, o rezervare, o comandă. Așa pornesc cu finalul în minte și știu de la început de ce are nevoie afacerea ta.\n\nÎmi place să desenez fiecare pagină de la zero și să-mi asum riscuri în design, dar la final pagina trebuie să fie rapidă și să aibă un scop clar.",
  ),
  contact: {
    headline: l("Tell me about your business.", "Spune-mi despre afacerea ta."),
    text: l(
      "Within 24–48 hours I'll reply with a few questions, a first idea and a ballpark price.",
      "În 24–48 de ore îți răspund cu câteva întrebări, o primă idee și un preț orientativ.",
    ),
    // Public business contact explicitly supplied by Ramon; the private delivery address stays private.
    email: "contact@ramonbugariu.ro" as string,
    /** Public business phone, given by Ramon on 2026-10-28; also his WhatsApp. */
    phone: { ro: "0774 774 069", en: "+40 774 774 069" } as Record<"ro" | "en", string>,
    phoneHref: "tel:+40774774069",
    /** WhatsApp number, digits only in international format, for wa.me links. Empty = no WhatsApp buttons. */
    whatsapp: "40774774069" as string,
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
    /** Answers to "How did you hear about me?" in the forms; sent in the request email, nothing else. */
    sources: [
      l("Google", "Google"),
      l("Facebook", "Facebook"),
      l("Instagram", "Instagram"),
      l("YouTube", "YouTube"),
      l("TikTok", "TikTok"),
      l("A recommendation", "Recomandare"),
      l("Somewhere else", "Altă sursă"),
    ],
    // Add more profiles here, e.g. { label: "Instagram", href: "https://instagram.com/…" }.
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ramon-bugariu-025b4b142/" },
      { label: "Behance", href: "https://www.behance.net/ramonbugariu" },
      { label: "GitHub", href: "https://github.com/genesis99949" },
    ] as { label: string; href: string }[],
  },
} as const;
