"use client";

import { useEffect, useRef, useState } from "react";
import { tr, type Lang } from "@/content/i18n";
import { SERVICES } from "@/content/services";
import { CubeStage, useCubeSize } from "./CubeStage";
import styles from "./HeroCube.module.css";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const CYCLE_MS = 3200;
const RESUME_MS = 6000;

const fit = (width: number) => Math.min(width * 0.52, 380);

/**
 * Tour of the faces for the auto-rotation: always a neighbouring face, turning the same way —
 * left → back → right → bottom → front → top → left… (01, 06, 02, 04, 05, 03). Going in service
 * order would hop between opposite faces, i.e. half a turn every time.
 */
const TOUR = [0, 5, 1, 3, 4, 2];
const nextFace = (face: number) => TOUR[(TOUR.indexOf(face) + 1) % TOUR.length];

/** The hero's "product shot": the Dcube turning through its six faces. Drag it, or click a face. */
export function HeroCube({ lang }: { lang: Lang }) {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const pausedUntil = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const size = useCubeSize(stageRef, fit);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      if (performance.now() < pausedUntil.current) return;
      setActive(nextFace);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const pause = () => {
    pausedUntil.current = performance.now() + RESUME_MS;
  };

  const service = SERVICES[active];

  return (
    <div className={styles.root}>
      {/* Turned in 3D, the cube projects well beyond its edge length: keep that room in the layout. */}
      <div ref={stageRef} className={styles.stage} style={{ minHeight: Math.round(size * 1.7), paddingTop: Math.round(size * 0.14) }}>
        <CubeStage
          lang={lang}
          active={active}
          size={size}
          onInteract={pause}
          onFaceClick={(i) => {
            pause();
            setActive(i);
          }}
        />
      </div>
      <p className={styles.caption} aria-hidden>
        <span key={`${lang}-${service.name}`} className={styles.face}>
          {/* "01 Web Design" — the axis is already part of most names, so number + name reads cleaner */}
          <span className={styles.axis}>{String(active + 1).padStart(2, "0")}</span> {tr(service.label, lang)}
        </span>
      </p>
    </div>
  );
}
