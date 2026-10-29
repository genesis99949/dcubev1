"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { express, type ExpressTemplateId } from "@/content/express";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice } from "@/content/packages";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import styles from "./ContactForm.module.css";
import s from "./ExpressForm.module.css";
import { TEMPLATE_EVENT } from "./events";
import { DomainSwitch } from "./ExpressPrice";
import { expressPrice, useOwnDomain } from "./expressDomain";
import { track } from "./track";
import { sendToWeb3Forms, type SendResult } from "./web3forms";

type Status = "idle" | "sending" | SendResult;
type TemplateChoice = ExpressTemplateId | "unsure";
type Step = 1 | 2 | 3;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** A phone number: digits with optional +, spaces, dots, dashes or brackets; 9 to 15 digits. */
const PHONE = /^\+?[\d\s().-]+$/;
const isPhone = (value: string) => PHONE.test(value) && value.replace(/\D/g, "").length >= 9 && value.replace(/\D/g, "").length <= 15;

/**
 * The One-Page Express request in three short steps: template → materials → contact. Picking an option moves
 * on by itself, so the first two steps are one click each. Same styles, Web3Forms delivery and consents as the
 * general form. `onClose` adds a close button (in the dialog).
 */
export function ExpressForm({ lang, onClose }: { lang: Lang; onClose?: () => void }) {
  const f = express.form;
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  const [step, setStep] = useState<Step>(1);
  const [template, setTemplate] = useState<TemplateChoice | null>(null);
  const [materials, setMaterials] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const ownDomain = useOwnDomain();
  const price = formatPrice(expressPrice(ownDomain, lang), lang);
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const moved = useRef(false);

  const go = (next: Step) => {
    moved.current = true;
    setStep(next);
    if (next > step) track("form_step", { form_id: "express", step: next });
  };

  // "Choose this template" on a template tile pre-fills it and skips to the materials.
  useEffect(() => {
    const onTemplate = (e: Event) => {
      setTemplate((e as CustomEvent<ExpressTemplateId>).detail);
      moved.current = true;
      setStep(2);
    };
    window.addEventListener(TEMPLATE_EVENT, onTemplate);
    return () => window.removeEventListener(TEMPLATE_EVENT, onTemplate);
  }, []);

  // After a step change made here, move focus to the new step's question (not on first render).
  useEffect(() => {
    if (moved.current) headings.current[step - 1]?.focus({ preventScroll: true });
  }, [step]);

  const templates: { value: TemplateChoice; label: string; hint: string }[] = [
    ...express.templates.items.map((item) => ({ value: item.id, label: t(item.name), hint: t(item.for) })),
    { value: "unsure", label: t(f.templateUnsure), hint: t(f.templateUnsureHint) },
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const reach = String(form.get("reach") ?? "").trim();
    setStatus("sending");
    track("form_submit", { form_id: "express" });
    const result = await sendToWeb3Forms({
      subject: tr(f.subject, lang),
      name: form.get("name"),
      // An email becomes the reply-to address; a phone number is passed on as is.
      ...(EMAIL.test(reach) ? { email: reach } : { phone: reach }),
      company: form.get("company"),
      business_request: form.get("business_request") === "on",
      package: `${express.name} · ${price}`,
      domain: ownDomain ? `${express.domain.toggle.en}: ${form.get("domain_name") || "—"}` : express.domain.included.en,
      template: templates.find((o) => o.value === template)?.label ?? "—",
      materials: f.materialOptions.find((o) => o.value === materials)?.label.en ?? "—",
      message: form.get("message") || "—",
      source: form.get("source") || "—",
      language: lang,
      botcheck: form.get("botcheck") ? true : "",
    });
    // The form is replaced by the thank-you note once sent, so the conversion can't fire twice.
    if (result === "sent") {
      track("generate_lead", {
        form_id: "express",
        package_id: express.id,
        template: template ?? "none",
        materials: materials ?? "none",
        own_domain: ownDomain,
        value: expressPrice(ownDomain, "ro"),
        currency: "RON",
      });
    }
    setStatus(result);
  };

  const closeButton = onClose ? (
    <button type="button" className={s.close} onClick={onClose} aria-label={t(f.close)}>
      <span aria-hidden="true">×</span>
    </button>
  ) : null;

  if (status === "sent") {
    const whatsapp = site.contact.whatsapp;
    return (
      <div className={`${styles.done} ${s.done}`}>
        {closeButton}
        <p role="status" className={s.sent}>{t(f.sent)}</p>
        <div className={s.next}>
          <p className={s.nextTitle}>{t(f.nextTitle)}</p>
          <ul className={s.nextList}>
            {f.next.map((item) => <li key={item.en}>{t(item)}</li>)}
          </ul>
        </div>
        {whatsapp ? (
          <div className={s.whatsapp}>
            <p>{t(f.whatsappLead)}</p>
            <a className="btn" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(t(f.whatsappText))}`} target="_blank" rel="noreferrer">
              {t(f.whatsappAction)}
            </a>
          </div>
        ) : null}
      </div>
    );
  }

  const heading = (n: Step, text: string) => (
    <h3 ref={(el) => { headings.current[n - 1] = el; }} className={s.question} tabIndex={-1}>
      {text}
    </h3>
  );

  const back = (to: Step) => (
    <button type="button" className={s.back} onClick={() => go(to)}>
      ‹ {t(f.back)}
    </button>
  );

  return (
    <form className={`${styles.form} ${s.form}`} onSubmit={onSubmit}>
      <div className={s.top}>
        <p>
          <strong>{express.name} · {price}</strong>
          <span className={s.stepOf}>{t(f.stepOf).replace("{n}", String(step))}</span>
        </p>
        {closeButton}
      </div>
      <div className={s.progress} aria-hidden="true">
        {[1, 2, 3].map((n) => <span key={n} data-done={n <= step} />)}
      </div>

      {/* Steps stay mounted (hidden), so typed answers survive going back. */}
      <div className={s.step} hidden={step !== 1}>
        {heading(1, t(f.template))}
        <div className={s.options}>
          {templates.map((o) => (
            <button
              key={o.value}
              type="button"
              className={s.option}
              aria-pressed={template === o.value}
              onClick={() => {
                setTemplate(o.value);
                go(2);
              }}
            >
              <strong>{o.label}</strong>
              <span>{o.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={s.step} hidden={step !== 2}>
        {heading(2, t(f.materials))}
        <div className={s.options}>
          {f.materialOptions.map((o) => (
            <button
              key={o.value}
              type="button"
              className={s.option}
              aria-pressed={materials === o.value}
              onClick={() => {
                setMaterials(o.value);
                go(3);
              }}
            >
              <strong>{t(o.label)}</strong>
              <span>{t(o.hint)}</span>
            </button>
          ))}
        </div>
        {back(1)}
      </div>

      <div className={s.step} hidden={step !== 3}>
        {heading(3, t(f.contactTitle))}
        <DomainSwitch lang={lang} className={s.domain} />
        {ownDomain ? (
          <label className={styles.field}>
            <span>{t(express.domain.name)}</span>
            <input name="domain_name" type="text" inputMode="url" autoComplete="url" placeholder={t(express.domain.namePlaceholder)} />
          </label>
        ) : null}
        <label className={styles.field}>
          <span>{t(ui.form.company)}</span>
          <input name="company" type="text" autoComplete="organization" required />
        </label>
        <div className={styles.row}>
          <label className={styles.field}>
            <span>{t(ui.form.name)}</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label className={styles.field}>
            <span>{t(f.contact)}</span>
            <input
              name="reach"
              type="text"
              autoComplete="email"
              required
              onInput={(e) => {
                const value = e.currentTarget.value.trim();
                e.currentTarget.setCustomValidity(!value || EMAIL.test(value) || isPhone(value) ? "" : t(f.contactHint));
              }}
            />
          </label>
        </div>

        <label className={styles.field}>
          <span>{t(ui.form.source)}</span>
          <select name="source" defaultValue="">
            <option value="" disabled>{t(ui.form.sourcePlaceholder)}</option>
            {site.contact.sources.map((o) => <option key={o.en} value={t(o)}>{t(o)}</option>)}
          </select>
        </label>

        <label className={styles.field}>
          <span>{t(f.message)}</span>
          <textarea name="message" rows={3} placeholder={t(f.messagePlaceholder)} />
        </label>

        {/* Spam trap: invisible to people, filled in by bots. */}
        <input type="checkbox" name="botcheck" className={styles.trap} tabIndex={-1} autoComplete="off" aria-hidden />

        <label className={styles.consent}>
          <input type="checkbox" name="business_request" required />
          <span>{t(ui.form.businessRequest)}</span>
        </label>

        <label className={styles.consent}>
          <input type="checkbox" required />
          <span>
            {t(ui.form.consent)}{" "}
            <Link href={localePath(lang, "/privacy")} className="link">
              {t(ui.form.consentLink)}
            </Link>
            .
          </span>
        </label>

        <div className={styles.actions}>
          <button type="submit" className="btn" disabled={status === "sending"}>
            {t(status === "sending" ? ui.form.sending : f.send)}
          </button>
          {back(2)}
          <p className={styles.status} role="status" aria-live="polite">
            {status === "error" ? t(ui.form.error) : null}
            {status === "unconfigured" ? t(ui.form.notConfigured) : null}
          </p>
        </div>
      </div>
    </form>
  );
}
