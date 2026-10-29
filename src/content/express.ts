// One-Page Express: a one-page HTML site on a ready template, delivered within 48 hours (two working days)
// after the order is confirmed and every material has arrived. It is hosted for free on Cloudflare in the
// client's own account, and the price includes the domain for the first year (Ramon's call, 2026-10-27).
// A limited-scope product next to the Website Start / Custom packages (WordPress), not a cheaper Start.
// The price is PROPOSED by Ramon (2026-10-27) and not yet approved for publication: while `published` is
// false the page is noindex and stays out of the sitemap, footer and cross-links. Flip it once approved.

import { l, type L, type Lang } from "./i18n";

export type ExpressTemplateId = "local" | "freelance";

type ExpressTemplate = {
  id: ExpressTemplateId;
  name: L;
  for: L;
  /** What the template puts first. */
  focus: L;
  /**
   * Live demos built on this template, shown side by side on its card. Never point these at client work or an
   * invented project. One demo uses a desktop screenshot (16:10); two use phone screenshots (4:5), so both cards
   * keep about the same image height.
   */
  demos?: Demo[];
};

type Demo = { label: L; href: string; image: string; width: number; height: number; alt: L };

/** One content section of the page (the menu and footer frame them and don't count towards the five). */
type Block = { title: L; text: L };

