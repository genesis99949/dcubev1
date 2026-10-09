"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LoopVideo.module.css";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type LoopVideoProps = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** A small round play/pause button over the video (project pages). */
  controls?: boolean;
  className?: string;
  label: string;
};

/**
 * Muted, looping video that only plays while on screen — no native player chrome.
 * Respects prefers-reduced-motion (shows the poster; the button can still start it).
 */
export function LoopVideo({ src, poster, width, height, controls = false, className, label }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion || userPaused) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, userPaused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  const element = (
    <video
      ref={ref}
      className={controls ? undefined : className}
      src={src}
      poster={poster}
      width={width}
      height={height}
      // Reserve the right shape before the video loads (16:9 site films, 3:2 mockups…).
      style={{ aspectRatio: `${width} / ${height}` }}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
    />
  );

  if (!controls) return element;

  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      {element}
      <button type="button" className={styles.toggle} onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>
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
      </button>
    </div>
  );
}
