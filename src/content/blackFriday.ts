// Black Friday campaign for One-Page Express (Ramon's call, 2026-11-02): a campaign price (490 / 400 lei) plus
// bonuses for orders confirmed in November; from December Express goes back to its usual price (590 / 500 lei).
// Never shown as a crossed-out or "reduced" price: Express was never sold at 590, so that would claim a
// reduction that never happened. The copy only says what the price will be from December.
// No 48-hour promise here (Ramon's call, 2026-11-02): twelve orders can't each be built in two days, so every
// place is a week. Ramon takes two sites a week from 9 November to 18 December and delivers within the booked week.
// The campaign has its own landing page (/black-friday) so ads and messages can be measured apart from the
// evergreen Express page. It is always noindex and out of the sitemap; after `end` the page sends visitors
// to the normal Express page by itself (CampaignGate).

import { express } from "./express";
import { l } from "./i18n";

export const blackFriday = {
  id: "black-friday-2026",
  path: "/black-friday",
  /** ISO dates with the Romanian time zone. Orders confirmed in this window get the bonuses. */
  start: "2026-11-06T00:00:00+02:00",
  end: "2026-11-30T23:59:59+02:00",
  /** The homepage tile switches to Black Friday earlier, as a teaser (Ramon's call, 2026-11-03); the offer itself starts at `start`. */
  promoStart: "2026-11-03T00:00:00+02:00",
  /**
   * Two Express orders a week, in the six weeks from 9 Nov to 18 Dec = 12 places. `taken` is updated by hand (and the site
   * redeployed) after each confirmed order, so the count on the page is always true.
   */
  slots: 12,
  taken: 0,
  /** Campaign prices, same shape as express.price / priceOwnDomain (expressPrices() picks them). */
  price: { ro: 490, en: 100 },
  priceOwnDomain: { ro: 400, en: 80 },
  /** Replaces express.upgradeCredit on the campaign page ({credit} in the copy). */
  upgradeCredit: { ro: 400, en: 80 },
  /** Tag added to the form's subject and payload, so Ramon sees which requests came from the campaign. */
  tag: "Black Friday",

  name: l("Black Friday", "Black Friday"),
  metaTitle: l("Black Friday: a one-page website with bonuses", "Black Friday: site de o pagină, cu bonusuri"),
  description: l(
    "One-Page Express for Black Friday: €100 with the domain, four bonuses included, twelve places. Order by 30 November and you're online before Christmas.",
    "One-Page Express de Black Friday: 490 lei cu domeniu, patru bonusuri incluse, douăsprezece locuri. Comanzi până pe 30 noiembrie și ești online înainte de Crăciun.",
  ),

  marquee: [
    l("Black Friday", "Black Friday"),
    l("Online before Christmas", "Online înainte de Crăciun"),
    l("12 places", "12 locuri"),
  ],

  hero: {
    sticker: l("Black Friday · 6–30 November", "Black Friday · 6–30 noiembrie"),
    title: l("Your website, online before Christmas.", "Site-ul tău, online înainte de Crăciun."),
    lead: l(
      "A one-page website, ready in the week you book. Order by 30 November and you get the Black Friday price and four extras.",
      "Un site de o pagină, gata în săptămâna pe care ți-o rezervi. Dacă comanzi până pe 30 noiembrie, ai prețul de Black Friday și patru bonusuri.",
    ),
  },

  bonuses: {
    sticker: l("Included for Black Friday", "Incluse de Black Friday"),
    title: l("Four bonuses, at no extra cost.", "Patru bonusuri, fără cost în plus."),
    lead: l(
      "On top of the Black Friday price, for orders confirmed between 6 and 30 November. Everything else in Express stays the same.",
      "Pe lângă prețul de Black Friday, pentru comenzile confirmate între 6 și 30 noiembrie. Restul pachetului Express rămâne același.",
    ),
    items: [
      {
        title: l("Your Google Business Profile", "Profilul firmei pe Google"),
        text: l(
          "I set up or tidy your profile on Google Maps and Search: hours, photos, services and the link to your new site.",
          "Îți creez sau îți aranjez profilul de pe Google Maps și Căutare: program, poze, servicii și linkul către site-ul nou.",
        ),
      },
      {
        title: l("A QR code for print", "Cod QR pentru tipar"),
        text: l(
          "A QR code that opens your site, ready for your shop window, flyers or business cards.",
          "Un cod QR care deschide site-ul, gata de pus pe vitrină, pe flyere sau pe cărțile de vizită.",
        ),
      },
      {
        title: l("A second round of changes", "A doua rundă de modificări"),
        text: l(
          "Two rounds of minor changes before launch instead of one.",
          "Două runde de mici modificări înainte de lansare, în loc de una.",
        ),
      },
      {
        title: l("{credit} off Start", "{credit} reducere la Start"),
        text: l(
          "If you move to the Start package within six months, I take {credit} off its price instead of the usual credit.",
          "Dacă treci la pachetul Start în cel mult șase luni, scad {credit} din prețul lui, mai mult decât de obicei.",
        ),
      },
    ],
  },

  places: {
    /** {free} and {slots} are filled in. */
    label: l("{free} of {slots} places left", "Mai sunt {free} locuri din {slots}"),
    action: l("Book a place", "Rezervă un loc"),
    note: l(
      "Each place is a week: I take two sites a week, from 9 November to 18 December. The count is updated by hand after each confirmed order.",
      "Fiecare loc înseamnă o săptămână: iau două site-uri pe săptămână, între 9 noiembrie și 18 decembrie. Numărul îl actualizez de mână după fiecare comandă confirmată.",
    ),
  },

  /** Shown first in the FAQ on the campaign page. */
  faq: {
    question: l("How does the Black Friday offer work?", "Cum funcționează oferta de Black Friday?"),
    answer: l(
      "Orders confirmed between 6 and 30 November get the four bonuses, up to twelve orders. The price is €100 with the domain or €80 on your own domain; from December, Express costs €120 and €100. When you order, you book one of the free weeks between 9 November and 18 December, so your site is online before Christmas. The bonuses stay yours even if we move to a later week.",
      "Comenzile confirmate între 6 și 30 noiembrie primesc cele patru bonusuri, până la douăsprezece comenzi. Prețul este 490 lei cu domeniu sau 400 lei pe domeniul tău; din decembrie, Express costă 590 lei, respectiv 500 lei. Când comanzi, îți rezervi una dintre săptămânile libere dintre 9 noiembrie și 18 decembrie, așa că site-ul e online înainte de Crăciun. Bonusurile rămân ale tale și dacă ne mutăm într-o săptămână mai târzie.",
    ),
  },

  /**
   * Replaces the 48-hour wording of the Express page on the campaign page: the hero condition, the build step,
   * the process note, the comparison's timeline, the seal on the Express column and the 48-hour FAQ.
   */
  timing: {
    condition: l(
      "Each order books a week. If your materials arrive by Monday of that week, you get the preview link by Friday. I take at most two sites a week.",
      "Fiecare comandă își rezervă o săptămână. Dacă materialele ajung până luni în săptămâna aceea, primești linkul de previzualizare până vineri. Iau cel mult două site-uri pe săptămână.",
    ),
    build: l("I fit the template with your materials, in the week you booked.", "Potrivesc șablonul cu materialele tale, în săptămâna rezervată."),
    note: l(
      "The preview link comes by Friday of your week, if every material has arrived by Monday. If they come later, we move to the first free week. Publishing follows once the domain is registered or, if you already have one, once I have access to it.",
      "Linkul de previzualizare vine până vineri în săptămâna ta, dacă toate materialele au ajuns până luni. Dacă vin mai târziu, trecem în prima săptămână liberă. Publicarea urmează după ce domeniul e înregistrat sau, dacă ai deja unul, după ce am acces la el.",
    ),
    compare: l("In the week you book", "În săptămâna rezervată"),
    seal: "+4",
    faq: {
      question: l("When is my site ready?", "Când e gata site-ul?"),
      answer: l(
        "In the week you book. When you confirm the order, I tell you which weeks are free between 9 November and 18 December and you pick one. If every material reaches me by Monday of that week, you get the preview link by Friday; I confirm the date in writing before I start.",
        "În săptămâna pe care ți-o rezervi. Când confirmi comanda, îți spun ce săptămâni sunt libere între 9 noiembrie și 18 decembrie și alegi una. Dacă toate materialele ajung la mine până luni în săptămâna aceea, primești linkul de previzualizare până vineri; data ți-o confirm în scris înainte să încep.",
      ),
    },
  },

  /** The homepage tile while the campaign runs (ExpressPromo with `campaign`). Title = hero.title. */
  promo: {
    lead: l(
      "A one-page website at the Black Friday price, with four bonuses. Twelve places, each one a week before the holidays.",
      "Un site de o pagină la preț de Black Friday, cu patru bonusuri. Douăsprezece locuri, fiecare cu săptămâna lui, până la sărbători.",
    ),
    action: l("See the Black Friday offer", "Vezi oferta de Black Friday"),
    /** Before `start` the button links nowhere and says this instead (Ramon's wording, 2026-11-03). */
    teaser: l("Stay tuned! Only 12 places available.", "Fii pe fază! Avem doar 12 locuri disponibile."),
    /** Hand-written note by the price: the usual price from December, never crossed out (see the top of this file). */
    later: l("From December", "Din decembrie"),
  },

  /** Before `start` the campaign page shows only this hero (Ramon's wording, 2026-11-03). */
  soon: {
    title: l("Opening on 6 November!", "Deschidem în 6 noiembrie!"),
  },

  contact: {
    title: l("Book your Black Friday place.", "Rezervă-ți locul de Black Friday."),
  },
  breadcrumb: l("Black Friday", "Black Friday"),
};

/** Whether the campaign has ended at the given time (checked in the browser; the site is static). */
export const blackFridayEnded = (now = Date.now()) => now > Date.parse(blackFriday.end);

/** The prices in force: the Black Friday ones on the campaign page, the usual Express ones elsewhere. */
export const expressPrices = (campaign = false) => (campaign ? blackFriday : express);

/** Whether the campaign is running at the given time. */
export const blackFridayActive = (now = Date.now()) => now >= Date.parse(blackFriday.start) && !blackFridayEnded(now);

/** Whether the homepage shows the Black Friday tile: from `promoStart` until the campaign ends. */
export const blackFridayPromoActive = (now = Date.now()) => now >= Date.parse(blackFriday.promoStart) && !blackFridayEnded(now);