export const express = {
  id: "one-page-express",
  path: "/one-page-express",
  /** false = proposed price, not public yet (noindex, not linked). */
  published: false,
  name: "One-Page Express",
  /**
   * Round amounts on Ramon's ~5 lei/€ rule: lei on the Romanian site, euro on the English one.
   * `price` includes the domain for the first year; `priceOwnDomain` is for a client who already has one.
   */
  price: { ro: 590, en: 120 } as Record<Lang, number>,
  priceOwnDomain: { ro: 500, en: 100 } as Record<Lang, number>,
  /**
   * Taken off the Start price when an Express client moves to Start within six months of launch ({credit} in the copy).
   * Ramon takes at most two Express orders a week (hero condition and the 48-hour FAQ say so).
   */
  upgradeCredit: { ro: 300, en: 60 } as Record<Lang, number>,
  /** One section beyond the five ({section} in the copy). Set by Ramon, 2026-10-27. */
  extraSection: { ro: 50, en: 10 } as Record<Lang, number>,

  /** The "I already have a domain" switch, in the hero and in the form. */
  domain: {
    toggle: l("I already have a domain", "Am deja domeniu"),
    included: l("Domain included", "Cu domeniu inclus"),
    own: l("On your domain", "Pe domeniul tău"),
    noteIncluded: l(
      "Includes a .ro or .com domain for the first year, in your company's name, and hosting with no monthly cost.",
      "Include un domeniu .ro sau .com pe primul an, pe numele firmei tale, și găzduire fără cost lunar.",
    ),
    noteOwn: l(
      "I publish it on your domain. Hosting still has no monthly cost.",
      "Îl public pe domeniul tău. Găzduirea rămâne fără cost lunar.",
    ),
    name: l("Your domain (optional)", "Domeniul tău (opțional)"),
    namePlaceholder: l("your-company.com", "firma-ta.ro"),
  },

  /** Decorative strip under the header, hidden from screen readers (it repeats the hero). */
  marquee: [
    l("Express website", "Site expres"),
    l("One page, done", "O pagină și gata"),
    l("Live in 48 hours", "Online în 48 de ore"),
  ],
  /** Small tilted labels above each section headline. */
  stickers: {
    includes: l("What you get", "Ce primești"),
    templates: l("Templates", "Șabloane"),
    process: l("Steps", "Pașii"),
    compare: l("Compare", "Compară"),
    faq: l("Questions", "Întrebări"),
  },

  metaTitle: l("One-page website in 48 hours", "Creare site de o pagină, gata în 48h"),
  description: l(
    "A one-page website for your business, €120 with the domain for the first year. Up to five sections, ready two working days after I receive your materials.",
    "Site de o pagină pentru afacerea ta, 590 lei cu domeniul inclus pe primul an. Până la cinci secțiuni, gata în două zile lucrătoare după ce primesc materialele.",
  ),

  hero: {
    title: l("A one-page website, ready in 48 hours.", "Site de o pagină, gata în 48 de ore."),
    lead: l(
      "For a business that needs to be found and contacted online without a long project. I start from a tested template and fit it with your texts, photos and colours.",
      "Pentru o afacere care trebuie să fie găsită și contactată online, fără un proiect lung. Pornesc de la un șablon testat și îl potrivesc cu textele, pozele și culorile tale.",
    ),
    condition: l(
      "The 48 hours mean two working days, counted from when you confirm the order and I have all your materials. I take at most two Express orders a week.",
      "Cele 48 de ore înseamnă două zile lucrătoare, socotite de când confirmi comanda și am primit toate materialele. Iau cel mult două comenzi Express pe săptămână.",
    ),
    primary: l("Request One-Page Express", "Solicită One-Page Express"),
    /** Secondary action: demos once there are any, otherwise the contents. */
    examples: l("See examples", "Vezi exemple"),
    contents: l("See what's included", "Vezi ce include"),
  },

  includes: {
    title: l("Everything that fits on one page.", "Tot ce încape pe o pagină."),
    lead: l(
      "A menu, five sections and a footer. Visitors scroll once and learn who you are, what you offer and how to reach you.",
      "Un meniu, cinci secțiuni și un subsol. Vizitatorul derulează o dată și află cine ești, ce oferi și cum te contactează.",
    ),
    menu: l("Menu with links to each section", "Meniu cu legături către fiecare secțiune"),
    footer: l("Footer with your company details", "Subsol cu datele firmei"),
    blocks: [
      {
        title: l("First impression", "Prima impresie"),
        text: l("Headline, one line about what you do and the main button: call, WhatsApp or request a quote.", "Titlul, o frază despre ce faci și butonul principal: sună, scrie pe WhatsApp sau cere o ofertă."),
      },
      {
        title: l("Services or benefits", "Servicii sau beneficii"),
        text: l("What you offer, briefly, so people quickly see they're in the right place.", "Ce oferi, pe scurt, ca omul să vadă repede că a ajuns unde trebuie."),
      },
      {
        title: l("About you", "Despre tine"),
        text: l("Who you are, where you work and why people can trust you.", "Cine ești, unde lucrezi și de ce poate avea încredere în tine."),
      },
      {
        title: l("Gallery, work or reviews", "Galerie, lucrări sau recenzii"),
        text: l("Photos of your work, or real reviews from your clients if you have them.", "Fotografii cu munca ta sau recenzii reale de la clienți, dacă le ai."),
      },
      {
        title: l("Contact", "Contact"),
        text: l("A WhatsApp button or a simple form, with your phone, email and address.", "Buton de WhatsApp sau un formular simplu, cu telefonul, emailul și adresa ta."),
      },
    ] satisfies Block[],
    alsoTitle: l("Also included", "Mai primești"),
    also: [
      l("Layout adapted for phone, tablet and desktop", "Aspect adaptat pentru telefon, tabletă și desktop"),
      l("Basic SEO: page title, description and a clear heading structure", "SEO de bază: titlul paginii, descrierea și o ierarhie clară a titlurilor"),
      l("Basic speed work: compressed images and lean code", "Optimizare de bază pentru viteză: imagini comprimate și cod curat"),
      l("One round of minor changes", "O rundă de mici modificări"),
      l("The domain for the first year, in your company's name", "Domeniul pe primul an, pe numele firmei tale"),
      l("Hosting on Cloudflare with no monthly cost, in your account, set up by me", "Găzduire pe Cloudflare fără cost lunar, în contul tău, configurată de mine"),
    ],
    excludedTitle: l("Not included in the price", "Nu sunt incluse în preț"),
    excluded: [
      l("Custom illustrations", "Ilustrații personalizate"),
      l("Advanced animation", "Animații avansate"),
      l("Complex custom features", "Funcții complexe, la comandă"),
      l("Online store", "Magazin online"),
      l("Writing the texts from scratch", "Redactarea completă a textelor"),
      l("Professional photography", "Fotografie profesională"),
      l("Video production", "Producție video"),
      l("Domain renewal from the second year", "Reînnoirea domeniului din anul al doilea"),
      l("Email addresses on your domain", "Adrese de email pe domeniu"),
      l("Changes after launch, quoted separately", "Modificările de după lansare, care se cotează separat"),
    ],
    excludedNote: l(
      "Need more pages or your own design? Start and Custom are below. Video ads and voice-over can be ordered separately.",
      "Ai nevoie de mai multe pagini sau de un design propriu? Start și Personalizat sunt mai jos. Reclamele video și voice-over-ul le poți comanda separat.",
    ),
    videoLink: l("See video ads", "Vezi reclamele video"),
  },

  templates: {
    title: l("Two templates for two kinds of business.", "Două șabloane, pentru două feluri de afaceri."),
    lead: l(
      "You choose the one closer to how you work. I adapt it to your colours, photos and texts.",
      "Alegi șablonul mai apropiat de felul în care lucrezi. Eu îl adaptez la culorile, pozele și textele tale.",
    ),
    sectionsLabel: l("Puts first", "Pune accent pe"),
    choose: l("Choose this template", "Aleg acest șablon"),
    items: [
      {
        id: "local",
        name: l("Local services", "Servicii locale"),
        for: l(
          "For salons, repair shops, clinics, tradespeople and businesses with customers nearby.",
          "Pentru saloane, service-uri, cabinete, meseriași și firme cu clienți din zonă.",
        ),
        focus: l("Services, the area you cover and a quick way to call or write.", "Serviciile, zona în care lucrezi și o cale rapidă de a suna sau a scrie."),
        // Static demo in public/demo/salon: a fictional beauty salon, marked as a demo on the page itself.
        demos: [
          {
            label: l("Beauty salon", "Salon de înfrumusețare"),
            href: "/demo/salon/",
            image: "/demo/salon/preview.jpg",
            width: 1600,
            height: 1000,
            alt: l(
              "Demo of the Local services template: the top of a beauty salon's page, with phone and WhatsApp buttons and a photo of the salon.",
              "Demo pentru șablonul Servicii locale: începutul paginii unui salon de înfrumusețare, cu butoane de telefon și WhatsApp și o fotografie a salonului.",
            ),
          },
        ],
      },
      {
        id: "freelance",
        name: l("Freelancers & professionals", "Freelanceri și profesioniști"),
        for: l(
          "For consultants, photographers, trainers, designers and other independent professionals.",
          "Pentru consultanți, fotografi, traineri, designeri și alți profesioniști independenți.",
        ),
        focus: l("Your experience, selected work and a simple quote request.", "Experiența ta, lucrări alese și o cerere de ofertă simplă."),
        // Static demos, each marked as a demo on the page itself: public/demo/fotograf (a fictional wedding
        // photographer) and public/demo/antrenor (a fictional personal trainer, built in its own Vite project,
        // F:\Projects\One-Page Express\Personal Trainer, with the base /demo/antrenor/).
        demos: [
          {
            label: l("Photographer", "Fotograf"),
            href: "/demo/fotograf/",
            image: "/demo/fotograf/preview-mobile.jpg",
            width: 800,
            height: 1000,
            alt: l(
              "Demo of the Freelancers template on a phone: a photographer's page with her name set large over two photographs.",
              "Demo pentru șablonul Freelanceri, pe telefon: pagina unei fotografe, cu numele scris mare deasupra a două fotografii.",
            ),
          },
          {
            label: l("Personal trainer", "Antrenoare personală"),
            href: "/demo/antrenor/",
            image: "/demo/antrenor/preview-mobile.jpg",
            width: 800,
            height: 1000,
            alt: l(
              "Demo of the Freelancers template on a phone: a personal trainer's page with her name and a photo of her in the gym.",
              "Demo pentru șablonul Freelanceri, pe telefon: pagina unei antrenoare personale, cu numele ei și o fotografie din sală.",
            ),
          },
        ],
      },
    ] satisfies ExpressTemplate[] as ExpressTemplate[],
  },

  process: {
    title: l("From template to launch.", "De la șablon la lansare."),
    steps: [
      {
        title: l("Pick a template", "Alegi șablonul"),
        text: l("Tell me which of the two suits you. If you're not sure, I'll help you choose.", "Îmi spui care dintre cele două ți se potrivește. Dacă nu ești sigur, te ajut eu să alegi."),
      },
      {
        title: l("Send your materials", "Trimiți materialele"),
        text: l("Texts, photos, logo, colours and contact details. I send you a short list of what I need.", "Textele, pozele, logo-ul, culorile și datele de contact. Îți trimit o listă scurtă cu ce îmi trebuie."),
      },
      {
        title: l("I build the site", "Construiesc site-ul"),
        text: l("I fit the template with your materials. The 48 hours start here, once the order is confirmed and everything has arrived.", "Potrivesc șablonul cu materialele tale. Cele 48 de ore pornesc aici, după ce comanda e confirmată și am primit tot."),
      },
      {
        title: l("Review and launch", "Verifici și lansăm"),
        text: l("You get a preview link and one round of minor changes. Then I publish it on your domain.", "Primești un link de previzualizare și o rundă de mici modificări. Apoi îl public pe domeniul tău."),
      },
    ],
    note: l(
      "The 48 hours mean two working days and cover the build up to the preview link. If materials arrive in parts, they start when the last one does. Publishing follows once the domain is registered or, if you already have one, once I have access to it.",
      "Cele 48 de ore înseamnă două zile lucrătoare și acoperă construcția, până la linkul de previzualizare. Dacă materialele vin pe bucăți, termenul pornește la ultima. Publicarea urmează după ce domeniul e înregistrat sau, dacă ai deja unul, după ce am acces la el.",
    ),
  },

  compare: {
    title: l("Express, Start or Custom.", "Express, Start sau Personalizat."),
    lead: l(
      "Express is one page with fixed limits. When you need more pages or a design of your own, choose Start or Custom. Move to Start within six months and I take {credit} off its price.",
      "Express înseamnă o singură pagină, cu limite fixe. Când ai nevoie de mai multe pagini sau de un design propriu, alegi Start sau Personalizat. Dacă treci la Start în cel mult șase luni, scad {credit} din prețul lui.",
    ),
    express: l("Express", "Express"),
    rows: [
      {
        label: l("Pages", "Pagini"),
        express: l("One page, up to 5 sections", "O pagină, cel mult 5 secțiuni"),
        start: l("Up to 5 pages", "Până la 5 pagini"),
        custom: l("Agreed in the written quote", "Stabilite în oferta scrisă"),
      },
      {
        label: l("Design", "Design"),
        express: l("Express template, with your colours and photos", "Șablon Express, cu culorile și pozele tale"),
        start: l("My own template, with your colours, fonts and photos", "Șablon propriu, cu culorile, fonturile și pozele tale"),
        custom: l("Designed from scratch, with animation", "Design de la zero, cu animații"),
      },
      {
        label: l("Editing", "Editare"),
        express: l("HTML: I make the changes, priced up front", "HTML: modificările le fac eu, cu preț spus dinainte"),
        start: l("WordPress: you change texts and photos", "WordPress: schimbi singur textele și pozele"),
        custom: l("I make the updates; admin panel optional", "Actualizările le fac eu; panou de administrare opțional"),
      },
      {
        label: l("Hosting", "Găzduire"),
        express: l("No monthly cost, on Cloudflare; domain for the first year", "Fără cost lunar, pe Cloudflare; domeniu pe primul an"),
        start: l("In your name, about €50–70 a year; I set it up", "Pe numele tău, cam 250–350 lei pe an; o configurez eu"),
        custom: l("Itemised in the quote", "Precizată în ofertă"),
      },
      {
        label: l("After launch", "După lansare"),
        express: l("Nothing to update; changes on request", "Nimic de actualizat; modificări la cerere"),
        start: l("One month of site management", "O lună de administrare"),
        custom: l("Three months of site management", "Trei luni de administrare"),
      },
      {
        label: l("Timeline", "Termen"),
        express: l("Two working days after materials", "Două zile lucrătoare după materiale"),
        start: l("About 7 days", "Aproximativ 7 zile"),
        custom: l("Agreed together", "Stabilit împreună"),
      },
    ],
    action: l("Request Express", "Solicită Express"),
    seePackage: l("See package", "Vezi pachetul"),
  },

  faqTitle: l("Questions about Express.", "Întrebări despre Express."),
  faqs: [
    {
      question: l("What is a one-page website?", "Ce este un site de o pagină?"),
      answer: l(
        "A site where everything sits on a single page, one section under another: who you are, what you offer, your work and how to contact you. The menu jumps to each section. It is often called a landing page, and it suits businesses whose offer can be explained briefly.",
        "Un site în care toate informațiile stau pe o singură pagină, una sub alta: cine ești, ce oferi, ce ai lucrat și cum te contactează clientul. Meniul duce la fiecare secțiune. I se mai spune landing page și se potrivește afacerilor a căror ofertă se poate explica pe scurt.",
      ),
    },
    {
      question: l("Can I edit it myself?", "Pot modifica singur site-ul?"),
      answer: l(
        "Not directly: the site is built in HTML, without an admin panel. In return there's nothing to update or maintain. When you want a change, you write to me, I tell you the price and then I make it. If you want to edit texts and photos yourself, the Start package runs on WordPress.",
        "Nu direct: site-ul e făcut în HTML, fără panou de administrare. În schimb, nu ai nimic de actualizat sau de întreținut. Când vrei o schimbare, îmi scrii, îți spun prețul și apoi o fac. Dacă vrei să schimbi singur textele și pozele, pachetul Start e făcut pe WordPress.",
      ),
    },
    {
      question: l("Is hosting included?", "Găzduirea este inclusă?"),
      answer: l(
        "Yes, with no monthly cost. The site sits on Cloudflare's free plan, in an account in your company's name, with SSL. I set it up and publish it.",
        "Da, și nu costă lunar. Site-ul stă pe Cloudflare, pe planul gratuit, într-un cont pe numele firmei tale, cu SSL. Eu îl configurez și îl public.",
      ),
    },
    {
      question: l("Is the domain included?", "Domeniul este inclus?"),
      /** {price} is the price with your own domain; any answer may also use {credit} and {section}. */
      answer: l(
        "Yes, for the first year. I register it in your company's name, so it stays yours; from the second year you pay the renewal directly to the registrar. If you already have a domain, we use it and the price drops to {price}.",
        "Da, pe primul an. Îl înregistrez pe numele firmei tale, ca să rămână al tău; din anul al doilea plătești reînnoirea direct la registrar. Dacă ai deja un domeniu, îl folosim pe acela și prețul scade la {price}.",
      ),
    },
    {
      question: l("Do I get an email address on the domain?", "Primesc și adresă de email pe domeniu?"),
      answer: l(
        "It isn't included. To write from name@your-company.com you need an email service, such as Google Workspace or Zoho, paid separately. I tell you what to choose and how it connects to the domain.",
        "Nu este inclusă. Ca să scrii de pe nume@firma-ta.ro îți trebuie un serviciu de email, de exemplu Google Workspace sau Zoho, plătit separat. Îți spun ce să alegi și cum se leagă de domeniu.",
      ),
    },
    {
      question: l("What if I need more sections?", "Ce se întâmplă dacă am nevoie de mai multe secțiuni?"),
      answer: l(
        "Express has up to five content sections, plus the menu and footer. Each extra section costs {section}. If you need several pages, Start is the better fit.",
        "Express are cel mult cinci secțiuni de conținut, plus meniul și subsolul. O secțiune în plus costă {section}. Dacă ai nevoie de mai multe pagini, Start ți se potrivește mai bine.",
      ),
    },
    {
      question: l("What materials do I need to provide?", "Ce materiale trebuie să pregătesc?"),
      answer: l(
        "Your logo, your colours if you have them, the texts for each section, photos you have the right to use and your contact details, including a WhatsApp number if you want the button. For the domain, your company details. I can tidy up short texts; writing them from scratch is quoted separately.",
        "Logo-ul, culorile tale dacă le ai, textele pentru fiecare secțiune, fotografiile pentru care ai drept de utilizare și datele de contact, inclusiv numărul de WhatsApp dacă vrei butonul. Pentru domeniu, datele firmei. Textele scurte le pot ajusta; redactarea lor de la zero se cotează separat.",
      ),
    },
    {
      question: l("When does the 48-hour period start?", "Când începe termenul de 48 de ore?"),
      answer: l(
        "Once you confirm the order and I have every material. Only working days count: if everything arrives on Friday at 3 pm, you get the preview link by Tuesday at 3 pm. I take at most two Express orders a week, so I can keep that promise; if the week is full, I tell you the first free date. I confirm the exact date in writing before I start.",
        "După ce confirmi comanda și am primit toate materialele. Se socotesc doar zilele lucrătoare: dacă trimiți tot vineri la 15:00, primești linkul de previzualizare până marți la 15:00. Iau cel mult două comenzi Express pe săptămână, ca să pot ține termenul; dacă săptămâna e plină, îți spun prima dată liberă. Data exactă ți-o confirm în scris înainte să încep.",
      ),
    },
    {
      question: l("Can I upgrade later?", "Pot trece mai târziu la un pachet mai mare?"),
      answer: l(
        "Yes. If you move to Start within six months of your Express launch, I take {credit} off the Start price, and your texts, photos and structure move into the new site. For Custom, the written quote sets the price, depending on what we add.",
        "Da. Dacă treci la Start în cel mult șase luni de la lansarea site-ului Express, scad {credit} din prețul Start, iar textele, pozele și structura se mută în noul site. La Personalizat, prețul îl stabilim în oferta scrisă, în funcție de ce adăugăm.",
      ),
    },
    {
      question: l("What happens after delivery?", "Ce se întâmplă după livrare?"),
      answer: l(
        "You get the published site, access to the Cloudflare account and the domain details. There are no updates to run, because the site has no plugins that go out of date. Changes beyond the included round are quoted before I make them.",
        "Primești site-ul publicat, accesul la contul Cloudflare și datele domeniului. Nu ai actualizări de făcut, pentru că site-ul nu are module care să se învechească. Modificările de după runda inclusă le cotez înainte să le fac.",
      ),
    },
  ],

  contact: {
    title: l("Request your one-page site.", "Cere-ți site-ul de o pagină."),
    text: l(
      "I'll reply with the list of materials and the day you can have your site.",
      "Îți răspund cu lista de materiale și ziua în care poți avea site-ul.",
    ),
    /** Under the form: the phone from site.contact. WhatsApp comes only after the request (form.whatsapp*). */
    call: l("Rather talk? Call me at", "Preferi să vorbim? Sună-mă la"),
  },

  /** The request form: three short steps (template → materials → contact), in the page and in a dialog. */
  form: {
    /** {n} is the current step. */
    stepOf: l("Step {n} of 3", "Pasul {n} din 3"),
    back: l("Back", "Înapoi"),
    close: l("Close", "Închide"),
    contactTitle: l("Where should I send my reply?", "Unde îți trimit răspunsul?"),
    contact: l("Email or phone", "Email sau telefon"),
    contactHint: l("Enter a valid email address or phone number.", "Scrie o adresă de email sau un număr de telefon valid."),
    template: l("Which template?", "Ce șablon preferi?"),
    templateUnsure: l("Not sure yet", "Încă nu știu"),
    templateUnsureHint: l("I'll help you choose.", "Te ajut eu să alegi."),
    materials: l("Are your materials ready?", "Ai materialele pregătite?"),
    materialOptions: [
      { value: "ready", label: l("Yes, all of them", "Da, pe toate"), hint: l("Texts, photos, logo and contact details.", "Texte, poze, logo și date de contact.") },
      { value: "partial", label: l("Some of them", "O parte"), hint: l("I'll tell you what's missing.", "Îți spun ce mai lipsește.") },
      { value: "not-yet", label: l("Not yet", "Încă nu"), hint: l("You get the list of what to prepare.", "Primești lista cu ce să pregătești.") },
    ],
    message: l("What does your business do? (optional)", "Ce face afacerea ta? (opțional)"),
    messagePlaceholder: l("A sentence or two, and a link if you have one.", "Una-două fraze și un link, dacă ai unul."),
    send: l("Send request", "Trimite cererea"),
    sent: l(
      "Thanks, I have your request. I'll reply with the day you can have your site.",
      "Mulțumesc, am primit cererea. Îți răspund cu ziua în care poți avea site-ul.",
    ),
    /** Shown under the thank-you note: what to gather now (the full list is docs/checklist-client-express.md). */
    nextTitle: l("Meanwhile, you can get these ready:", "Între timp, poți pregăti:"),
    next: [
      l("The texts for the five sections: what you do, your services, about you, work or reviews, contact.", "Textele pentru cele cinci secțiuni: ce faci, serviciile, despre tine, lucrări sau recenzii, contact."),
      l("Your logo, ideally as a vector file, and your company colours if you have them.", "Logo-ul, de preferat în format vector, și culorile firmei, dacă le ai."),
      l("Photos in their original files, that you have the right to use.", "Pozele, în fișierele originale, pe care ai dreptul să le folosești."),
      l("Two or three names for the domain or, if you already have one, where it is registered.", "Două-trei variante de nume pentru domeniu sau, dacă ai deja unul, unde e înregistrat."),
    ],
    /** Only when site.contact.whatsapp is set. The visitor writes first, so WhatsApp Business can greet them. */
    whatsappLead: l("Want the full list? Message me on WhatsApp and I'll send it.", "Vrei lista completă? Scrie-mi pe WhatsApp și ți-o trimit."),
    whatsappAction: l("Message me on WhatsApp", "Scrie-mi pe WhatsApp"),
    /** Pre-filled message; generic on purpose, no personal data in the link. */
    whatsappText: l("Hi, I've just sent a One-Page Express request.", "Bună, am trimis cererea pentru One-Page Express."),
    subject: l("One-Page Express request — Ramon Bugariu", "Cerere One-Page Express — Ramon Bugariu"),
  },

  sticky: l("Request", "Solicită"),
  more: l("Need more than one page?", "Ai nevoie de mai multe pagini?"),
  /** Cross-link from the Website service page, shown once published. */
  related: l("Only need one page?", "Ai nevoie doar de o pagină?"),
  /** The red promo tile under the homepage pricing (ExpressPromo), shown with `linkExpress`. Title = hero.title. */
  promo: {
    lead: l(
      "Only need one page, fast? A menu, five sections and a footer on a tested template, with the domain for the first year.",
      "Ai nevoie doar de o pagină, repede? Un meniu, cinci secțiuni și un subsol, pe un șablon testat, cu domeniul inclus pe primul an.",
    ),
    action: l("See One-Page Express", "Vezi One-Page Express"),
  },
};

/**
 * Whether other pages link to Express (home pricing, Website page, footer). Always on in `npm run dev`, so the links
 * can be checked locally; in the built site only once `published` is true. Sitemap and noindex follow `published` alone.
 */
export const linkExpress = express.published || process.env.NODE_ENV === "development";
