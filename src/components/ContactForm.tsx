"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { localePath, tr, type L, type Lang } from "@/content/i18n";
import { formatPrice, packages } from "@/content/packages";
import { SERVICES, serviceLabel, type Service } from "@/content/services";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { mediaLabels, mediaOffers, type MediaKind } from "@/content/video";
import styles from "./ContactForm.module.css";
import { PACKAGE_EVENT } from "./events";
import { track } from "./track";
import { sendToWeb3Forms } from "./web3forms";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

/**
 * Project inquiry form. Messages are delivered by Web3Forms (a static site has no server of its own)
 * to the email address the access key was created for — that address never appears on the site.
 */
/** One answer to "What do you need?": a service, or "not sure yet". */
type Choice = Service | MediaKind | "unsure";
type Selection = { choice: Choice | null; packageId: string | null; voiceoverId: string | null };

const videoOffers = mediaOffers.filter((offer) => offer.kind === "video");
const voiceoverOffers = mediaOffers.filter((offer) => offer.kind !== "video");

/** Pricing links preserve a video when its optional voice-over is chosen. */
function selectOffer(previous: Selection, id: string): Selection {
  const website = packages.find((offer) => offer.id === id);
  if (website) return { choice: website.service, packageId: id, voiceoverId: null };
  const media = mediaOffers.find((offer) => offer.id === id);
  if (!media) return previous;
  if (media.kind === "video") {
    const existingVoice = voiceoverOffers.find((offer) => offer.id === previous.packageId);
    return { choice: "video", packageId: id, voiceoverId: existingVoice?.id ?? previous.voiceoverId };
  }
  if (previous.choice === "video") return { ...previous, voiceoverId: id };
  return { choice: media.kind, packageId: id, voiceoverId: null };
}

