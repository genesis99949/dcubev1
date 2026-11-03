import { guide } from "@/content/guide";

/**
 * Subscribes someone to Ramon's Brevo list through his Brevo form (Brevo → Contacts → Forms), so no API key ever
 * reaches the browser. Brevo then sends its double opt-in email; the contact joins the list only after confirming.
 * The request is sent "no-cors": the browser can't read Brevo's reply, so it can't fail the visitor's download.
 * Does nothing until `guide.brevo.formUrl` is set. Setup steps: docs/brevo-setup.md.
 */
export async function subscribeToBrevo({ email, firstName, lang }: { email: string; firstName: string; lang: string }) {
  const { formUrl, fields } = guide.brevo;
  if (!formUrl) return;
  const body = new FormData();
  body.set(fields.email, email);
  if (fields.firstName) body.set(fields.firstName, firstName);
  body.set("locale", lang);
  body.set("html_type", "simple");
  // Brevo's own spam trap: real people leave it empty.
  body.set("email_address_check", "");
  try {
    await fetch(formUrl, { method: "POST", mode: "no-cors", body });
  } catch {
    // Network trouble: the Web3Forms copy still tells Ramon who asked for tips.
  }
}
