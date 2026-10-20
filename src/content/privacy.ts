// Privacy policy (/privacy and /ro/privacy). Plain-language, GDPR-oriented; review it before relying on it.

import { l } from "./i18n";

export const privacy = {
  title: l("Privacy", "Confidențialitate"),
  updated: l("Last updated: October 2026", "Ultima actualizare: octombrie 2026"),
  intro: l(
    "This site belongs to Ramon Bugariu. It collects as little as possible — here is exactly what, and why.",
    "Acest site îi aparține lui Ramon Bugariu. Colectează cât mai puțin posibil — iată exact ce și de ce.",
  ),
  sections: [
    {
      title: l("What I collect", "Ce colectez"),
      text: l(
        "Only what you send through the contact form: your name, email address, the services you're interested in, your budget range and your message. The site uses no cookies, no analytics and no advertising trackers.",
        "Doar ce îmi trimiți prin formularul de contact: numele, adresa de email, serviciile care te interesează, intervalul de buget și mesajul. Site-ul nu folosește cookie-uri, statistici sau trackere de publicitate.",
      ),
    },
    {
      title: l("Why", "De ce"),
      text: l(
        "To reply to your message and, if we decide to work together, to prepare an offer. The legal basis is your consent and the steps you ask for before a contract (GDPR, Art. 6(1)(a) and (b)).",
        "Ca să-ți răspund la mesaj și, dacă decidem să lucrăm împreună, să pregătesc o ofertă. Temeiul legal este consimțământul tău și demersurile pe care le soliciți înaintea unui contract (GDPR, art. 6 alin. (1) lit. a și b).",
      ),
    },
    {
      title: l("Who else handles it", "Cine mai are acces"),
      text: l(
        "Messages from the form are delivered to me by email through Web3Forms (web3forms.com). The site is hosted on Cloudflare, which may process technical data such as IP addresses to deliver and protect the site. Your data is never sold or shared for marketing.",
        "Mesajele din formular îmi ajung pe email prin Web3Forms (web3forms.com). Site-ul este găzduit de Cloudflare, care poate prelucra date tehnice precum adresele IP pentru a livra și proteja site-ul. Datele tale nu sunt vândute și nu sunt folosite pentru marketing.",
      ),
    },
    {
      title: l("How long", "Cât timp"),
      text: l(
        "I keep an inquiry as long as needed to reply and, if we work together, for the duration of the project and any record-keeping the law requires. You can ask me to delete it at any time.",
        "Păstrez o cerere atât cât e nevoie ca să răspund și, dacă lucrăm împreună, pe durata proiectului și a perioadei de arhivare cerute de lege. Îmi poți cere oricând să o șterg.",
      ),
    },
    {
      title: l("Your rights", "Drepturile tale"),
      text: l(
        "You can ask to see, correct or delete your data, withdraw your consent, or object to its use — write to me through the contact form or on LinkedIn. You can also complain to the Romanian data protection authority (ANSPDCP, dataprotection.ro).",
        "Poți cere să vezi, să corectezi sau să ștergi datele tale, să-ți retragi consimțământul sau să te opui folosirii lor — scrie-mi prin formularul de contact sau pe LinkedIn. Poți depune și o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP, dataprotection.ro).",
      ),
    },
  ],
} as const;