export function ContactForm({ lang, defaultService }: { lang: Lang; defaultService?: Service }) {
  const [selection, setSelection] = useState<Selection>({ choice: defaultService ?? null, packageId: null, voiceoverId: null });
  const { choice, packageId, voiceoverId } = selection;
  const [status, setStatus] = useState<Status>("idle");

  // A package picked in the pricing section pre-fills its service.
  useEffect(() => {
    const onPackage = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setSelection((previous) => selectOffer(previous, id));
    };
    window.addEventListener(PACKAGE_EVENT, onPackage);
    return () => window.removeEventListener(PACKAGE_EVENT, onPackage);
  }, []);

  const options: { value: Choice; label: L }[] = [
    ...SERVICES.map((s) => ({ value: s.name, label: s.label })),
    { value: "video", label: mediaLabels.video },
    { value: "voiceover", label: mediaLabels.voiceover },
    { value: "voiceover-ai", label: mediaLabels["voiceover-ai"] },
    { value: "unsure", label: ui.form.unsure },
  ];

  // Picking another answer by hand drops a package that no longer matches it.
  const pick = (value: Choice) => {
    setSelection((previous) => {
      if (previous.choice === value) return previous;
      if (value === "voiceover" || value === "voiceover-ai") {
        return { choice: value, packageId: voiceoverOffers.find((offer) => offer.kind === value)!.id, voiceoverId: null };
      }
      if (value === "video") {
        const existingVoice = voiceoverOffers.find((offer) => offer.id === previous.packageId);
        return { choice: value, packageId: null, voiceoverId: existingVoice?.id ?? null };
      }
      return { choice: value, packageId: null, voiceoverId: null };
    });
  };

  const chosenPackage = packages.find((p) => p.id === packageId);
  const chosenMedia = mediaOffers.find((offer) => offer.id === packageId);
  const chosenVoiceover = choice === "video" ? voiceoverOffers.find((offer) => offer.id === voiceoverId) : undefined;
  const isMedia = choice === "video" || choice === "voiceover" || choice === "voiceover-ai";
  const total = chosenMedia ? chosenMedia.price[lang] + (chosenVoiceover?.price[lang] ?? 0) : null;
  /** "Online store · Start" — the service and tier of the picked package. */
  const packageName = (target: Lang) =>
    chosenPackage ? `${tr(serviceLabel(chosenPackage.service), target)} · ${tr(chosenPackage.name, target)}`
      : chosenMedia ? `${tr(mediaLabels[chosenMedia.kind], target)} · ${tr(chosenMedia.name, target)}${chosenVoiceover ? ` + ${tr(mediaLabels[chosenVoiceover.kind], target)} · ${tr(chosenVoiceover.name, target)}` : ""}` : "";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!site.contact.formKey) {
      setStatus("unconfigured");
      return;
    }
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    track("form_submit", { form_id: "contact" });
    const result = await sendToWeb3Forms({
      subject: tr(ui.form.subject, lang),
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      business_request: form.get("business_request") === "on",
      services: choice ? `${tr(options.find((o) => o.value === choice)!.label, "en")}${chosenVoiceover ? ` + ${tr(mediaLabels[chosenVoiceover.kind], "en")}` : ""}` : "—",
      package: packageName("en") || "—",
      voiceover: chosenVoiceover ? tr(mediaLabels[chosenVoiceover.kind], "en") : "—",
      package_total: total === null ? "—" : formatPrice(total, lang),
      budget: form.get("budget") || "—",
      source: form.get("source") || "—",
      message: form.get("message"),
      language: lang,
      botcheck: form.get("botcheck") ? true : "",
    });
    // The form is replaced by the thank-you note once sent, so the conversion can't fire twice.
    if (result === "sent") track("generate_lead", { form_id: "contact", service: choice ?? "none", package_id: packageId ?? "none" });
    setStatus(result);
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
      <p>{tr(site.business.clients, lang)}</p>
      <label className={styles.field}>
        <span>{tr(ui.form.company, lang)}</span>
        <input name="company" type="text" autoComplete="organization" required />
      </label>
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
          {chosenPackage || chosenMedia ? <em className={styles.package}> · {packageName(lang)}</em> : null}
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

      {choice === "video" ? (
        <>
          <label className={styles.field}>
            <span>{tr(ui.form.videoPackage, lang)}</span>
            <select name="video_package" value={packageId ?? ""} required onChange={(event) => {
              const id = event.target.value;
              setSelection((previous) => selectOffer(previous, id));
            }}>
              <option value="" disabled>{tr(ui.form.videoPackagePlaceholder, lang)}</option>
              {videoOffers.map((offer) => <option key={offer.id} value={offer.id}>{tr(offer.name, lang)} · {formatPrice(offer.price[lang], lang)}</option>)}
            </select>
          </label>
          <label className={styles.field}>
            <span>{tr(ui.form.videoVoiceover, lang)}</span>
            <select name="video_voiceover" value={voiceoverId ?? ""} onChange={(event) => {
              const id = event.target.value;
              setSelection((previous) => ({ ...previous, voiceoverId: id || null }));
            }}>
              <option value="">{tr(ui.form.noVoiceover, lang)}</option>
              {voiceoverOffers.map((offer) => <option key={offer.id} value={offer.id}>{tr(mediaLabels[offer.kind], lang)} · +{formatPrice(offer.price[lang], lang)}</option>)}
            </select>
          </label>
        </>
      ) : null}

      {total !== null ? (
        <div className={styles.total} role="status" aria-live="polite">
          <p><span>{tr(ui.form.packageTotal, lang)}</span><strong>{formatPrice(total, lang)}</strong></p>
          <p>{tr(ui.form.packageTotalNote, lang)}</p>
        </div>
      ) : null}

      {!isMedia ? (
        <label className={styles.field}>
          <span>{tr(ui.form.budget, lang)}</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>{tr(ui.form.budgetPlaceholder, lang)}</option>
            {site.contact.budgets.map((b) => <option key={b.en} value={tr(b, lang)}>{tr(b, lang)}</option>)}
          </select>
        </label>
      ) : null}

      <label className={styles.field}>
        <span>{tr(ui.form.source, lang)}</span>
        <select name="source" defaultValue="">
          <option value="" disabled>{tr(ui.form.sourcePlaceholder, lang)}</option>
          {site.contact.sources.map((o) => <option key={o.en} value={tr(o, lang)}>{tr(o, lang)}</option>)}
        </select>
      </label>

      <label className={styles.field}>
        <span>{tr(ui.form.message, lang)}</span>
        <textarea name="message" rows={5} required placeholder={tr(ui.form.messagePlaceholder, lang)} />
      </label>

      {/* Spam trap: invisible to people, filled in by bots. */}
      <input type="checkbox" name="botcheck" className={styles.trap} tabIndex={-1} autoComplete="off" aria-hidden />

      <label className={styles.consent}>
        <input type="checkbox" name="business_request" required />
        <span>{tr(ui.form.businessRequest, lang)}</span>
      </label>

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
