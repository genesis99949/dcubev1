// The free guide (lead magnet): "What to sort out before you build your website". The landing page
// (/ghid-site, /en/website-guide) asks for a name and an email, then hands over the PDF. The PDF is printed
// from the guide's own page (/ghid-site/document, /en/website-guide/document) with `npm run render:guide`.
// Built 2026-11-03 for Ramon's review: while `published` is false the landing page is noindex and only linked
// in `npm run dev` (`linkGuide`). Facts come from docs/checklist-client-*.md and .agents/product-marketing.md.

import { l, type L, type Lang } from "./i18n";

type Chapter = { title: L; text: L; items: L[] };
type Cost = { item: L; note: L };

export const guide = {
  path: "/website-guide",
  documentPath: "/website-guide/document",
  /** false = draft, not public yet (noindex, not linked outside `npm run dev`). */
  published: false,
  /** The printed guide, one file per language (rendered by scripts/render-guide.mjs). */
  pdf: {
    ro: "/guide/ghid-site-ramon-bugariu.pdf",
    en: "/guide/website-guide-ramon-bugariu.pdf",
  } satisfies Record<Lang, string>,
  /**
   * Ramon's Brevo form (docs/brevo-setup.md). Only visitors who tick "tips by email" are sent there, and Brevo's
   * double opt-in email confirms them. null = Brevo not set up yet (the form works with Web3Forms alone).
   * The URL is the `action` of the form's HTML embed code; it's public by design (every embedded form shows it).
   */
  brevo: {
    // Form "Ghid site - sfaturi pe email" → list "Sfaturi site (ghid)" (#3), created 2026-11-03.
    formUrl: (process.env.NEXT_PUBLIC_BREVO_FORM_URL ??
      "https://fcdc333a.sibforms.com/serve/MUIFAE4OV1PSHl0xft7eaJmoHAwNnrxjnvr9cn_ogfQWJEHsClt5U4Wiigb0R2gEZIUwEB7W3NlHKCN9-Ozlw_5jCT3G6GcyFrr-xM6PKuao6kcqi53H5UnkbEVXDV_BIVe0xtZ7ZLfw3IbUJyVj4gsh0KUgYbJS34E6g_9AKiJ38OvK9b2V3o9EHbnQCXoyrBJT2gK8BzknBPdSpA==") as string | null,
    /**
     * Field names as they appear in the embed code. The form has an email field only (the first name reaches Ramon
     * through Web3Forms); add an attribute field in Brevo and set `firstName` (e.g. "FIRSTNAME") to send it too.
     */
    fields: { email: "EMAIL", firstName: null as string | null },
  },

  metaTitle: l("Free guide: before you build your website", "Ghid gratuit: înainte să-ți faci site-ul"),
  description: l(
    "A free PDF for companies and sole traders: what to decide, which materials to gather, what you pay each year and what to ask a web designer before paying a deposit.",
    "Un PDF gratuit pentru firme și PFA-uri: ce decizi, ce materiale strângi, ce plătești în fiecare an și ce întrebi un web designer înainte să dai avansul.",
  ),

  // Landing page
  eyebrow: l("Free guide · PDF", "Ghid gratuit · PDF"),
  title: l("What to sort out before you build your website", "Ce pregătești înainte să-ți faci site-ul"),
  intro: l(
    "A short guide for companies and sole traders. What to decide before the first call, which materials to gather, what you pay every year and what to ask any web designer before you pay a deposit.",
    "Un ghid scurt pentru firme și PFA-uri. Afli ce decizi înainte de prima discuție, ce materiale strângi, ce plătești în fiecare an și ce întrebi orice web designer înainte să dai avansul.",
  ),
  cta: l("Get the guide", "Vreau ghidul"),
  insideTitle: l("What's inside", "Ce găsești în ghid"),
  origin: l(
    "I wrote it from the checklist I go through at the start of every project. Fill it in and you'll arrive at any web designer with the answers they need for an accurate quote.",
    "L-am scris din lista pe care o parcurg la începutul fiecărui proiect. Dacă o completezi, ajungi la orice web designer cu răspunsurile de care are nevoie ca să-ți dea o ofertă corectă.",
  ),
  formTitle: l("Where should I send it?", "Unde să-ți trimit ghidul?"),
  formText: l(
    "Leave your name and email and the download link appears right away.",
    "Lasă-mi numele și emailul, iar linkul de descărcare apare imediat.",
  ),
  form: {
    name: l("First name", "Prenume"),
    email: l("Email", "Email"),
    company: l("Company (optional)", "Firma (opțional)"),
    // Ramon to confirm how often he will actually write before publishing.
    tips: l(
      "Also send me tips about websites by email, at most once a month. I'll confirm by email and can unsubscribe at any time.",
      "Trimite-mi și sfaturi despre site-uri pe email, cel mult o dată pe lună. Confirm prin email și mă pot dezabona oricând.",
    ),
    send: l("Get the guide", "Vreau ghidul"),
    sending: l("Sending…", "Se trimite…"),
    subject: l("Guide download — Ramon Bugariu", "Descărcare ghid — Ramon Bugariu"),
    readyTitle: l("Your guide is ready", "Ghidul tău e gata"),
    readyText: l(
      "Download the PDF or read it online. Have questions once you've filled it in? Write to me.",
      "Descarcă PDF-ul sau citește-l online. Ai întrebări după ce îl completezi? Scrie-mi.",
    ),
    download: l("Download the PDF", "Descarcă PDF-ul"),
    read: l("Read it online", "Citește-l online"),
    contact: l("Ask for a quote", "Cere o ofertă"),
    error: l(
      "Your details couldn't be sent. Try again, or download the guide directly:",
      "Datele nu au putut fi trimise. Încearcă din nou sau descarcă ghidul direct:",
    ),
  },

  // The guide itself
  documentTitle: l("What to sort out before you build your website", "Ce pregătești înainte să-ți faci site-ul"),
  documentIntro: l(
    "Go through it with a pen. Every point you can answer saves a round of emails with your web designer and makes the quote more accurate.",
    "Parcurge-l cu un pix în mână. Fiecare punct la care ai răspunsul îți scutește un schimb de emailuri cu web designerul și face oferta mai exactă.",
  ),
  chapters: [
    {
      title: l("What the website has to do", "Ce trebuie să facă site-ul"),
      text: l(
        "A website without one clear action ends up as a brochure. Pick the one thing you want a visitor to do and build everything around it.",
        "Un site fără o acțiune clară ajunge o broșură. Alege un singur lucru pe care vrei să-l facă vizitatorul și construiește totul în jurul lui.",
      ),
      items: [
        l("Pick the main action: a call, a WhatsApp message, a form, a booking or an order.", "Alege acțiunea principală: un telefon, un mesaj pe WhatsApp, un formular, o programare sau o comandă."),
        l("Write down where clients find you today: referrals, Google, Facebook, Instagram, people walking past. The website has to welcome the people who arrive from there.", "Notează de unde vin clienții azi: recomandări, Google, Facebook, Instagram sau oameni care trec pe lângă tine. Site-ul trebuie să-i primească pe cei care vin de acolo."),
        l("Describe in two sentences what you do, for whom and where you work.", "Descrie în două fraze ce faci, pentru cine și în ce zonă lucrezi."),
        l("Note the three questions clients ask you most often. The answers belong on the website.", "Notează cele trei întrebări pe care ți le pun clienții cel mai des. Răspunsurile intră pe site."),
      ],
    },
    {
      title: l("How many pages you need", "Câte pagini îți trebuie"),
      text: l(
        "Start from what your client is looking for. A few complete pages help them more than ten half-empty ones.",
        "Pornește de la ce caută clientul tău. Câteva pagini complete îl ajută mai mult decât zece pagini pe jumătate goale.",
      ),
      items: [
        l("One page is enough when you have one main service, or a few related ones, and mostly want to be contacted.", "O singură pagină ajunge când ai un serviciu principal sau câteva servicii înrudite și vrei mai ales să fii contactat."),
        l("A presentation website with up to five pages (home, services, about, work, contact) fits when each service needs explaining.", "Un site de prezentare cu până la cinci pagini (acasă, servicii, despre, lucrări, contact) se potrivește când fiecare serviciu are nevoie de explicații."),
        l("You need an online store when you want orders and payments to come in through the website.", "Îți trebuie un magazin online când vrei să primești comenzi și plăți direct pe site."),
        l("List the languages you need and who will translate.", "Notează limbile de care ai nevoie și cine face traducerile."),
        l("Pick two or three websites you like and write down exactly what you like about them: the structure, the photos, the colours.", "Alege două-trei site-uri care îți plac și notează exact ce îți place la ele: structura, pozele, culorile."),
      ],
    },
    {
      title: l("The texts", "Textele"),
      text: l(
        "Without texts, the design waits. Write them before you start, even as a rough draft. A web designer can shorten and order them, but only you know what you do and how you work.",
        "Fără texte, designul așteaptă. Scrie-le înainte să începi, chiar și în ciornă. Un web designer le poate scurta și ordona, dar doar tu știi ce faci și cum lucrezi.",
      ),
      items: [
        l("First impression: the business name, one sentence about what you do and what you want the visitor to do.", "Prima impresie: numele afacerii, o frază despre ce faci și ce vrei să facă vizitatorul."),
        l("Services: the list, with a sentence or two for each. Add a starting price if you can.", "Servicii: lista lor, cu una-două fraze la fiecare. Dacă poți, adaugă și un preț de pornire."),
        l("About you: who you are, where you work, since when and why someone can trust you.", "Despre tine: cine ești, unde lucrezi, de când și de ce poate avea un client încredere în tine."),
        l("Proof: photos of your work, reviews, certificates. Only real ones, with the consent of the clients who appear.", "Dovezi: poze cu lucrări, recenzii, certificări. Doar reale, cu acordul clienților care apar."),
        l("Contact: phone, WhatsApp, email, address and opening hours.", "Contact: telefon, WhatsApp, email, adresă și program."),
        l("Footer: the company's legal name, tax ID and registered office.", "Subsol: denumirea legală a firmei, codul fiscal și sediul."),
      ],
    },
    {
      title: l("Photos and logo", "Pozele și logo-ul"),
      text: l(
        "Good photos do more for a website than any effect. Gather them early, as original files.",
        "Pozele bune fac mai mult pentru un site decât orice efect. Strânge-le din timp, în fișierele originale.",
      ),
      items: [
        l("Photos at least 2000 px on the long side, as JPG or PNG. Avoid screenshots and photos sent over WhatsApp, which compresses them.", "Poze de cel puțin 2000 px pe latura lungă, în JPG sau PNG. Evită capturile de ecran și pozele trimise pe WhatsApp, care le comprimă."),
        l("Only photos you have the right to use. Don't take them from Google or other people's websites. People who appear in them must agree.", "Doar poze pe care ai dreptul să le folosești. Nu le lua de pe Google sau de pe site-urile altora. Oamenii care apar în ele trebuie să fie de acord."),
        l("The logo as a vector file (SVG, PDF, AI or EPS). If you don't have one, a PNG with a transparent background, as large as possible.", "Logo-ul în format vector (SVG, PDF, AI sau EPS). Dacă nu ai, un PNG cu fundal transparent, cât mai mare."),
        l("Your brand colours with their codes (for example #D7141E), or a printed piece they can be taken from.", "Culorile firmei, cu codurile lor (de exemplu #D7141E), sau un material tipărit din care se pot lua."),
      ],
    },
    {
      title: l("Domain, hosting and accounts", "Domeniul, găzduirea și conturile"),
      text: l(
        "The domain and the hosting should be in your company's name, in your own accounts, with the web designer working in them as a guest. That way the website stays yours, whoever builds it.",
        "Domeniul și găzduirea trebuie să fie pe numele firmei tale, în conturile tale, iar web designerul lucrează în ele ca invitat. Așa site-ul rămâne al tău, oricine l-ar face.",
      ),
      items: [
        l("Register the domain (your-company.ro) to your company, with an email address you read. Codes and renewal notices go there.", "Înregistrează domeniul (firma-ta.ro) pe firma ta, cu un email pe care îl citești. Acolo vin codurile și avizele de reînnoire."),
        l("Hosting is the server the website lives on. Open that account in your company's name too. Where the provider allows it, invite your web designer as an administrator instead of sharing your password.", "Găzduirea e serverul pe care stă site-ul. Fă și contul acesta pe numele firmei. Unde furnizorul permite, invită-l pe web designer ca administrator în loc să-i dai parola."),
        l("If you already use email on your domain (name@your-company.ro), say so before anyone changes the domain settings, so it keeps working.", "Dacă folosești deja email pe domeniu (nume@firma-ta.ro), spune asta înainte să schimbe cineva setările domeniului, ca emailul să meargă în continuare."),
        l("Turn on two-step sign-in for the domain and hosting accounts.", "Pornește autentificarea în doi pași la contul de domeniu și la cel de găzduire."),
      ],
    },
    {
      title: l("Who updates it after launch", "Cine îl actualizează după lansare"),
      text: l(
        "Decide at the start whether you want to change texts, photos or products yourself. It decides what kind of website you need.",
        "Hotărăște de la început dacă vrei să schimbi singur textele, pozele sau produsele. De asta depinde ce fel de site îți trebuie.",
      ),
      items: [
        l("To edit it yourself you need an admin panel, for example WordPress. It needs paid hosting and regular updates.", "Ca să-l modifici singur, ai nevoie de un panou de administrare, de exemplu WordPress. Are nevoie de găzduire plătită și de actualizări."),
        l("If you change it rarely, a static website loads faster, can run on free hosting and has no plugins to update. Each change goes through your web designer.", "Dacă îl schimbi rar, un site static se încarcă mai repede, poate sta pe o găzduire gratuită și nu are module de actualizat. Fiecare modificare trece prin web designer."),
        l("For a store, decide who uploads products, who handles orders and who deals with returns.", "La magazin, stabilește cine încarcă produsele, cine se ocupă de comenzi și cine de retururi."),
      ],
    },
  ] satisfies Chapter[],

  costsTitle: l("What you pay every year", "Ce plătești în fiecare an"),
  costsText: l(
    "The website itself is a one-off payment. A few costs come back every year. Ask for them in writing before you start.",
    "Site-ul îl plătești o singură dată. Câteva costuri revin în fiecare an. Cere-le în scris înainte să începi.",
  ),
  costs: [
    { item: l("Domain", "Domeniul"), note: l("Every year. Ask for the renewal price, not just the first year's.", "În fiecare an. Întreabă prețul de reînnoire, nu doar pe cel din primul an.") },
    { item: l("Hosting, static website", "Găzduire, site static"), note: l("Can be free, for example on Cloudflare's free plan.", "Poate fi gratuită, de exemplu pe planul gratuit Cloudflare.") },
    { item: l("Hosting, WordPress website", "Găzduire, site WordPress"), note: l("About €50–70 a year.", "Aproximativ 250–350 lei pe an.") },
    { item: l("Hosting, WooCommerce store", "Găzduire, magazin WooCommerce"), note: l("About €80–150 a year.", "Aproximativ 400–750 lei pe an.") },
    { item: l("Email on your domain", "Email pe domeniu"), note: l("Separate from the website, usually paid per address.", "Separat de site, plătit de obicei pentru fiecare adresă.") },
    { item: l("Card payments (store)", "Plăți cu cardul (magazin)"), note: l("A fee on each transaction, charged by the payment provider.", "Un comision la fiecare tranzacție, la procesatorul de plăți.") },
    { item: l("Maintenance", "Întreținere"), note: l("Updates, backups and small changes. Monthly or on request.", "Actualizări, copii de siguranță și mici modificări. Lunar sau la cerere.") },
  ] satisfies Cost[],

  questionsTitle: l("What to ask a web designer before you pay", "Ce întrebi un web designer înainte să plătești"),
  questions: [
    l("Whose name are the domain and the hosting in?", "Pe numele cui sunt domeniul și găzduirea?"),
    l("What will I pay every year after launch?", "Ce plătesc în fiecare an după lansare?"),
    l("What is included in the price and what costs extra?", "Ce e inclus în preț și ce se plătește separat?"),
    l("How many rounds of changes do I get, and what counts as a round?", "Câte runde de modificări am și ce înseamnă o rundă?"),
    l("Who writes the texts?", "Cine scrie textele?"),
    l("Can I change texts and photos myself?", "Pot schimba singur textele și pozele?"),
    l("When does the delivery time start, and what can delay it?", "Când începe termenul de livrare și ce îl poate întârzia?"),
    l("How do I pay: deposit, on delivery, in instalments?", "Cum plătesc: avans, la final, în rate?"),
    l("What do I get at handover: access, files, instructions?", "Ce primesc la predare: accesuri, fișiere, instrucțiuni?"),
    l("If I want to work with someone else in a year, can I take the website with me?", "Dacă peste un an vreau să lucrez cu altcineva, pot lua site-ul cu mine?"),
  ],

  closingTitle: l("When you're ready", "Când ești gata"),
  closingText: l(
    "I build presentation websites and online stores for companies and sole traders, from Timișoara. I work alone, so you talk to the person who designs, builds and launches your website. Send me your answers from this guide and I'll tell you which option fits and what it costs.",
    "Fac site-uri de prezentare și magazine online pentru firme și PFA-uri, din Timișoara. Lucrez singur, așa că vorbești cu omul care îți face designul, construiește site-ul și îl lansează. Trimite-mi răspunsurile din ghid și îți spun ce variantă ți se potrivește și cât costă.",
  ),
  pricesFrom: l("Presentation website from {website} · Online store from {store}", "Site de prezentare de la {website} · Magazin online de la {store}"),
} as const;

/**
 * Show links to the guide: in the built site only once `published` is true; in `npm run dev` always, so the
 * page can be checked locally. Sitemap and noindex follow `published` alone.
 */
export const linkGuide = guide.published || process.env.NODE_ENV === "development";
