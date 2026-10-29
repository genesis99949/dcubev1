import { l, type L } from "./i18n";
import type { Service } from "./services";

type ServicePageContent = {
  service: Service;
  path: string;
  title: L;
  metaTitle: L;
  description: L;
  intro: L;
  audience: L;
  benefitsTitle: L;
  benefits: { title: L; text: L }[];
  examplesTitle: L;
  examplesText: L;
  faqs: { question: L; answer: L }[];
};

export const servicePages = {
  website: {
    service: "Website",
    path: "/website-design",
    title: l("Website design for your business", "Creare site de prezentare"),
    metaTitle: l("Business website design", "Creare site de prezentare"),
    description: l(
      "Website design for your business. Compare WordPress Start and custom design, see what's included and request a quote. Work directly with Ramon Bugariu.",
      "Creare site de prezentare pentru firma ta. Compară pachetele Start și Personalizat, vezi ce includ și cere o ofertă. Lucrezi direct cu mine, Ramon Bugariu.",
    ),
    intro: l(
      "I design and build a site that explains what your business does and makes it easy to contact you. We start with the action you want visitors to take: a call, a booking or a quote request.",
      "Creez un site care explică ce face afacerea ta și prin care clienții te pot contacta ușor. Pornim de la ce vrei să facă vizitatorul: să sune, să ceară o programare sau o ofertă.",
    ),
    audience: l(
      "For companies and sole traders working on professional projects. I'm based in Timișoara and we can work together online, wherever you are in Romania.",
      "Pentru firme și PFA care au nevoie de un site pentru activitatea profesională. Sunt în Timișoara și putem lucra online, din orice oraș din România.",
    ),
    benefitsTitle: l("What your site needs to explain.", "Ce trebuie să afle clientul de pe site."),
    benefits: [
      {
        title: l("What you do", "Cu ce îl ajuți"),
        text: l(
          "I arrange your services so visitors can understand the offer, see relevant work and find the information they need before contacting you.",
          "Așez serviciile astfel încât omul să înțeleagă oferta, să vadă exemple relevante și să găsească informațiile de care are nevoie înainte să te contacteze.",
        ),
      },
      {
        title: l("How to reach you", "Cum ajunge la tine"),
        text: l(
          "A contact form, clear links and pages adapted for mobile. We agree what the form needs to collect and test it before launch.",
          "Formular de contact, legături clare și pagini adaptate pentru mobil. Stabilim ce informații trebuie să ceară formularul și îl testăm înainte de lansare.",
        ),
      },
      {
        title: l("Who keeps it up to date", "Cine actualizează site-ul"),
        text: l(
          "With WordPress Start, you can change texts and photos yourself. With Custom, I make the agreed updates; an admin panel can be added separately.",
          "La Start, pe WordPress, schimbi singur textele și pozele. La Personalizat, fac eu actualizările agreate; un panou de administrare poate fi adăugat separat.",
        ),
      },
    ],
    examplesTitle: l("This portfolio is a presentation website.", "Chiar portofoliul acesta este un site de prezentare."),
    examplesText: l(
      "You can explore the service descriptions, pricing and contact form here. This site shows my approach to custom design; a Start site uses my own WordPress template, adapted to your business.",
      "Poți verifica aici prezentarea serviciilor, prețurile și formularul de contact. Site-ul acesta arată cum abordez un design personalizat; la Start folosesc un șablon propriu pe WordPress, adaptat afacerii tale.",
    ),
    faqs: [
      {
        question: l("How do I choose between Start and Custom?", "Cum aleg între Start și Personalizat?"),
        answer: l(
          "Start suits a presentation website with up to five pages and an existing structure adapted to your brand. Choose Custom when you want the pages designed from scratch. The written quote sets out the pages and features.",
          "Start se potrivește unui site de prezentare de până la cinci pagini, cu o structură existentă adaptată brandului tău. Alegi Personalizat când vrei paginile desenate de la zero. Paginile și funcțiile se stabilesc în oferta scrisă.",
        ),
      },
      {
        question: l("When can the site go live?", "În cât timp poate fi gata site-ul?"),
        answer: l(
          "The Start package has an indicative timeline of about seven days. The written quote confirms the deadline and the materials needed before work starts. Custom has its own agreed schedule.",
          "Pachetul Start are un termen orientativ de aproximativ șapte zile. Oferta scrisă confirmă termenul și materialele necesare înainte de lucru. La Personalizat stabilim un calendar pentru proiectul tău.",
        ),
      },
      {
        question: l("What do I need to prepare?", "Ce trebuie să pregătesc?"),
        answer: l(
          "Your services, company details, logo and the photos you have the right to use. We agree who supplies the texts and images. Copywriting and additional languages can be quoted separately.",
          "Lista serviciilor, datele firmei, logo-ul și fotografiile pentru care ai drept de utilizare. Stabilim cine furnizează textele și imaginile. Redactarea textelor și limbile suplimentare se pot oferta separat.",
        ),
      },
      {
        question: l("What does basic SEO include?", "Ce înseamnă SEO de bază?"),
        answer: l(
          "Page titles and descriptions, a clear heading structure and the technical setup for search engines to find the site. Ongoing content and SEO work are agreed separately. Search positions are not guaranteed.",
          "Titluri și descrieri pentru pagini, o ierarhie clară a titlurilor din conținut și pregătirea tehnică pentru ca motoarele de căutare să găsească site-ul. Conținutul și optimizarea SEO continuă se stabilesc separat. Pozițiile în căutare nu sunt garantate.",
        ),
      },
    ],
  },
  store: {
    service: "Online store",
    path: "/online-store",
    title: l("Online store design and development", "Creare magazin online"),
    metaTitle: l("Online store design & development", "Creare magazin online"),
    description: l(
      "Online store design with product pages, cart and card payments. Compare WordPress Start and custom design, explore portfolio concepts and request a quote.",
      "Creare magazin online cu pagini de produs, coș și plăți cu cardul. Compară Start și Personalizat, vezi conceptele din portofoliu și cere o ofertă pentru brandul tău.",
    ),
    intro: l(
      "I build your store around what you sell, from the product page to checkout. We agree how customers choose a product, pay and receive information about their order.",
      "Construiesc magazinul în jurul produselor tale, de la pagina de produs până la checkout. Stabilim cum alege clientul un produs, cum plătește și ce informații primește despre comandă.",
    ),
    audience: l(
      "For companies and sole traders selling their own products. I'm based in Timișoara and work online with businesses across Romania.",
      "Pentru firme și PFA care își vând propriile produse. Sunt în Timișoara și lucrez online cu afaceri din toată România.",
    ),
    benefitsTitle: l("From product to order.", "De la produs la comandă."),
    benefits: [
      {
        title: l("Product pages", "Pagini de produs"),
        text: l(
          "Photos, descriptions and prices, arranged for browsing on a phone. With Start, I upload up to 30 products; we agree the catalog structure before work begins.",
          "Fotografii, descrieri și prețuri, așezate pentru a fi citite pe telefon. La Start urc eu până la 30 de produse; structura catalogului o stabilim înainte de lucru.",
        ),
      },
      {
        title: l("Cart and payment", "Coș și plată"),
        text: l(
          "I set up the cart, checkout and card payments using the agreed provider. Your business supplies the payment account; provider fees and any paid licences are listed separately in the quote.",
          "Configurez coșul, checkout-ul și plățile cu cardul prin procesatorul agreat. Firma ta furnizează contul pentru plăți; comisioanele procesatorului și eventualele licențe plătite se precizează separat în ofertă.",
        ),
      },
      {
        title: l("Running the store", "Administrarea magazinului"),
        text: l(
          "WordPress Start lets you manage products and orders yourself. With Custom, I handle the agreed updates; a management panel is an optional extra. Shipping rates and rules are agreed before launch.",
          "La Start, pe WordPress, gestionezi singur produsele și comenzile. La Personalizat mă ocup eu de actualizările agreate; panoul de administrare este opțional. Tarifele și regulile de livrare le stabilim înainte de lansare.",
        ),
      },
    ],
    examplesTitle: l("Two ways to present a brand's products.", "Două feluri de a prezenta produsele unui brand."),
    examplesText: l(
      "Pure Flame and David Craft Ale are portfolio concepts I designed and built. They show the shop, product pages and mobile layouts of each store.",
      "Pure Flame și David Craft Ale sunt concepte de portofoliu pe care le-am desenat și construit. Poți vedea magazinul, paginile de produs și versiunile pentru mobil ale fiecăruia.",
    ),
    faqs: [
      {
        question: l("Do you use WooCommerce or build from scratch?", "Lucrezi cu WooCommerce sau construiești de la zero?"),
        answer: l(
          "Start uses WordPress and WooCommerce with my own template adapted to your brand. Custom has shop pages designed from scratch. The quote confirms the technical solution and whether an admin panel is included.",
          "Start folosește WordPress și WooCommerce, cu un șablon propriu adaptat brandului tău. Personalizat are paginile magazinului desenate de la zero. Oferta confirmă soluția tehnică și dacă este inclus un panou de administrare.",
        ),
      },
      {
        question: l("How long does a store take?", "Cât durează realizarea magazinului?"),
        answer: l(
          "Start has an indicative timeline of about 14 days. We confirm the deadline in writing after reviewing the catalog, product materials and payment access. Custom gets a schedule based on the agreed scope.",
          "La Start, termenul orientativ este de aproximativ 14 zile. Confirmăm termenul în scris după ce verificăm catalogul, materialele produselor și accesul pentru plăți. La Personalizat, calendarul depinde de ce stabilim în ofertă.",
        ),
      },
      {
        question: l("Who supplies the product information?", "Cine pregătește informațiile produselor?"),
        answer: l(
          "You provide product names, descriptions, prices and photos you have the right to use. We agree the categories and any product variants before uploading. Additional product uploads and copywriting can be quoted separately.",
          "Tu furnizezi denumirile, descrierile, prețurile și fotografiile pentru care ai drept de utilizare. Stabilim categoriile și eventualele variante înainte de încărcare. Produsele în plus și redactarea textelor se pot oferta separat.",
        ),
      },
      {
        question: l("What costs continue after launch?", "Ce costuri rămân după lansare?"),
        answer: l(
          "The domain and hosting are in your company's name: you pay the providers directly and I set them up. The written quote lists their costs, any licences and payment-provider fees. Store management is free for the first month with Start and the first three with Custom; ongoing management is agreed separately.",
          "Domeniul și găzduirea sunt pe numele firmei tale: le plătești direct furnizorilor, iar eu le configurez. Oferta scrisă precizează costurile lor, eventualele licențe și comisioanele procesatorului de plăți. Administrarea este gratuită o lună la Start și trei luni la Personalizat; continuarea se stabilește separat.",
        ),
      },
    ],
  },
} satisfies Record<string, ServicePageContent>;

