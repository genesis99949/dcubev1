import Link from "next/link";
import { express } from "@/content/express";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice } from "@/content/packages";
import { site } from "@/content/site";
import styles from "./ExpressPromo.module.css";
import { ExpressSticker } from "./ExpressSticker";
import { Starburst } from "./Starburst";

/**
 * One-Page Express advertised on the homepage, under the packages: a red tile in the Express page's own look
 * (red, yellow, black, heavy type), so it reads as a separate product. The rest of the page keeps the one-accent rule.
 */
export function ExpressPromo({ lang }: { lang: Lang }) {
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  return (
    <aside className={`${styles.promo} rise`} aria-labelledby="express-promo-title">
      <ExpressSticker name="cat" className={`${styles.art} ${styles.artLeft}`} />
      <ExpressSticker name="rocket" className={`${styles.art} ${styles.artRight}`} />
      <div className={styles.text}>
        <p className={styles.sticker}>{express.name}</p>
        <h3 id="express-promo-title" className={styles.title}>{t(express.hero.title)}</h3>
        <p className={styles.lead}>{t(express.promo.lead)}</p>
        <Link href={localePath(lang, express.path)} className={`btn ${styles.action}`}>
          {t(express.promo.action)}
        </Link>
      </div>
      <Starburst className={styles.price} animated aria-hidden="true">
        <span className={styles.from}>{t(site.pricing.from)}</span>
        <span className={styles.value}>{formatPrice(express.priceOwnDomain[lang], lang)}</span>
      </Starburst>
    </aside>
  );
}
