// Builds the Brevo email templates (guide double opt-in, welcome, unsubscribe) into docs/emails/*.html.
//
//   node scripts/build-emails.mjs
//
// Paste each file into Brevo → Templates → <template> → Edit → HTML (template ids below). Emails can't use CSS
// variables or color-mix(), so the site's tokens (src/app/globals.css) are written out as hex values here.
// Brevo placeholders: {{ doubleoptin }} = the confirmation link (double opt-in template only).

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/emails");

// BRAND (src/remotion/brand.ts) + the mixes from globals.css, flattened onto paper.
const C = {
  paper: "#F2F1EC",
  ink: "#111110",
  ink2: "#5E5D5B", // --ink-2
  ink3: "#868682", // --ink-3
  tile: "#E7E6E1", // --tile
  hairline: "#D7D6D2", // --hairline on paper
  accent: "#FF4A1C",
};
const SITE = "https://ramonbugariu.ro";
const PDF = `${SITE}/guide/ghid-site-ramon-bugariu.pdf`;
const FONT = "'Inter Tight',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

const text = (size, line, color, weight = 400, extra = "") =>
  `font-family:${FONT};font-size:${size}px;line-height:${line}px;color:${color};font-weight:${weight};${extra}`;

/** The pill button, as a table so Outlook keeps the shape and padding. */
const button = (href, label) => `
<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
  <td bgcolor="${C.ink}" style="background:${C.ink};border-radius:999px;">
    <a href="${href}" target="_blank" style="display:inline-block;padding:15px 30px;${text(17, 20, C.paper, 600)}text-decoration:none;border-radius:999px;">${label}</a>
  </td>
</tr></table>`;

/** The guide, as a rounded tile like the ones on the site. */
const guideTile = (label) => `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.tile}" style="background:${C.tile};border-radius:20px;">
  <tr><td style="padding:28px 28px 30px;">
    <p style="margin:0 0 10px;${text(14, 20, C.ink3, 600)}">Ghid gratuit · PDF</p>
    <p style="margin:0 0 10px;${text(21, 27, C.ink, 600, "letter-spacing:-0.4px;")}">Ce pregătești înainte să-ți faci site-ul</p>
    <p style="margin:0 0 18px;${text(16, 25, C.ink2)}">Ce decizi, ce materiale strângi, ce plătești în fiecare an și ce întrebi un web designer înainte să plătești.</p>
    <a href="${PDF}" target="_blank" style="${text(16, 22, C.ink, 600)}text-decoration:none;">${label} &rsaquo;</a>
  </td></tr>
</table>`;

/** Shared frame: wordmark, content, hairline, small print. */
const layout = ({ title, preheader, body, footer }) => `<!DOCTYPE html>
<html lang="ro">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600&display=swap" rel="stylesheet" type="text/css" />
<style>
  body { margin:0; padding:0; background:${C.paper}; -webkit-text-size-adjust:100%; }
  a { color:${C.ink}; }
  @media only screen and (max-width:620px) {
    .wrap { width:100% !important; }
    .pad { padding:40px 20px !important; }
    .h1 { font-size:34px !important; line-height:38px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.paper}" style="background:${C.paper};">
  <tr><td align="center" class="pad" style="padding:56px 24px 48px;">
    <table role="presentation" class="wrap" width="560" cellspacing="0" cellpadding="0" border="0" style="width:560px;">
      <tr><td style="padding-bottom:56px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
          <td style="${text(18, 22, C.ink, 600, "letter-spacing:-0.4px;")}">Ramon Bugariu</td>
          <td valign="bottom" style="padding:0 0 5px 2px;"><div style="width:5px;height:5px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</div></td>
        </tr></table>
      </td></tr>
${body}
      <tr><td style="padding-top:48px;">
        <div style="border-top:1px solid ${C.hairline};font-size:0;line-height:0;">&nbsp;</div>
        <p style="margin:20px 0 6px;${text(13, 20, C.ink3)}">${footer}</p>
        <p style="margin:0;${text(13, 20, C.ink3)}">Ramon Bugariu · Site-uri și magazine online · Timișoara · <a href="${SITE}" target="_blank" style="color:${C.ink3};">ramonbugariu.ro</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>
`;

const h1 = (copy) => `      <tr><td class="h1" style="padding-bottom:18px;${text(40, 44, C.ink, 600, "letter-spacing:-1.6px;")}">${copy}</td></tr>`;
const lead = (copy, pad = 32) => `      <tr><td style="padding-bottom:${pad}px;${text(18, 28, C.ink2)}">${copy}</td></tr>`;
const row = (html, pad = 40) => `      <tr><td style="padding-bottom:${pad}px;">${html}</td></tr>`;

const EMAILS = [
  {
    // Brevo template #1 "Default Template Double opt-in confirmation"
    file: "1-confirmare.html",
    subject: "Confirmă că vrei sfaturi despre site-uri",
    html: layout({
      title: "Confirmă adresa de email",
      preheader: "Un click și ești pe listă.",
      body: [
        h1("Confirmă adresa de email"),
        lead("Ca să-ți trimit sfaturi despre site-uri, cel mult o dată pe lună, am nevoie de un click de la tine."),
        row(button("{{ doubleoptin }}", "Da, vreau sfaturile"), 48),
        row(guideTile("Descarcă PDF-ul"), 0),
      ].join("\n"),
      footer: "Ai primit acest email pentru că ai cerut ghidul pe ramonbugariu.ro. Dacă nu ai fost tu, ignoră-l: fără un click pe buton nu te adaug pe listă.",
    }),
  },
  {
    // Brevo template #3 "Default template - Final confirmation" (sent after the click)
    file: "3-bun-venit.html",
    subject: "Ești pe listă",
    html: layout({
      title: "Ești pe listă",
      preheader: "Ghidul e mai jos, dacă îl cauți.",
      body: [
        h1("Ești pe listă."),
        lead("Mulțumesc. Îți scriu cel mult o dată pe lună, cu un sfat pe care îl poți folosi pe site-ul tău."),
        row(guideTile("Descarcă PDF-ul")),
        lead("Ai deja o întrebare despre site-ul tău? Răspunde la acest email. Îl citesc eu și îți răspund în 24–48 de ore.", 0),
      ].join("\n"),
      footer: "Te poți dezabona oricând, din linkul aflat în fiecare email cu sfaturi.",
    }),
  },
  {
    // Brevo template #4 "Default template - Unsubscription Follow Up"
    file: "4-dezabonare.html",
    subject: "Te-am scos de pe listă",
    html: layout({
      title: "Te-am scos de pe listă",
      preheader: "Nu mai primești sfaturi de la mine.",
      body: [
        h1("Te-am scos de pe listă."),
        lead("Nu mai primești sfaturi de la mine. Ghidul rămâne al tău."),
        row(guideTile("Descarcă PDF-ul")),
        lead(`Te-ai dezabonat din greșeală? Te poți abona din nou de pe <a href="${SITE}/ghid-site" target="_blank" style="color:${C.ink};">ramonbugariu.ro/ghid-site</a>.`, 0),
      ].join("\n"),
      footer: "Ai primit acest email pentru că te-ai dezabonat de la sfaturile mele.",
    }),
  },
];

fs.mkdirSync(OUT, { recursive: true });
for (const email of EMAILS) {
  fs.writeFileSync(path.join(OUT, email.file), email.html);
  console.log(`✓ docs/emails/${email.file}  (subiect: ${email.subject})`);
}
