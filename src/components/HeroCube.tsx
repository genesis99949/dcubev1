"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/content/services";
import { CubeStage, useCubeSize } from "./CubeStage";
import styles from "./HeroCube.module.css";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const CYCLE_MS = 3200;
const RESUME_MS = 6000;

const fit = (width: number) => Math.min(width * 0.52, 380);

/** The hero's "product shot": the Dcube turning through its six faces. Drag it, or click a face. */
export function HeroCube() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const pausedUntil = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const size = useCubeSize(stageRef, fit);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      if (performance.now() < pausedUntil.current) return;
      setActive((a) => (a + 1) % SERVICES.length);
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
        <span key={service.name} className={styles.face}>
          <span className={styles.axis}>{service.axis}</span> {service.name}
        </span>
      </p>
    </div>
  );
}
