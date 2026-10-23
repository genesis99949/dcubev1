// Interface labels (buttons, navigation, form fields…) in both languages.
// Page copy lives in site.ts, services.ts, packages.ts and projects.ts.

import { l } from "./i18n";

export const ui = {
  nav: {
    work: l("Work", "Proiecte"),
    services: l("Services", "Servicii"),
    pricing: l("Pricing", "Prețuri"),
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
    playWithSound: l("Play with sound", "Pornește cu sunet"),
    mute: l("Mute sound", "Oprește sunetul"),
    unmute: l("Turn sound on", "Pornește sunetul"),
    soundOn: l("Sound on", "Sunet pornit"),
    soundOff: l("Sound off", "Sunet oprit"),
    error: l("The video couldn’t play. Try again or open the video file.", "Videoul nu a putut fi redat. Încearcă din nou sau deschide fișierul video."),
    openFile: l("Open video file", "Deschide fișierul video"),
    role: l("My role", "Rolul meu"),
    tools: l("Tools", "Unelte"),
  },
  footer: {
    tagline: l("Websites · Online stores.", "Site-uri de prezentare · Magazine online."),
    privacy: l("Privacy", "Confidențialitate"),
  },
  notFound: {
    title: l("Nothing here", "Nimic aici"),
    back: l("Back to the homepage", "Înapoi la prima pagină"),
  },
  form: {
    name: l("Name", "Nume"),
    email: l("Email", "Email"),
    services: l("What do you need?", "De ce ai nevoie?"),
    /** Third answer next to the two services. */
    unsure: l("Not sure yet, help me choose", "Nu știu încă, ajută-mă să aleg"),
    budget: l("Budget", "Buget"),
    budgetPlaceholder: l("Choose a range", "Alege un interval"),
    message: l("Tell me about the project", "Spune-mi despre proiect"),
    messagePlaceholder: l(
      "What does your business do, and when do you need the site? If you already have one, leave me the link.",
      "Ce face afacerea ta și când ai nevoie de site? Dacă ai deja unul, lasă-mi linkul.",
    ),
    consent: l("I agree that my details are used to reply to me. See the", "Sunt de acord ca datele mele să fie folosite ca să primesc răspuns. Vezi"),
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
