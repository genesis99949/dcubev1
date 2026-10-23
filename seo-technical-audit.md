# Audit SEO — Ramon Bugariu

Data: 23 octombrie 2026. Domeniu configurat: https://ramonbugariu.ro.

## Scop și metodă

Opt pagini: homepage, două studii de caz și politica de confidențialitate, fiecare în română și engleză.
Am verificat sursele proiectului și HTML-ul exportat prin build-ul de producție, inclusiv sitemap și robots.txt.
Direcția confirmată de Ramon: site-uri de prezentare și magazine online pentru clienți din România.
„Creare site de prezentare” și „creare magazin online” sunt intențiile de lucru; volumele de căutare și pozițiile nu au fost măsurate.

## Rezultat

În exportul verificat nu am găsit blocaje de indexare pentru cele opt pagini. Am corectat metadatele moștenite
de la homepage și am făcut titlurile proiectelor mai descriptive. Datele structurate identifică persoana,
site-ul și proiectele, cu mențiunea că acestea sunt concepte de portofoliu.

Accesul la domeniul public nu a reușit: instrumentul web nu a putut deschide paginile, iar verificarea HTTP
din acest mediu a returnat o eroare de rezolvare DNS. Aceasta nu dovedește că domeniul este indisponibil
pentru vizitatori. Statusurile HTTP, redirecționările și versiunea publicată rămân de verificat din exterior.

## Cele șase straturi

| Strat | Rezultat și limită |
| --- | --- |
| Acces pentru crawlere | robots.txt permite accesul și indică sitemap.xml; fișierele există în export. Răspunsurile publice nu sunt confirmate. |
| Indexabilitate | Fiecare pagină are canonical propriu și trei alternanțe: ro, en, x-default. Sitemap-ul conține exact cele opt pagini. Nu există noindex pe acestea. Indexarea reală nu este confirmată. |
| Randare | Titlurile, descrierile, conținutul și JSON-LD apar în HTML-ul inițial. Fiecare pagină are un singur H1. |
| Arhitectură | 196 de legături interne verificate în HTML, inclusiv ancore și legături către fișiere; destinațiile există în export. Paginile proiectelor au traseu structurat spre portofoliu. |
| Date structurate | Person, WebSite și WebPage pe homepage; CreativeWork și BreadcrumbList pe proiecte. JSON valid și relații verificate local. Validarea externă Google nu a fost rulată. |
| Experiență și găzduire | Exportul generează pagina 404 cu noindex. Statusul HTTP 404, HTTPS, antetele și Core Web Vitals necesită verificare pe site-ul public. |

## Probleme remediate

- **Titluri de proiect prea generale:** înainte, doar numele brandului; acum includ magazinul online și identitatea/brandingul, în limba paginii.
- **Previzualizări X/Twitter moștenite:** proiectele aveau datele homepage-ului; acum folosesc titlul, descrierea și imaginea proiectului.
- **Previzualizare greșită pentru confidențialitate:** acum are propriile metadate Open Graph și Twitter, inclusiv URL-ul paginii.
- **Metadate Open Graph incomplete pe proiecte:** helper-ul comun păstrează tipul, numele site-ului, limba, dimensiunile și textul alternativ al imaginii.
- **Homepage:** titlul românesc este „Creare site-uri și magazine online | Ramon Bugariu”; descrierea explică oferta și colaborarea directă.
- **Date structurate:** am înlocuit ProfessionalService cu Person pentru portofoliul personal și am adăugat WebSite/WebPage, plus CreativeWork și BreadcrumbList pe proiecte.
- **Limbi:** sitemap-ul include acum și x-default spre versiunea românească, în acord cu HTML-ul.

Textele editoriale ale proiectelor și aspectul paginilor sunt păstrate. Descrierile SEO ale conceptelor sunt
separate de textele din tile-uri. Nu au fost adăugate recenzii, rezultate comerciale, adrese sau clienți inventați.

## Verificări încheiate

- `npm run typecheck`, `npm run lint`, `npm run build`: trecute.
- Opt titluri și opt descrieri distincte; homepage și proiecte au titluri de 46–59 de caractere și descrieri de 146–160.
- Canonical, alternanțe reciproce, limba documentului, Open Graph și Twitter: verificate în toate cele opt pagini.
- Imaginile sociale există; imaginea implicită are dimensiunile declarate, 1200 × 630.
- JSON-LD: prezent pe cele șase pagini de prezentare/proiect, parsează corect și identifică limba și URL-ul paginii.
- Sitemap, referința din robots.txt, legăturile interne și noindex pe 404: verificate local.

## Pașii următori, în ordine

1. Publicarea modificărilor și verificarea externă a răspunsurilor HTTP pentru homepage, proiecte, sitemap, robots și o adresă inexistentă.
2. Verificarea unei singure variante principale de domeniu: www și orice adresă workers.dev trebuie evaluate față de ramonbugariu.ro. Redirecționările vechi /ro sunt configurate, dar nu au fost testate live.
3. În Google Search Console: verificarea proprietății, trimiterea sitemap-ului și inspecția homepage-ului și proiectelor. Nu am avut acces la cont sau date despre indexare.
4. Pagini dedicate serviciilor, cu scopuri distincte pentru „creare site de prezentare” și „creare magazin online”. Conținutul trebuie construit din oferta reală, cu exemple și limite clare; prioritatea se ajustează după datele din Search Console.
5. Măsurarea performanței pe mobil și validarea datelor structurate pe site-ul public. Nu sunt disponibile măsurători Core Web Vitals în acest audit.

## Referințe

- [Google: titluri descriptive și concise](https://developers.google.com/search/docs/appearance/title-link)
- [Google: versiuni lingvistice și hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google: reguli pentru date structurate](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

Implementarea a fost verificată și față de documentația Next.js instalată în proiect: generate-metadata,
sitemap, JSON-LD și export static. Modificările sunt locale; auditul nu include o publicare.
