import Link from "next/link";
import { blackFriday, expressPrices } from "@/content/blackFriday";
import { express } from "@/content/express";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice } from "@/content/packages";
import { site } from "@/content/site";
import styles from "./ExpressPromo.module.css";
import { CampaignOpen } from "./CampaignOpen";
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
        {campaign ? (
          // Until the offer opens there is nothing to click: a plain line says how few places there are.
          <CampaignOpen soon={<p className={styles.teaser}>{t(bf.promo.teaser)}</p>}>
            <Link href={localePath(lang, bf.path)} className={`btn ${styles.action}`}>{t(bf.promo.action)}</Link>
          </CampaignOpen>
        ) : (
          <Link href={localePath(lang, express.path)} className={`btn ${styles.action}`}>{t(express.promo.action)}</Link>
        )}
      </div>
      <div className={styles.priceArea}>
        <Starburst className={styles.price} animated aria-hidden="true">
          <span className={styles.from}>{t(site.pricing.from)}</span>
          <span className={styles.value}>{formatPrice(expressPrices(campaign).priceOwnDomain[lang], lang)}</span>
        </Starburst>
      </div>
    </aside>
  );
}
