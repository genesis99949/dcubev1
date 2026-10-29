"use client";

import { express } from "@/content/express";
import { tr, type Lang } from "@/content/i18n";
import { formatPrice } from "@/content/packages";
import styles from "./ExpressPrice.module.css";
import { Starburst } from "./Starburst";
import { expressPrice, setOwnDomain, useOwnDomain } from "./expressDomain";

/** The "I already have a domain" switch (role="switch"); the same state in the hero and in the form. */
export function DomainSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const own = useOwnDomain();
  const saving = express.price[lang] - express.priceOwnDomain[lang];
  return (
    <span className={`${styles.switchRow} ${className}`}>
      <button type="button" role="switch" aria-checked={own} className={styles.switch} onClick={() => setOwnDomain(!own)}>
        <span className={styles.track} aria-hidden="true">
          <span className={styles.knob} />
        </span>
        {tr(express.domain.toggle, lang)}
      </button>
      {own ? <span className={styles.saving}>−{formatPrice(saving, lang)}</span> : null}
    </span>
  );
}

/** The hero price: the animated burst, which pops again when the switch changes the amount. */
export function ExpressPrice({ lang }: { lang: Lang }) {
  const own = useOwnDomain();
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  return (
    <div className={styles.block}>
      <Starburst key={String(own)} className={styles.price} animated>
        <span className={styles.label}>{t(own ? express.domain.own : express.domain.included)}</span>
        <span className={styles.value}>{formatPrice(expressPrice(own, lang), lang)}</span>
      </Starburst>
      <DomainSwitch lang={lang} />
      <p className={styles.note} aria-live="polite">{t(own ? express.domain.noteOwn : express.domain.noteIncluded)}</p>
    </div>
  );
}
