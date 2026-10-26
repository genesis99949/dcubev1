import { tr, type L, type Lang } from "@/content/i18n";
import { extras } from "@/content/packages";
import { site } from "@/content/site";
import type { Service } from "@/content/services";
import styles from "./PricingSection.module.css";
import { PricingTabs } from "./PricingTabs";
import { OfferDetails } from "./OfferDetails";

/** The packages (service switch + two tiers), then the extras and how payment works. */
export function PricingSection({ lang, service }: { lang: Lang; service?: Service }) {
  const p = site.pricing;
  return (
    <>
      <PricingTabs key={service} lang={lang} service={service} />
      <div className={styles.extras}>
        <h3 className={styles.extrasTitle}>{tr(p.extras, lang)}</h3>
        <ul className={styles.extrasList}>
          {extras.map((item) => (
            <li key={item.en}>{tr(item, lang)}</li>
          ))}
        </ul>
        <p className={styles.payment}>{tr(site.business.clients, lang)} {tr(site.business.vat, lang)}</p>
        <p className={styles.payment}>
          {tr(p.payment, lang)} {tr(p.ownHosting, lang)}
        </p>
      </div>
      <OfferDetails lang={lang} title={p.detailsTitle} items={p.details} />
    </>
  );
}

/** "How I work" — four steps from the first call to launch. */
export function ProcessSteps({ lang, steps = site.process.steps, headingLevel = 3 }: {
  lang: Lang;
  steps?: readonly { title: L; text: L }[];
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return (
    <ol className={styles.steps}>
      {steps.map((step, i) => (
        <li key={step.title.en} className={`${styles.step} rise`}>
          <span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span>
          <Heading className={styles.stepTitle}>{tr(step.title, lang)}</Heading>
          <p className={styles.stepText}>{tr(step.text, lang)}</p>
        </li>
      ))}
    </ol>
  );
}
