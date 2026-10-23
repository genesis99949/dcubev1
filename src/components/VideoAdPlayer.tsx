"use client";

import { useState } from "react";
import { tr, type Lang } from "@/content/i18n";
import type { VideoAd } from "@/content/projects";
import { ui } from "@/content/ui";
import styles from "./ProjectVideoAds.module.css";

/** Manual playback with audio and native play, volume, seek and fullscreen controls.
 * No autoplay (including with reduced motion); preload=none defers the film until play.
 */
export function VideoAdPlayer({ lang, video, loop = false, titleId }: {
  lang: Lang;
  video: VideoAd["video"];
  loop?: boolean;
  titleId: string;
}) {
  const [failed, setFailed] = useState(false);
  const t = (text: { en: string; ro: string }) => tr(text, lang);

  return (
    <div role="group" aria-labelledby={titleId}>
      <video
        className={styles.video}
        data-ad-video
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
        controls
        playsInline
        preload="none"
        loop={loop}
        aria-label={t(video.alt)}
        onPlay={(event) => {
          setFailed(false);
          // Starting a second ad pauses the first, so their sound never overlaps.
          document.querySelectorAll<HTMLVideoElement>("video[data-ad-video]").forEach((other) => {
            if (other !== event.currentTarget) other.pause();
          });
        }}
        onError={() => setFailed(true)}
      >
        <a href={video.src}>{t(ui.video.openFile)}</a>
      </video>
      {failed ? (
        <p className={styles.error} role="status">
          {t(ui.video.error)} <a className="link" href={video.src}>{t(ui.video.openFile)}</a>
        </p>
      ) : null}
    </div>
  );
}
