import { tr, type Lang } from "@/content/i18n";
import type { VideoAd } from "@/content/projects";
import { ui } from "@/content/ui";
import { VideoAdPlayer } from "./VideoAdPlayer";
import styles from "./ProjectVideoAds.module.css";

/** Portrait films with credits; the existing silent project media stays separate. */
export function ProjectVideoAds({ lang, ads }: { lang: Lang; ads: VideoAd[] }) {
  return (
    <div className={styles.grid}>
      {ads.map((ad) => (
        <article key={ad.id} className={styles.ad} aria-labelledby={`${ad.id}-title`}>
          <header className={styles.head}>
            <h3 id={`${ad.id}-title`} className={styles.title}>{tr(ad.title, lang)}</h3>
            <p className={styles.format}>{tr(ad.format, lang)}</p>
          </header>
          <VideoAdPlayer lang={lang} video={ad.video} loop={ad.loop} titleId={`${ad.id}-title`} />
          <div className={styles.copy}>
            <p>{tr(ad.description, lang)}</p>
            <dl className={styles.credits}>
              <div>
                <dt>{tr(ui.video.role, lang)}</dt>
                <dd>{tr(ad.role, lang)}</dd>
              </div>
              <div>
                <dt>{tr(ui.video.tools, lang)}</dt>
                <dd>{tr(ad.tools, lang)}</dd>
              </div>
            </dl>
            <p className={styles.music}>
              {ad.music.href ? (
                <a className="link" href={ad.music.href} target="_blank" rel="noreferrer">
                  {tr(ad.music.credit, lang)}
                </a>
              ) : tr(ad.music.credit, lang)}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
