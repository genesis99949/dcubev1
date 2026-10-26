// Privacy policy (/privacy and /en/privacy). Outstanding operational/legal checks: docs/website-legal-review.md.

import { l } from "./i18n";

export const privacy = {
  title: l("Privacy", "Confidențialitate"),
  updated: l("Last updated: 23 October 2026", "Ultima actualizare: 23 octombrie 2026"),
  intro: l(
    "Here is how I use the data you send me and the technical data needed to operate this site.",
    "Aici găsești cum folosesc datele pe care mi le trimiți și datele tehnice necesare funcționării site-ului.",
  ),
  controllerTitle: l("Data controller and contact", "Operatorul de date și contact"),
  sections: [
    {
      title: l("What I collect", "Ce colectez"),
      text: l(
        "The contact form sends your company or sole trader name, your name, email address and message, together with any service, package or budget you select, the form language and your confirmation of a business inquiry. Company or sole trader name, your name, email, message and the business confirmation are required to handle inquiries for professional projects. Service and budget selections are optional. Technical providers also receive connection data, such as your IP address, browser information and request time, to deliver and protect the site and the form.",
        "Formularul de contact trimite denumirea firmei sau a PFA-ului, numele tău, adresa de email și mesajul, împreună cu serviciul, pachetul sau bugetul pe care le alegi, limba formularului și confirmarea scopului profesional. Denumirea firmei sau a PFA-ului, numele, emailul, mesajul și confirmarea scopului profesional sunt obligatorii pentru gestionarea cererilor de proiecte profesionale. Alegerea serviciului și a bugetului este opțională. Furnizorii tehnici primesc și date de conexiune, precum adresa IP, informații despre browser și momentul cererii, pentru a livra și proteja site-ul și formularul.",
      ),
    },
    {
      title: l("Why", "De ce"),
      text: l(
        "I use your data to answer your inquiry and prepare an offer. When you request steps towards a contract with you, the basis is GDPR Art. 6(1)(b). For correspondence with a business representative and other inquiries, the basis is my legitimate interest in handling professional correspondence, under Art. 6(1)(f). Site security and spam prevention also rely on legitimate interests in protecting the service. Any legally required record-keeping relies on Art. 6(1)(c). The form checkbox confirms that you have read this notice; it is not consent for marketing.",
        "Folosesc datele ca să răspund cererii tale și să pregătesc o ofertă. Când soliciți demersuri pentru un contract cu tine, temeiul este art. 6 alin. (1) lit. b din GDPR. Pentru corespondența cu reprezentantul unei firme și alte întrebări, temeiul este interesul meu legitim de a gestiona corespondența profesională, conform art. 6 alin. (1) lit. f. Securitatea site-ului și prevenirea spamului se bazează tot pe interesul legitim de a proteja serviciul. Arhivarea impusă de lege se bazează pe art. 6 alin. (1) lit. c. Bifa formularului confirmă că ai citit această informare; nu reprezintă acord pentru marketing.",
      ),
    },
    {
      title: l("Who else handles it", "Cine mai are acces"),
      text: l(
        "Web3Forms (Web3Creative) processes submissions and forwards them to my email provider. Cloudflare hosts and protects the site. Their technical and anti-spam subcontractors may also process data. I do not sell your data or use it for marketing.",
        "Web3Forms (Web3Creative) prelucrează mesajele și le transmite furnizorului meu de email. Cloudflare găzduiește și protejează site-ul. Și subcontractanții lor tehnici și anti-spam pot prelucra date. Nu vând datele tale și nu le folosesc pentru marketing.",
      ),
    },
    {
      title: l("Processing outside the EEA", "Prelucrarea în afara SEE"),
      text: l(
        "Web3Creative operates from India; Cloudflare uses global infrastructure. Data may leave the European Economic Area. The providers' data processing agreements describe transfer safeguards, including Standard Contractual Clauses, and are linked below.",
        "Web3Creative operează din India, iar Cloudflare folosește infrastructură globală. Datele pot ajunge în afara Spațiului Economic European. Acordurile furnizorilor, accesibile mai jos, descriu garanțiile pentru transferuri, inclusiv clauzele contractuale standard.",
      ),
    },
    {
      title: l("How long", "Cât timp"),
      text: l(
        "I keep correspondence while handling your inquiry and any resulting offer or project. Further retention depends on applicable record-keeping duties and any need to establish, exercise or defend legal claims. You can request deletion; legal obligations may limit it. Web3Forms states a submission retention limit of three years, subject to its plan and deletion settings.",
        "Păstrez corespondența cât timp gestionez cererea ta și oferta sau proiectul rezultat. Păstrarea ulterioară depinde de obligațiile legale de arhivare și de necesitatea constatării, exercitării sau apărării unor drepturi. Poți solicita ștergerea; obligațiile legale o pot limita. Web3Forms declară o limită de păstrare de trei ani, în funcție de plan și setările de ștergere.",
      ),
    },
    {
      title: l("Your rights", "Drepturile tale"),
      text: l(
        "Under the conditions set by GDPR, you can request access, rectification, erasure, restriction of processing and data portability. You can object to processing based on legitimate interests. Use the email address above to exercise your rights, request details of transfer safeguards or ask about this notice. I normally respond within one month; GDPR allows an extension for complex or numerous requests, with notice. You can also complain to ANSPDCP, the Romanian supervisory authority, or another competent supervisory authority.",
        "În condițiile prevăzute de GDPR, poți solicita accesul la date, rectificarea, ștergerea, restricționarea prelucrării și portabilitatea. Te poți opune prelucrării bazate pe interes legitim. Folosește adresa de email de mai sus pentru exercitarea drepturilor, detalii despre garanțiile transferurilor sau întrebări despre această informare. Răspund, de regulă, în cel mult o lună; GDPR permite prelungirea pentru cereri complexe sau numeroase, cu informarea ta. Poți depune o plângere la ANSPDCP sau la o altă autoritate de supraveghere competentă.",
      ),
    },
    {
      title: l("Cookies and automated decisions", "Cookie-uri și decizii automate"),
      text: l(
        "The site does not integrate audience analytics or advertising trackers. Technical providers may use cookies strictly necessary for security. The site does not profile you or make automated decisions with legal or similarly significant effects on you.",
        "Site-ul nu integrează servicii de analiză a audienței sau trackere publicitare. Furnizorii tehnici pot folosi cookie-uri strict necesare pentru securitate. Site-ul nu creează profiluri despre tine și nu ia decizii automate care să producă efecte juridice sau efecte similare semnificative asupra ta.",
      ),
    },
  ],
  resourcesTitle: l("Providers and supervisory authority", "Furnizori și autoritatea de supraveghere"),
  resources: [
    { label: l("Web3Forms privacy policy", "Politica de confidențialitate Web3Forms"), href: "https://web3forms.com/privacy" },
    { label: l("Web3Forms data processing agreement", "Acordul de prelucrare a datelor Web3Forms"), href: "https://web3forms.com/dpa" },
    { label: l("Cloudflare data processing addendum", "Acordul de prelucrare a datelor Cloudflare"), href: "https://www.cloudflare.com/cloudflare-customer-dpa/" },
    { label: l("ANSPDCP, the Romanian data protection authority", "ANSPDCP, autoritatea pentru protecția datelor"), href: "https://www.dataprotection.ro/" },
  ],
} as const;
