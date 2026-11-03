"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { guide } from "@/content/guide";
import { localePath, tr, type Lang } from "@/content/i18n";
import { ui } from "@/content/ui";
import styles from "./ContactForm.module.css";
import { subscribeToBrevo } from "./brevo";
import { track } from "./track";
import { sendToWeb3Forms, type SendResult } from "./web3forms";

type Status = "idle" | "sending" | SendResult;

/**
 * Asks for a name and an email, then hands over the guide. The details reach Ramon through Web3Forms; the
 * download never depends on them arriving, so a failed send still shows a direct link.
 */
export function GuideForm({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = guide.form;
  const t = (text: { en: string; ro: string }) => tr(text, lang);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    track("form_submit", { form_id: "guide" });
    const tips = form.get("tips") === "on";
    // Only people who asked for tips join the Brevo list (consent); bots that fill the trap join nothing.
    const brevo = tips && !form.get("botcheck")
      ? subscribeToBrevo({ email: String(form.get("email")), firstName: String(form.get("name")), lang })
      : Promise.resolve();
    const [result] = await Promise.all([sendToWeb3Forms({
      subject: t(f.subject),
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company") || "—",
      email_tips: tips ? "yes" : "no",
      language: lang,
      botcheck: form.get("botcheck") ? true : "",
    }), brevo]);
    // The form is replaced by the download once sent, so the conversion can't fire twice.
    if (result === "sent") track("generate_lead", { form_id: "guide", email_tips: tips ? "yes" : "no" });
    setStatus(result);
  };

  if (status === "sent") {
    return (
      <div className={styles.done} role="status">
        <p>{t(f.readyTitle)}</p>
        <p className={styles.doneText}>{t(f.readyText)}</p>
        <div className={styles.doneActions}>
          <a href={guide.pdf[lang]} className="btn" download>{t(f.download)}</a>
          <Link href={localePath(lang, guide.documentPath)} className="more">{t(f.read)}</Link>
        </div>
        <Link href={localePath(lang, "/#contact")} className="link">{t(f.contact)}</Link>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>{t(f.name)}</span>
          <input name="name" type="text" autoComplete="given-name" required />
        </label>
        <label className={styles.field}>
          <span>{t(f.email)}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className={styles.field}>
        <span>{t(f.company)}</span>
        <input name="company" type="text" autoComplete="organization" />
      </label>

      {/* Spam trap: invisible to people, filled in by bots. */}
      <input type="checkbox" name="botcheck" className={styles.trap} tabIndex={-1} autoComplete="off" aria-hidden />

      <label className={styles.consent}>
        <input type="checkbox" name="tips" />
        <span>{t(f.tips)}</span>
      </label>

      <label className={styles.consent}>
        <input type="checkbox" required />
        <span>
          {t(ui.form.consent)}{" "}
          <Link href={localePath(lang, "/privacy")} className="link">{t(ui.form.consentLink)}</Link>.
        </span>
      </label>

      <div className={styles.actions}>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {t(status === "sending" ? f.sending : f.send)}
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {status === "error" || status === "unconfigured" ? (
            <>
              {t(f.error)}{" "}
              <a href={guide.pdf[lang]} className="link" download>{t(f.download)}</a>
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
