// Interface labels (buttons, navigation, form fields…) in both languages.
// Page copy lives in site.ts, services.ts, packages.ts and projects.ts.

import { l } from "./i18n";

export const ui = {
  nav: {
    work: l("Work", "Proiecte"),
    services: l("Services", "Servicii"),
    pricing: l("Pricing", "Prețuri"),
    video: l("Video", "Video"),
    about: l("About", "Despre"),
    contact: l("Contact", "Contact"),
    home: l("home", "acasă"),
    main: l("Main", "Principal"),
    openMenu: l("Open menu", "Deschide meniul"),
    closeMenu: l("Close menu", "Închide meniul"),
    language: l("Language", "Limbă"),
    /** Label of the link to the other language. */
    otherLanguage: l("Română", "English"),
    otherLanguageShort: l("RO", "EN"),
  },
  work: {
    viewCaseStudy: l("View case study", "Vezi studiul de caz"),
    allWork: l("All work", "Toate proiectele"),
    nextProject: l("Next project", "Proiectul următor"),
    year: l("Year", "An"),
    builtWith: l("Built with", "Construit cu"),
    madeWith: l("Made with", "Realizat cu"),
  },
  video: {
    play: l("Play video", "Pornește video"),
    pause: l("Pause video", "Oprește video"),
    error: l("The video couldn’t play. Try again or open the video file.", "Videoul nu a putut fi redat. Încearcă din nou sau deschide fișierul video."),
    openFile: l("Open video file", "Deschide fișierul video"),
    role: l("My role", "Rolul meu"),
    tools: l("Tools", "Unelte"),
  },
  footer: {
    explore: l("Explore", "Explorează"),
    video: l("Video & voice-over", "Video și voice-over"),
    tagline: l("Websites · Online stores · Video & voice-over.", "Site-uri · Magazine online · Video și voice-over."),
    privacy: l("Privacy", "Confidențialitate"),
    taxId: l("Tax ID (CUI)", "CUI"),
    registration: l("Trade Register no.", "Nr. Registrul Comerțului"),
  },
  notFound: {
    title: l("Nothing here", "Nimic aici"),
    back: l("Back to the homepage", "Înapoi la prima pagină"),
  },
  form: {
    name: l("Name", "Nume"),
    email: l("Email", "Email"),
    company: l("Company name", "Denumirea firmei"),
    businessRequest: l("I am requesting this project for a company or sole trader, for business purposes.", "Solicit proiectul în numele unei firme sau al unui PFA, pentru activitatea profesională."),
    services: l("What do you need?", "De ce ai nevoie?"),
    /** An alternative to picking a specific offer. */
    unsure: l("Not sure yet, help me choose", "Nu știu încă, ajută-mă să aleg"),
    budget: l("Budget", "Buget"),
    budgetPlaceholder: l("Choose a range", "Alege un interval"),
    /** Optional, in both forms: where the visitor heard about Ramon (options in site.contact.sources). */
    source: l("How did you hear about me? (optional)", "Cum ai aflat de mine? (opțional)"),
    sourcePlaceholder: l("Choose", "Alege"),
    videoPackage: l("Video length", "Durata videoclipului"),
    videoPackagePlaceholder: l("Choose the length", "Alege durata"),
    videoVoiceover: l("Voice-over for this video", "Voice-over pentru acest video"),
    noVoiceover: l("Without voice-over", "Fără voice-over"),
    packageTotal: l("Package total", "Total pachete"),
    packageTotalNote: l("The written quote confirms the scope and any extras before work starts.", "Oferta scrisă confirmă ce include proiectul și eventualele extraopțiuni, înainte să începem."),
    message: l("Tell me about the project", "Spune-mi despre proiect"),
    messagePlaceholder: l(
      "What does your business do, what do you need and by when? Send a link or reference if you have one.",
      "Ce face afacerea ta, de ce ai nevoie și pentru când? Trimite un link sau un exemplu dacă ai unul.",
    ),
    consent: l("I have read the", "Am citit"),
    consentLink: l("privacy policy", "politica de confidențialitate"),
    send: l("Send message", "Trimite mesajul"),
    sending: l("Sending…", "Se trimite…"),
    sent: l("Thanks, your message is on its way. I'll reply soon.", "Mulțumesc, mesajul a fost trimis. Îți răspund în curând."),
    error: l(
      "The message couldn't be sent. Please try again, or write to me on LinkedIn.",
      "Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-mi pe LinkedIn.",
    ),
    notConfigured: l(
      "The contact form is being set up. Until then, write to me on LinkedIn.",
      "Formularul de contact e în curs de configurare. Până atunci, scrie-mi pe LinkedIn.",
    ),
    subject: l("New project inquiry — Ramon Bugariu", "Cerere nouă de proiect — Ramon Bugariu"),
  },
} as const;
