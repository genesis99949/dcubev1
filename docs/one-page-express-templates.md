# One-Page Express — arhitectura șabloanelor WordPress (plan)

> **Depășit (27 oct 2026):** Express se face în HTML static, găzduit gratuit pe Cloudflare în contul clientului,
> cu domeniul inclus pe primul an. Planul WordPress de mai jos rămâne doar ca referință (de ex. pentru Start).

Document de planificare, 27 octombrie 2026. Nu este încă implementat. Scop: 2 șabloane (servicii locale;
freelanceri și profesioniști) pe care le adaptezi la un client în **3–4 ore de lucru efectiv**, astfel încât
termenul de 48 de ore (două zile lucrătoare) să fie realist și cu marjă.

## Principii

1. **O singură temă, mai multe „rețete”.** Nu două teme separate: o temă bloc (Full Site Editing) cu
   variații de stil și seturi de patternuri. Un bug reparat o dată e reparat pentru toți clienții noi.
2. **Fără page builder.** Doar Gutenberg nativ (blocuri core). Mai puțin JavaScript, mai puține actualizări,
   clientul editează în editorul standard.
3. **Design din `theme.json`, nu din CSS ad-hoc.** Culorile, fonturile, spațierea și lățimile se schimbă dintr-un
   singur loc; clientul nu poate „strica” designul din editor.
4. **Minim de module.** Fiecare modul în plus = actualizări, risc de securitate, timp de suport neplătit.
5. **Conținutul intră după o listă fixă.** Viteza vine din materialele complete, nu din grabă la construcție.

## Structura temei

```
rb-onepage/                       Tema bloc (proprie, versionată în git)
  theme.json                      Tokeni: paletă (5 culori), 2 fonturi, scară tipografică, spațiere, lățimi
  styles/                         Variații de stil (theme.json parțiale), alese per client:
    calm.json                     ex. fundal deschis, accent discret
    contrast.json                 ex. fundal închis
    cald.json                     ex. tonuri calde pentru servicii locale
  templates/
    front-page.html               Pagina unică: header + patternurile + footer
    page.html, 404.html           Pagini legale (confidențialitate) și 404
  parts/
    header.html                   Logo + meniu ancore + buton CTA (sticky simplu, CSS)
    footer.html                   Datele firmei (denumire, CUI, nr. Reg. Com.), linkuri legale
  patterns/                       Câte 1–3 variante pentru fiecare secțiune (PHP cu header de pattern)
    hero-*.php                    Titlu, frază, CTA principal (telefon / WhatsApp / formular), imagine
    services-*.php                Grilă de 3–6 servicii sau beneficii
    about-*.php                   Text + imagine, opțional cifre reale
    gallery-*.php, reviews-*.php  Galerie de lucrări sau recenzii reale (niciodată inventate)
    contact-*.php                 Buton WhatsApp, telefon, email, adresă, hartă opțională, formular
  functions.php                   Doar: încărcare fonturi locale, dezactivare emoji/embeds, categorii de patternuri
  assets/fonts/                   Fonturi găzduite local (fără Google Fonts la rulare, mai bine pentru GDPR și viteză)
```

**Cele două șabloane** sunt combinații de patternuri plus o variație de stil implicită:

| Șablon | Hero | Secțiunea 2 | Secțiunea 3 | Secțiunea 4 | Contact |
| --- | --- | --- | --- | --- | --- |
| Servicii locale | `hero-local` (telefon + WhatsApp vizibile, zona deservită) | `services-grid` | `about-split` | `gallery-grid` sau `reviews-cards` | `contact-map` |
| Freelanceri și profesioniști | `hero-person` (portret, specializare) | `services-list` | `about-story` | `work-grid` | `contact-form` |

Fiecare șablon e salvat ca **conținut de pornire** al paginii principale (un fișier `.html` exportat sau un pattern
„pagină întreagă” din categoria `rb-onepage/starter`), cu texte-model clar marcate ca exemplu.

## Câmpurile de conținut (ce ceri clientului)

O singură listă, aceeași pentru ambele șabloane. Se poate trimite ca formular de preluare sau ca document:

