# Verificare juridică a site-ului · 23 octombrie 2026

## Implementat în proiect

- Prestator: BUGARIU RAMON-DAVID PERSOANĂ FIZICĂ AUTORIZATĂ; CUI 55131615.
- Nr. Registrul Comerțului F2026034188004; EUID ROONRC.F2026034188004, furnizat de Ramon.
- Contact profesional public: contact@ramonbugariu.ro. Emailul personal rămâne privat.
- Neplătitor de TVA; mențiune lângă prețuri, în română și engleză.
- Politica de confidențialitate identifică PFA-ul și include datele formularului, scopuri și temeiuri distincte, destinatari, transferuri, criterii de păstrare, drepturi și resurse oficiale.
- Bifa formularului confirmă citirea informării. Prelucrarea unei solicitări nu este prezentată ca acord pentru marketing.

## De rezolvat înainte de a considera verificarea încheiată

- **Adresa prestatorului:** Ramon nu dorește publicarea străzii. Adresa nu este inclusă în surse sau în acest document. Legea 365/2002, art. 5 alin. (1) lit. b cere domiciliul sau sediul prestatorului. Doar localitatea sau afișarea CUI nu înlocuiesc această informație. E nevoie de o soluție juridică pentru publicarea sediului; nu presupunem o excepție pentru sediul la domiciliu.
- **Tipurile de clienți:** Ramon a ales colaborări exclusiv cu firme și PFA-uri pentru activitatea lor profesională. Mențiunea apare la prețuri și în formular; denumirea entității și confirmarea scopului profesional sunt obligatorii. Înaintea contractării se verifică entitatea și scopul real al proiectului. O simplă bifă nu schimbă statutul juridic real al unui client. Modelul de contract este în `docs/contract-website-b2b.md`.
- **ANPC/SAL:** stabilirea aplicabilității și implementarea informării pe homepage. Faptul că site-ul nu are checkout nu exclude automat regulile pentru publicitatea serviciilor. Nu se adaugă vechiul link SOL: platforma europeană a fost desființată.
- **Furnizorii efectivi:** confirmarea furnizorului de email și a configurației Web3Forms/Cloudflare, acordurilor de prelucrare aplicabile și garanțiilor pentru transferuri. Politicile publice ale furnizorilor nu dovedesc singure configurația contului.
- **Păstrarea datelor:** stabilirea și aplicarea unui calendar de ștergere pentru cereri și mesaje, separat de arhivarea documentelor impusă de lege; verificarea setărilor și copiilor la furnizori. Nu a fost inventată o perioadă internă fixă.
- **Site-ul publicat:** verificarea cererilor de rețea, cookie-urilor și eventualelor integrări activate din Cloudflare. În cod nu sunt integrate statistici sau trackere publicitare, iar media actuală este găzduită local; suportul Vimeo nu are intrări active.
- **Condițiile colaborării:** modelul B2B din `docs/contract-website-b2b.md` include anexă de specificații, plată 50/50 la lansare, revizii, responsabilități, proprietate intelectuală, încetare și administrare. Este un proiect de contract, de completat și verificat juridic înainte de prima semnare. Acordul art. 28 GDPR rămâne separat și trebuie adaptat proiectului înainte de acces la date reale.

Aceste modificări sunt locale și nu certifică îndeplinirea tuturor obligațiilor. Nu s-a făcut deploy.

## Verificare tehnică

- `npm run typecheck`, `npm run lint` și `npm run build`: trecute.
- Paginile `/`, `/en`, `/privacy`, `/en/privacy`: verificate în exportul generat, la 1280 px și 390 px; datele PFA, contactul și textele localizate sunt prezente, fără depășire orizontală.
- Verificate vizual footerul, politica, zona de prețuri și formularul B2B pe mobil. Trimiterea a fost simulată în ambele limbi: confirmarea profesională este obligatorie, iar denumirea entității și confirmarea ajung în payload. Niciun mesaj nu a fost trimis către Web3Forms.

## Surse consultate

- [Legea 365/2002, art. 5](https://legislatie.just.ro/Public/DetaliiDocumentAfis/288595)
- [GDPR, în special art. 6, 12–22, 28 și 44–49](https://eur-lex.europa.eu/legal-content/RO/TXT/?uri=CELEX%3A32016R0679)
- [OUG 34/2014, art. 2, 6, 8–16](https://legislatie.just.ro/Public/DetaliiDocument/158913)
- [ONRC, formatul numărului de înregistrare](https://www.onrc.ro/index.php/ro/home?id=329)
- [Legea 506/2004, art. 4](https://legislatie.just.ro/Public/DetaliiDocument/172094)
- [Ordinul ANPC 72/2010](https://legislatie.just.ro/Public/DetaliiDocument/167115) și modificările ulterioare aplicabile
- [Ordinul ANPC 270/2026, SAL](https://legislatie.just.ro/Public/DetaliiDocument/310590)
- [Desființarea platformei SOL, Regulamentul (UE) 2024/3228](https://eur-lex.europa.eu/eli/reg/2024/3228/oj)
- [Web3Forms: confidențialitate](https://web3forms.com/privacy) și [acord de prelucrare](https://web3forms.com/dpa)
- [Cloudflare: acord de prelucrare](https://www.cloudflare.com/cloudflare-customer-dpa/)
