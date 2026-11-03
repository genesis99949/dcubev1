import Link from "next/link";
import { blackFriday, expressPrices } from "@/content/blackFriday";
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
 * `campaign`: the Black Friday version (black tile, campaign price, links to /black-friday); see CampaignPromo.
 */
export function ExpressPromo({ lang, campaign = false }: { lang: Lang; campaign?: boolean }) {
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  const bf = blackFriday;
  return (
    <aside className={`${styles.promo} ${campaign ? styles.blackFriday : ""} rise`} aria-labelledby="express-promo-title">
      <ExpressSticker name="cat" className={`${styles.art} ${styles.artLeft}`} />
      <ExpressSticker name="rocket" className={`${styles.art} ${styles.artRight}`} />
      <div className={styles.text}>
        <p className={styles.sticker}>{campaign ? t(bf.hero.sticker) : express.name}</p>
        <h3 id="express-promo-title" className={styles.title}>{t(campaign ? bf.hero.title : express.hero.title)}</h3>
        <p className={styles.lead}>{t(campaign ? bf.promo.lead : express.promo.lead)}</p>
        <Link href={localePath(lang, campaign ? bf.path : express.path)} className={`btn ${styles.action}`}>
          {t(campaign ? bf.promo.action : express.promo.action)}
        </Link>
      </div>
      <div className={styles.priceArea}>
        <Starburst className={styles.price} animated aria-hidden="true">
          <span className={styles.from}>{t(site.pricing.from)}</span>
          <span className={styles.value}>{formatPrice(expressPrices(campaign).priceOwnDomain[lang], lang)}</span>
        </Starburst>
        {campaign ? (
          // The usual price as a marker note with an arrow to the burst. A future price, never a crossed-out one.
          <p className={styles.later}>
            <span>{t(bf.promo.later)}:</span> <span className={styles.laterValue}>
              {formatPrice(express.priceOwnDomain[lang], lang)}
              <svg className={styles.brush} viewBox="0 0 120 16" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 9.5C14 6.2 30 5.4 48 6.1c18 .6 38-.9 56-1.6 6-.2 11 .3 14 1.4-2 1.7-7 2.3-13 2.8-17 1.3-35 2.8-53 3.6-15 .7-30 1.4-44 .9C5 13 2 11.8 2 9.5Z" />
                <path d="M12 12.6c20-1.4 44-2.2 66-2.5 11-.1 22 .2 30 .9-9 1.3-22 1.9-36 2.3-21 .6-42 .8-60-.7Z" opacity="0.7" />
              </svg>
            </span>
            <svg className={styles.arrow} viewBox="0 0 80 60" aria-hidden="true">
              <path d="M6 8c18 2 40 10 52 30" />
              <path d="M46 36l13 5 2-14" />
            </svg>
          </p>
        ) : null}
      </div>
    </aside>
  );
}
