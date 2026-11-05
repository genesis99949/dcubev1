"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { blackFriday, blackFridayActive, blackFridayPromoActive } from "@/content/blackFriday";
import { express } from "@/content/express";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice } from "@/content/packages";
import styles from "./CampaignBand.module.css";

const KEY = `${blackFriday.id}-band-hidden`;
const EVENT = "campaign-band";

// Storage can be missing or blocked (private windows): then the band simply comes back on the next page.
const readHidden = () => {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

// The server snapshot is the build's own date, so a site built during the campaign has the band in its HTML
// (no jump when the page loads); the visitor's clock then decides, and hides it after `end` without a rebuild.
const builtShown = blackFridayPromoActive();
const builtOpen = blackFridayActive();
const shownNow = () => blackFridayPromoActive() && !readHidden();

/** A black band above the header that sends visitors to the Black Friday page, from `promoStart` to `end`. */
export function CampaignBand({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const shown = useSyncExternalStore(subscribe, shownNow, () => builtShown);
  const open = useSyncExternalStore(subscribe, () => blackFridayActive(), () => builtOpen);
  // The Express page and the campaign page are funnels with the offer already on screen.
  const funnel = [express.path, blackFriday.path].some((path) => localePath(lang, path) === pathname);
  if (!shown || funnel) return null;

  const b = blackFriday.band;
  const fill = (text: string) =>
    text.replace("{price}", formatPrice(blackFriday.price[lang], lang)).replace("{free}", String(blackFriday.slots - blackFriday.taken));

  const hide = () => {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <aside className={styles.band} aria-label={tr(b.label, lang)}>
      <Link href={localePath(lang, blackFriday.path)} className={styles.link}>
        <svg className={styles.spark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" />
        </svg>
        <strong className={styles.label}>
          {tr(b.label, lang)}
          {open ? null : <span className={styles.soon}> {tr(b.soon, lang)}</span>}
        </strong>
        <span className={styles.long}>{fill(tr(b.text, lang))}</span>
        <span className={styles.short}>{fill(tr(b.short, lang))}</span>
        <span className={styles.action}>
          {tr(b.action, lang)}
          <span aria-hidden> →</span>
        </span>
      </Link>
      <button type="button" className={styles.close} aria-label={tr(b.close, lang)} onClick={hide}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </aside>
  );
}