export type ServicePageKey = keyof typeof servicePages;

export const servicePageCopy = {
  breadcrumb: l("Breadcrumb", "Traseul paginii"),
  home: l("Home", "Acasă"),
  price: l("Starting at", "De la"),
  quote: l("Request a quote", "Cere o ofertă"),
  prices: l("Compare packages", "Compară pachetele"),
  packages: l("What is included and what it costs.", "Ce include și cât costă."),
  process: l("From our first conversation to launch.", "De la prima discuție la lansare."),
  faq: l("Before we start.", "Înainte să începem."),
  about: l("One person, from design to launch.", "Un singur om, de la design la lansare."),
  aboutText: l(
    "I'm Ramon Bugariu, a web designer and developer in Timișoara. You work directly with me on the design, implementation and launch. Before starting, you receive a written quote with the scope, price and deadline.",
    "Sunt Ramon Bugariu, web designer și developer din Timișoara. Lucrezi direct cu mine la design, implementare și lansare. Înainte de lucru primești oferta scrisă, cu ce include proiectul, prețul și termenul.",
  ),
  ownSite: l("Explore this site", "Vezi site-ul acesta"),
  portfolio: l("See all projects", "Vezi toate proiectele"),
  otherService: l("Looking for the other type of site?", "Ai nevoie de celălalt tip de site?"),
};
