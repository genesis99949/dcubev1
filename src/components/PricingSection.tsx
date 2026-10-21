import { tr, type Lang } from "@/content/i18n";
import { extras } from "@/content/packages";
import { site } from "@/content/site";
import styles from "./PricingSection.module.css";
import { PricingTabs } from "./PricingTabs";

/** The packages (service switch + two tiers), then the extras and how payment works. */
export function PricingSection({ lang }: { lang: Lang }) {
  const p = site.pricing;
  return (
    <>
      <PricingTabs lang={lang} />
      <div className={styles.extras}>
        <h3 className={styles.extrasTitle}>{tr(p.extras, lang)}</h3>
        <ul className={styles.extrasList}>
          {extras.map((item) => (
            <li key={item.en}>{tr(item, lang)}</li>
          ))}
        </ul>
        <p className={styles.payment}>{tr(p.payment, lang)}</p>
      </div>
    </>
  );
}

/** "How I work" — four steps from the first call to launch. */
export function ProcessSteps({ lang }: { lang: Lang }) {
  return (
    <ol className={styles.steps}>
      {site.process.steps.map((step, i) => (
        <li key={step.title.en} className={`${styles.step} rise`}>
          <span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={styles.stepTitle}>{tr(step.title, lang)}</h3>
          <p className={styles.stepText}>{tr(step.text, lang)}</p>
        </li>
      ))}
    </ol>
  );
}
