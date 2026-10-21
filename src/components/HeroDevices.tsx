import { l, tr, type Lang } from "@/content/i18n";
import styles from "./HeroDevices.module.css";
import { LoopVideo } from "./LoopVideo";

// Recordings of real client sites (scripts/site-capture), re-encoded light for the hero.
// Laptop: public/remotion/pureflame/home-scroll.mp4.
// Phone: scripts/site-capture/dca-hero-phone.json — an eased stop at each David Craft Ale section, held until
// its animations finish. Encoded as a seamless loop: frames 0.8–19.6 s, the last 0.8 s cross-faded into
// the first 0.8 s (ffmpeg xfade), scaled to 480 px wide, crf 27.
const LAPTOP = {
  src: "/videos/hero/laptop.mp4",
  poster: "/videos/hero/laptop.jpg",
  width: 1440,
  height: 900,
  label: l("The Pure Flame online store, scrolling on a laptop", "Magazinul online Pure Flame, derulat pe laptop"),
};
const PHONE = {
  src: "/videos/hero/phone.mp4",
  poster: "/videos/hero/phone.jpg",
  width: 480,
  height: 1038,
  label: l("The David Craft Ale online store on a phone", "Magazinul online David Craft Ale, pe telefon"),
};

/** The hero's "product shot": two real projects, one on a laptop and one on a phone. Drawn in CSS. */
export function HeroDevices({ lang }: { lang: Lang }) {
  return (
    <div className={styles.devices}>
      <div className={styles.laptop}>
        <div className={styles.lid}>
          <LoopVideo
            lang={lang}
            className={styles.screen}
            src={LAPTOP.src}
            poster={LAPTOP.poster}
            width={LAPTOP.width}
            height={LAPTOP.height}
            label={tr(LAPTOP.label, lang)}
          />
        </div>
        <div className={styles.base} />
      </div>
      <div className={styles.phone}>
        <LoopVideo
          lang={lang}
          className={styles.phoneScreen}
          src={PHONE.src}
          poster={PHONE.poster}
          width={PHONE.width}
          height={PHONE.height}
          label={tr(PHONE.label, lang)}
        />
      </div>
    </div>
  );
}