- Identitate: denumirea firmei, CUI, nr. Reg. Com., logo (SVG/PNG), 1–2 culori dacă există.
- Hero: titlul dorit (sau ce face firma într-o frază), acțiunea principală (sună / WhatsApp / ofertă).
- Servicii: 3–6 servicii, fiecare cu titlu + 1–2 fraze, opțional preț „de la”.
- Despre: 60–150 de cuvinte, o fotografie.
- Galerie / lucrări / recenzii: 4–12 imagini cu drept de utilizare **sau** recenzii reale cu acordul autorilor.
- Contact: telefon, număr WhatsApp, email, adresă/zonă, program.
- Domeniu și găzduire: acces (sau decizia de cumpărare), pentru publicare.

Materiale incomplete = termenul nu pornește (așa cum scrie pe pagină). Reutilizează și
`docs/checklist-client-website.md` pentru verificarea de dinainte de start.

## Module (setul minim)

| Nevoie | Recomandare | De ce |
| --- | --- | --- |
| Formular | Un singur modul de formulare, ușor, cu anti-spam (honeypot / Turnstile) | Fără module grele cu zeci de add-on-uri |
| SEO de bază | Titlu și descriere din temă sau un modul SEO minimal | Câmpuri simple, sitemap nativ WordPress |
| Cache | Cel oferit de găzduire, dacă există | Nimic în plus de configurat |
| Copii de siguranță | Ale găzduirii; altfel un modul de backup | Necesar înainte de predare |
| WhatsApp | Link `https://wa.me/<număr>` în buton, fără modul | Zero JavaScript |

De evitat: page builders, sliders, module de animații, module „all-in-one”.

## Fluxul de livrare (ținta: 3–4 ore)

1. **Pregătire (în afara celor 48h):** comanda confirmată, materialele verificate cu lista de mai sus.
2. **Instalare (15–20 min):** WordPress pe un mediu de staging al tău, tema + modulele minime, prin WP-CLI
   dintr-un script (`wp core install`, `wp theme activate`, `wp plugin install`, setări permalinks/limbă).
3. **Stil (15–30 min):** alegi variația de stil, setezi culorile clientului în `theme.json` (Site Editor → Styles).
4. **Conținut (1,5–2 h):** inserezi conținutul de pornire al șablonului, înlocuiești textele și imaginile
   (comprimate înainte, WebP, max. ~2000 px).
5. **Verificare (30 min):** telefon + desktop, formular testat, titlu/descriere, ierarhia titlurilor, linkuri,
   contrast, viteză (Lighthouse).
6. **Previzualizare:** link de staging către client → o rundă de mici modificări.
7. **Publicare:** migrare pe găzduirea clientului (modul de migrare sau WP-CLI), SSL, verificare finală, predare
   cu datele de acces și un ghid scurt de editare.

## Versionare și întreținere

- Tema într-un depozit git propriu, cu versiuni (`1.0.0`, `1.1.0`…). Fiecare client primește o versiune fixă.
- Un singur „site demo” pe staging pentru fiecare șablon: servește ca demo public pe pagina One-Page Express
  (după ce există, completează `templates.items[].demo` în `src/content/express.ts`) și ca bază de test.
- Demo-urile folosesc conținut fictiv **marcat ca demo**, niciodată prezentat ca un client real.

## Alternativa HTML (la cerere)

Pentru clienții care nu au nevoie de panou de administrare: aceleași secțiuni, export static (HTML/CSS) din
aceeași bază de design, găzduit gratuit (ex. Cloudflare Pages pe contul clientului). Avantaj: fără actualizări,
foarte rapid. Dezavantaj: orice modificare trece prin tine (cotată separat).

## Întrebări deschise pentru Ramon

- Câte proiecte Express pe săptămână poți accepta fără să întârzii Start / Personalizat?
- Plata la Express: 100% la confirmare sau 50/50, ca la celelalte pachete?
- Prețul pentru o secțiune în plus și pentru administrarea lunară (acum „stabilit separat”).
- Ce găzduire recomanzi clienților care nu au una (pentru FAQ și pentru scriptul de migrare)?
