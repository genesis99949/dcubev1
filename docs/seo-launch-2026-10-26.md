# Lansare SEO — 26 octombrie 2026

## Scop și autorizare

Ramon a cerut reorganizarea footer-ului și pornirea planului SEO. A confirmat explicit publicarea întregii
versiuni locale actuale, inclusiv video, prețuri, formular și datele firmei. Această confirmare înlocuiește
starea de lucru „doar local” din auditul și planul inițial.

În lansare intră cele patru pagini noi de serviciu (RO/EN), sitemap-ul cu 12 pagini, linkurile și footer-ul
grupat în Explorează/Servicii/Contact, plus modificările curente ale site-ului și dependența GSAP.
Documentele de contract și celelalte materiale de lucru nu fac parte din conținutul public al site-ului.

## Verificări înainte de lansare

- Typecheck, lint și build de producție: trecute.
- Paginile de servicii: verificate anterior în Chrome la 390/1440 px, inclusiv alegerea pachetelor, formular și limbă; niciun mesaj real trimis.
- Footer: verificat în RO/EN la 375/768/1024/1440 px; trei grupuri, linkuri de serviciu unice, ținte de navigare de minimum 44 px și fără depășire orizontală.
- Capturi footer mobil/desktop: inspectate vizual.
- Mecanism de publicare: GitHub are verificarea reușită „Workers Builds: dcubev1” pentru versiunea existentă. Utilitarul local Cloudflare nu este autentificat; folosim integrarea existentă.
- Bază pentru revenire: commit-ul `2470c79`, confirmat ca punct de pornire al versiunii locale.

## Secvența de publicare

1. Commit al surselor site-ului, dependențelor și documentelor SEO; fără includerea fișierelor locale cu secrete sau a materialelor sursă ignorate.
2. Push pe `origin/main`, care declanșează Workers Builds.
3. Urmărirea verificării Cloudflare din GitHub până la succes sau eroare.
4. Verificare HTTP pe domeniul public: cele patru adrese noi, sitemap, robots și 404.
5. Confirmarea canonical/hreflang, a grupurilor din footer și a celor 12 pagini din sitemap-ul public.

Codex implementează și verifică lansarea; Ramon furnizează accesul la Search Console și confirmă rezultatele
de indexare. Statusurile sunt raportate după verificare, fără a confunda un push reușit cu un deploy reușit.

## Revenire dacă apare o problemă

Dacă build-ul eșuează, nu declarăm site-ul actualizat și corectăm eroarea înainte de a repeta publicarea.
Dacă după deploy paginile principale răspund cu 5xx, legăturile esențiale sunt rupte sau formularul nu se
poate folosi, se pregătește un commit de revert al lansării și se publică prin aceeași integrare.
Nu se rescrie istoricul Git și nu se șterg lucrări locale. Verificarea precedentă Cloudflare rămâne punctul
de comparație; o revenire în producție nu este executată ca simplu test.

## După lansare

- În Search Console: inspecția celor două pagini RO, verificarea sitemap-ului și solicitarea indexării dacă este necesar.
- Punct de pornire: 5 clicuri și 15 afișări în captura oferită de Ramon; interogările nu sunt disponibile.
- Urmărim afișările și clicurile pe serviciile publicate, pentru România, separat pe pagini și dispozitive.
- Revizuim conținutul pe baza interogărilor reale, când există suficiente date. Nu a fost configurată o automatizare recurentă.
- Detaliile și harta intențiilor: `seo-plan-2026-10-26.md` și `seo-keywords-2026-10-26.csv`.
