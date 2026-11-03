# Black Friday 2026 · campania One-Page Express

Pagina campaniei: `https://ramonbugariu.ro/black-friday` (EN: `/en/black-friday`).
Setările sunt în `src/content/blackFriday.ts`: datele, prețurile de campanie, cele 12 locuri, bonusurile și reducerea de 400 lei la Start.
Între 6 și 30 noiembrie se schimbă singure, după ceasul vizitatorului: tile-ul Express de pe homepage devine cel de
Black Friday, iar `/one-page-express` trimite la `/black-friday`. Din 1 decembrie, totul revine la Express.
După 30 noiembrie, pagina trimite singură la `/one-page-express`.

**Înainte de lansare:** prețul Express de după campanie (590 / 500 lei) trebuie aprobat și `express.published` pus pe `true`.
Altfel, pagina de campanie trimite oamenii spre un produs care încă nu e public.

## Oferta, pe scurt

- Preț de Black Friday: **490 lei cu domeniu, 400 lei pe domeniul tău.** Din decembrie, Express costă 590 / 500 lei.
- Comenzile confirmate între 6 și 30 noiembrie primesc patru bonusuri:
  1. profilul firmei pe Google, creat sau aranjat (Maps și Căutare);
  2. un cod QR pentru tipar, care deschide site-ul;
  3. a doua rundă de mici modificări înainte de lansare;
  4. 400 lei reducere la Start în loc de 300, dacă trec la Start în cel mult șase luni.
- 12 locuri: două site-uri pe săptămână, în cele șase săptămâni dintre 9 noiembrie și 18 decembrie.
- **Fără promisiunea de 48 de ore în campanie.** Fiecare comandă își rezervă o săptămână: dacă materialele
  ajung până luni, clientul primește linkul de previzualizare până vineri. Dacă întârzie, trece în prima săptămână liberă.
- Nu scrie „reducere” sau „-17%” la prețul Express și nu tăia 590 lei. Express nu s-a vândut niciodată la 590,
  deci n-ai un preț anterior real. Poți spune, adevărat, că din decembrie prețul devine 590 lei.

**După fiecare comandă confirmată:** mărește `taken` în `blackFriday.ts` și republică site-ul,
ca numărul de locuri să fie mereu adevărat.

**Profilul Google:** clientul trebuie să-ți dea acces de administrator la profil sau să facă el verificarea
(cod prin poștă, telefon sau video). Spune-i asta din prima zi, ca să nu întârzie bonusul.

## Linkuri pentru fiecare canal

Ca să vezi de unde vin cererile, folosește câte un link pe canal:

- Facebook / Instagram: `ramonbugariu.ro/black-friday?utm_source=facebook&utm_campaign=bf2026`
- OLX: `ramonbugariu.ro/black-friday?utm_source=olx&utm_campaign=bf2026`
- WhatsApp: `ramonbugariu.ro/black-friday?utm_source=whatsapp&utm_campaign=bf2026`

## Calendar

| Când | Ce |
| --- | --- |
| Joi, 5 nov | Republici site-ul cu pagina de campanie. Pregătești postările. |
| Vineri, 6 nov | Postarea 1 pe Facebook și Instagram. Anunțul pe OLX. Mesajul pe WhatsApp. |
| Marți, 10 nov | Story cu locurile rămase. |
| Vineri, 13 nov | Postarea 2: ce primești, pe scurt. |
| Vineri, 20 nov | Postarea 3: „Mai sunt X locuri”. |
| Joi, 26 nov | Story: ultimele zile. |
| Vineri, 27 nov | Postarea 4: ultimul weekend. Al doilea mesaj pe WhatsApp, doar către cine a răspuns. |
| Duminică, 29 nov | Story: „Mâine e ultima zi.” |

## Facebook și Instagram

**Postarea 1 · lansarea (6 nov)**

> Black Friday pentru afacerile mici: site-ul tău, online înainte de Crăciun.
>
> One-Page Express e un site de o pagină, gata în săptămâna pe care ți-o rezervi. Prețul de Black Friday e 490 lei, cu domeniul inclus pe primul an. Din decembrie, prețul devine 590 lei.
>
> Dacă comanzi până pe 30 noiembrie, primești în plus:
> • profilul firmei pe Google, aranjat
> • cod QR pentru vitrină și flyere
> • încă o rundă de modificări
> • 400 lei reducere dacă treci mai târziu la un site mai mare
>
> Iau două site-uri pe săptămână, așa că până la sărbători sunt 12 locuri. Fiecare loc e o săptămână.
>
> 👉 ramonbugariu.ro/black-friday

