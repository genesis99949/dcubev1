"use client";

import { useEffect, useRef, useState } from "react";
import { tr, type Lang } from "@/content/i18n";
import { ui } from "@/content/ui";
import styles from "./LoopVideo.module.css";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { SiteImage } from "./SiteImage";

type LoopVideoProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  width: number;
  height: number;
  /** A small round play/pause button over the video (project pages). */
  controls?: boolean;
  className?: string;
  label: string;
  lang: Lang;
  sizes?: string;
  /** Load the poster immediately for media in the first viewport. */
  eager?: boolean;
};

/**
 * Muted, looping video that only plays while on screen — no native player chrome.
 * Respects prefers-reduced-motion (shows the poster; the button can still start it).
 */
export function LoopVideo({ src, mobileSrc, poster, width, height, controls = false, className, label, lang, sizes = "100vw", eager = false }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [playback, setPlayback] = useState<"auto" | "play" | "pause">("auto");
  const [playing, setPlaying] = useState(false);
  const [displayedSrc, setDisplayedSrc] = useState<string>();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const update = () => {
      if (visible && !document.hidden && (playback === "play" || (playback === "auto" && !reducedMotion))) {
        // No src in the initial HTML: offscreen videos make no media requests.
        const source = mobileSrc && window.matchMedia("(max-width: 640px)").matches ? mobileSrc : src;
        if (video.getAttribute("src") !== source) video.src = source;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        update();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [src, mobileSrc, reducedMotion, playback]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setPlayback("play");
      const source = mobileSrc && window.matchMedia("(max-width: 640px)").matches ? mobileSrc : src;
      if (video.getAttribute("src") !== source) video.src = source;
      video.play().catch(() => {});
    } else {
      setPlayback("pause");
      video.pause();
    }
  };

  return (
    <div className={`${styles.wrap} ${className ?? ""}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <video
        ref={ref}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPlaying={() => setDisplayedSrc(src)}
        onPause={() => setPlaying(false)}
      />
      <SiteImage
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={styles.poster}
        style={{ visibility: displayedSrc === src ? "hidden" : "visible" }}
      />
      {controls && <button type="button" className={styles.toggle} onClick={toggle} aria-label={tr(playing ? ui.video.pause : ui.video.play, lang)}>
        {playing ? (
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />
          </svg>
        )}
      </button>}
    </div>
  );
}
