import { tr, type Lang } from "@/content/i18n";
import { CURRENCY, extras, packages } from "@/content/packages";
import { site } from "@/content/site";
import { PackageLink } from "./PackageLink";
import styles from "./PricingSection.module.css";

const price = (value: number, lang: Lang) =>
  lang === "ro" ? `${value.toLocaleString("ro-RO")} ${CURRENCY}` : `${CURRENCY}${value.toLocaleString("en-GB")}`;

/** The packages, side by side: who each is for, a starting price and what's included — then the extras. */
export function PricingSection({ lang }: { lang: Lang }) {
  const p = site.pricing;
  return (
    <>
      <ul className={styles.grid}>
        {packages.map((pkg) => (
          <li key={pkg.id} className={`${styles.card} ${pkg.featured ? styles.featured : ""} rise`}>
            <h3 className={styles.name}>{tr(pkg.name, lang)}</h3>
            <p className={styles.for}>{tr(pkg.for, lang)}</p>
            <p className={styles.price}>
              {pkg.price === null ? (
                <span className={styles.request}>{tr(p.onRequest, lang)}</span>
              ) : (
                <>
                  <span className={styles.from}>{tr(p.from, lang)} </span>
                  {price(pkg.price, lang)}
                </>
              )}
            </p>
            <ul className={styles.includes}>
              {pkg.includes.map((item) => (
                <li key={item.en}>{tr(item, lang)}</li>
              ))}
            </ul>
            <PackageLink id={pkg.id} href="#contact" className={`btn ${pkg.featured ? "btn-light" : ""} ${styles.action}`}>
              {tr(p.action, lang)}
            </PackageLink>
          </li>
        ))}
      </ul>
      <div className={styles.extras}>
        <h3 className={styles.extrasTitle}>{tr(p.extras, lang)}</h3>
        <ul className={styles.extrasList}>
          {extras.map((item) => (
            <li key={item.en}>{tr(item, lang)}</li>
          ))}
        </ul>
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
