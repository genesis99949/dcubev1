import { site } from "@/content/site";

export type SendResult = "sent" | "error" | "unconfigured";

/**
 * Sends a form to Web3Forms (a static site has no server of its own). Messages go to the email address
 * the access key was created for; that address never appears on the site.
 */
export async function sendToWeb3Forms(fields: Record<string, unknown>): Promise<SendResult> {
  if (!site.contact.formKey) return "unconfigured";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: site.contact.formKey, from_name: `${site.name} website`, ...fields }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? "sent" : "error";
  } catch {
    return "error";
  }
}