**Postarea 2 · ce primești (13 nov)**

> Ce primești pe o singură pagină: cine ești, ce oferi, poze cu lucrările tale, recenzii și un buton de WhatsApp.
>
> Clientul te găsește, vede ce faci și îți scrie. Atât.
>
> De Black Friday îți fac în plus și profilul de pe Google Maps, ca să te găsească și acolo.
>
> Comenzi până pe 30 noiembrie. Mai sunt [X] locuri.
> 👉 ramonbugariu.ro/black-friday

**Postarea 3 · locurile (20 nov)**

> Mai sunt [X] locuri din 12 pentru site-urile de Black Friday.
>
> Fiecare loc e o săptămână, iar ultima e 14–18 decembrie. Rezervă-ți una acum și ești online până de Crăciun.
>
> 👉 ramonbugariu.ro/black-friday

**Postarea 4 · ultimul weekend (27 nov)**

> Ultimul weekend pentru bonusurile de Black Friday.
>
> Comenzile confirmate până luni, 30 noiembrie, au prețul de 490 lei și primesc profilul Google, codul QR, a doua rundă de modificări și 400 lei reducere la Start.
>
> 👉 ramonbugariu.ro/black-friday

**Stories:** o imagine cu cele 12 casete (bifează locurile ocupate) și textul „Mai sunt X locuri”.
Clipul din `OlxAd` din Remotion poate deveni un story vertical cu același mesaj.

## OLX

**Titlu** (max. 70 caractere):

> Site de o pagină, 490 lei cu domeniu · preț și bonusuri Black Friday

**Descriere:**

> Fac site-uri de o pagină pentru afaceri mici: saloane, service-uri, cabinete, meseriași, fotografi, consultanți.
>
> Ce primești:
> • o pagină cu până la 5 secțiuni: prezentare, servicii, despre tine, lucrări sau recenzii, contact
> • arată bine pe telefon, tabletă și calculator
> • domeniu .ro sau .com pe primul an, pe numele firmei tale
> • găzduire fără cost lunar
> • gata în săptămâna rezervată, dacă textele și pozele ajung până luni
>
> Preț de Black Friday, pentru comenzile confirmate până pe 30 noiembrie: 490 lei cu domeniu inclus, 400 lei dacă ai deja domeniu. Din decembrie, prețul devine 590 lei. Emit factură.
>
> Bonusuri pentru comenzile confirmate până pe 30 noiembrie:
> • profilul firmei pe Google Maps, aranjat
> • cod QR pentru vitrină și flyere
> • a doua rundă de modificări
> • 400 lei reducere dacă treci mai târziu la un site cu mai multe pagini
>
> Iau doar două comenzi pe săptămână. Exemple și detalii: ramonbugariu.ro/black-friday

## WhatsApp

**Mesaj pentru contacte (6 nov)**. Trimite-l doar oamenilor care te cunosc, nu în masă către numere străine:

> Salut! Am pornit o ofertă de Black Friday pentru site-uri de o pagină: 490 lei cu domeniul inclus, gata înainte de Crăciun.
>
> Până pe 30 noiembrie vin cu profilul firmei pe Google, un cod QR și o rundă de modificări în plus. Am doar 12 locuri până la sărbători.
>
> Dacă știi pe cineva care are nevoie de un site, îi poți trimite linkul: ramonbugariu.ro/black-friday

**Răspuns rapid /bf**, când cererea vine de pe pagina de campanie (subiectul emailului începe cu `[Black Friday]`):

> Mulțumesc! Comanda ta intră la oferta de Black Friday: 490 lei cu domeniu (400 lei pe domeniul tău) și cele patru bonusuri: profilul pe Google, codul QR, a doua rundă de modificări și 400 lei reducere la Start în următoarele șase luni.
>
> Săptămânile libere sunt: [săptămânile]. Pe care o vrei? Dacă materialele ajung până luni, ai linkul de previzualizare până vineri. Pentru profilul Google, îmi dai acces de administrator sau, dacă nu ai încă profil, îl facem împreună când îți trimit linkul site-ului.
