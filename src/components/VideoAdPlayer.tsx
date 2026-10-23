"use client";

import { useRef, useState } from "react";
import { tr, type Lang } from "@/content/i18n";
import type { VideoAd } from "@/content/projects";
import { ui } from "@/content/ui";
import styles from "./ProjectVideoAds.module.css";

/** Manual playback with audio, native seek/fullscreen controls and labelled buttons.
 * No autoplay (including with reduced motion); preload=none defers the film until play.
 */
export function VideoAdPlayer({ lang, video, loop = false, titleId }: {
  lang: Lang;
  video: VideoAd["video"];
  loop?: boolean;
  titleId: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = (text: { en: string; ro: string }) => tr(text, lang);

  const togglePlay = async () => {
    const element = ref.current;
    if (!element) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    setFailed(false);
    try {
      await element.play();
    } catch {
      setFailed(true);
    }
  };

  const toggleSound = () => {
    const element = ref.current;
    if (!element) return;
    const silent = element.muted || element.volume === 0;
    element.muted = !silent;
    if (silent && element.volume === 0) element.volume = 1;
  };

  return (
    <div role="group" aria-labelledby={titleId}>
      <video
        ref={ref}
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
          setPlaying(true);
          setFailed(false);
          // Starting a second ad pauses the first, so their sound never overlaps.
          document.querySelectorAll<HTMLVideoElement>("video[data-ad-video]").forEach((other) => {
            if (other !== event.currentTarget) other.pause();
          });
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
        onError={() => setFailed(true)}
      >
        <a href={video.src}>{t(ui.video.openFile)}</a>
      </video>
      <div className={styles.controls}>
        <button type="button" className={styles.control} onClick={togglePlay}>
          {t(playing ? ui.video.pause : muted ? ui.video.play : ui.video.playWithSound)}
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={toggleSound}
          aria-label={t(muted ? ui.video.unmute : ui.video.mute)}
          aria-pressed={!muted}
        >
          {t(muted ? ui.video.soundOff : ui.video.soundOn)}
        </button>
      </div>
      {failed ? (
        <p className={styles.error} role="status">
          {t(ui.video.error)} <a className="link" href={video.src}>{t(ui.video.openFile)}</a>
        </p>
      ) : null}
    </div>
  );
}
