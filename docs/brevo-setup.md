# Brevo pentru ghidul gratuit · pașii din contul tău

Formularul ghidului (`/ghid-site`) trimite către Brevo doar oamenii care bifează „Trimite-mi și sfaturi pe email”.
Brevo le trimite un email de confirmare (double opt-in) și îi adaugă în listă doar după ce dau click.
Ghidul îl primesc toți, imediat, pe pagină. Pe tine te anunță în continuare Web3Forms.

Site-ul nu folosește cheia API Brevo: trimite datele la formularul tău Brevo, a cărui adresă e publică oricum.

**Stare (3 noiembrie 2026):** pașii 1–5 sunt făcuți. Contul se numește „Ramon Bugariu”, lista „Sfaturi site (ghid)” (#3),
formularul „Ghid site - sfaturi pe email” (double opt-in, doar câmpul EMAIL), domeniul `ramonbugariu.ro` autentificat
(TXT `brevo-code`, CNAME `brevo1/brevo2._domainkey`, DNS only, în Cloudflare), expeditorul
`Ramon Bugariu <contact@ramonbugariu.ro>` verificat. Emailurile (șabloanele #1 confirmare, #3 bun venit, pornit după click, #4 dezabonare) vin din
`node scripts/build-emails.mjs` → `docs/emails/`, sunt în română, în stilul site-ului, trimise de pe `contact@ramonbugariu.ro`.
După o schimbare, lipește HTML-ul în Brevo → Templates → șablon → Edit.
Rămâne: adresa din subsolul emailurilor de marketing.

## 1. Contul

- [ ] Fă-ți cont pe brevo.com, pe planul gratuit, pe numele PFA-ului.
- [ ] Pornește autentificarea în doi pași (Setări → Securitate).

## 2. Expeditorul și domeniul

Ca emailurile să nu ajungă în spam, trimite de pe `contact@ramonbugariu.ro`, nu de pe Gmail.

- [ ] Senders, Domains & Dedicated IPs → Domains → adaugă `ramonbugariu.ro`.
- [ ] Brevo îți dă câteva înregistrări DNS (cod Brevo, DKIM, DMARC). Pune-le în Cloudflare → ramonbugariu.ro → DNS.
  Dacă ai deja o înregistrare DMARC, nu adăuga a doua: spune-mi și o potrivim.
- [ ] Senders → adaugă expeditorul „Ramon Bugariu” `<contact@ramonbugariu.ro>` și confirmă-l.

## 3. Lista

- [ ] Contacts → Lists → listă nouă: **Sfaturi site (ghid)**.

## 4. Formularul

- [ ] Contacts → Forms → formular nou, legat de lista de mai sus.
- [ ] Câmpuri: **EMAIL** (obligatoriu) și **FIRSTNAME / PRENUME**. Fără alte câmpuri obligatorii.
- [ ] Fără reCAPTCHA (site-ul are deja capcana lui pentru boți; cu reCAPTCHA, trimiterea de pe site nu merge).
- [ ] Confirmare: alege **Double confirmation (double opt-in)**. Ca pagină de după confirmare poți pune
  `https://ramonbugariu.ro/ghid-site/document`.
- [ ] Emailul de confirmare: scrie-l în română, scurt. De exemplu: „Confirmă că vrei sfaturi despre site-uri de la mine.
  Ghidul îl ai deja; dacă l-ai pierdut, e aici: [link].” Linkul PDF: `https://ramonbugariu.ro/guide/ghid-site-ramon-bugariu.pdf`.
- [ ] Share → **Embed** → copiază codul HTML și trimite-mi-l (sau doar adresa din `action="https://…sibforms.com/serve/…"`
  și numele câmpurilor). Nu conține nicio parolă.

## 5. După ce îmi trimiți codul

Eu pun adresa în site (`NEXT_PUBLIC_BREVO_FORM_URL` sau direct în `src/content/guide.ts`), verific numele câmpurilor
și fac un test cu adresa ta. Tu confirmi că:

- [ ] a venit emailul de confirmare;
- [ ] după click, contactul apare în lista **Sfaturi site (ghid)**.

## 6. Mai târziu: seria de emailuri

În Automations poți face o serie pentru cei din listă (de exemplu: un sfat după 3 zile, un exemplu după o săptămână,
oferta după două săptămâni). Te ajut să scrii textele. Fiecare email are link de dezabonare, pus automat de Brevo.
