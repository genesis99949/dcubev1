"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { localePath, tr, type L, type Lang } from "@/content/i18n";
import { packages } from "@/content/packages";
import { SERVICES, serviceLabel, type Service } from "@/content/services";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import styles from "./ContactForm.module.css";
import { PACKAGE_EVENT } from "./events";


type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

/**
 * Project inquiry form. Messages are delivered by Web3Forms (a static site has no server of its own)
 * to the email address the access key was created for — that address never appears on the site.
 */
/** One answer to "What do you need?": a service, or "not sure yet". */
type Choice = Service | "unsure";

export function ContactForm({ lang }: { lang: Lang }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [packageId, setPackageId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  // A package picked in the pricing section pre-fills its service.
  useEffect(() => {
    const onPackage = (e: Event) => {
      const pkg = packages.find((p) => p.id === (e as CustomEvent<string>).detail);
      if (!pkg) return;
      setPackageId(pkg.id);
      setChoice(pkg.service);
    };
    window.addEventListener(PACKAGE_EVENT, onPackage);
    return () => window.removeEventListener(PACKAGE_EVENT, onPackage);
  }, []);

  const options: { value: Choice; label: L }[] = [
    ...SERVICES.map((s) => ({ value: s.name, label: s.label })),
    { value: "unsure", label: ui.form.unsure },
  ];

  // Picking another answer by hand drops a package that no longer matches it.
  const pick = (value: Choice) => {
    setChoice(value);
    if (packages.find((p) => p.id === packageId)?.service !== value) setPackageId(null);
  };

  const chosenPackage = packages.find((p) => p.id === packageId);
  /** "Online store · Start" — the service and tier of the picked package. */
  const packageName = (target: Lang) =>
    chosenPackage ? `${tr(serviceLabel(chosenPackage.service), target)} · ${tr(chosenPackage.name, target)}` : "";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!site.contact.formKey) {
      setStatus("unconfigured");
      return;
    }
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.contact.formKey,
          subject: tr(ui.form.subject, lang),
          from_name: `${site.name} website`,
          name: form.get("name"),
          email: form.get("email"),
          services: choice ? tr(options.find((o) => o.value === choice)!.label, "en") : "—",
          package: packageName("en") || "—",
          budget: form.get("budget") || "—",
          message: form.get("message"),
          language: lang,
          botcheck: form.get("botcheck") ? true : "",
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!data.success) throw new Error("Web3Forms rejected the message");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className={styles.done} role="status">
        {tr(ui.form.sent, lang)}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>{tr(ui.form.name, lang)}</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span>{tr(ui.form.email, lang)}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <fieldset className={styles.field}>
        <legend>
          {tr(ui.form.services, lang)}
          {chosenPackage ? <em className={styles.package}> · {packageName(lang)}</em> : null}
        </legend>
        <div className={styles.chips}>
          {options.map((o) => (
            <label key={o.value} className={styles.chip} data-on={choice === o.value}>
              <input type="radio" name="service" checked={choice === o.value} onChange={() => pick(o.value)} />
              {tr(o.label, lang)}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span>{tr(ui.form.budget, lang)}</span>
        <select name="budget" defaultValue="">
          <option value="" disabled>
            {tr(ui.form.budgetPlaceholder, lang)}
          </option>
          {site.contact.budgets.map((b) => (
            <option key={b.en} value={tr(b, lang)}>
              {tr(b, lang)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>{tr(ui.form.message, lang)}</span>
        <textarea name="message" rows={5} required placeholder={tr(ui.form.messagePlaceholder, lang)} />
      </label>

      {/* Spam trap: invisible to people, filled in by bots. */}
      <input type="checkbox" name="botcheck" className={styles.trap} tabIndex={-1} autoComplete="off" aria-hidden />

      <label className={styles.consent}>
        <input type="checkbox" required />
        <span>
          {tr(ui.form.consent, lang)}{" "}
          <Link href={localePath(lang, "/privacy")} className="link">
            {tr(ui.form.consentLink, lang)}
          </Link>
          .
        </span>
      </label>

      <div className={styles.actions}>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {tr(status === "sending" ? ui.form.sending : ui.form.send, lang)}
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {status === "error" ? tr(ui.form.error, lang) : null}
          {status === "unconfigured" ? tr(ui.form.notConfigured, lang) : null}
        </p>
      </div>
    </form>
  );
}
