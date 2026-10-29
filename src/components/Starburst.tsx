import type React from "react";
import styles from "./Starburst.module.css";

// Fixed irregularity, so the shape is the same on the server and in every browser.
const JITTER = [1, 0.86, 0.97, 0.9, 1.05, 0.84, 0.95, 0.92, 1.02, 0.88, 0.94, 0.96, 1.04, 0.85, 0.98, 0.9, 1.01];

/** Points of a comic "price burst": spikes on an ellipse 200×150, with uneven tips. */
function burst(spikes: number, depth: number, scale: number, seed: number) {
  const points: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2 + seed * 0.07;
    const jitter = JITTER[(i + seed) % JITTER.length];
    const r = scale * (i % 2 === 0 ? jitter : (1 - depth) * (0.97 + (jitter - 0.94) * 0.4));
    points.push(`${(100 + Math.cos(angle) * 100 * r).toFixed(1)},${(75 + Math.sin(angle) * 75 * r).toFixed(1)}`);
  }
  return points.join(" ");
}

const OUTER = burst(15, 0.3, 1, 0);
const INNER = burst(16, 0.26, 0.78, 5);

/** A regular star for the round seal: tips and valleys on two circles in a 200×200 box. */
function star(spikes: number, tip: number, valley: number) {
  const points: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? tip : valley;
    points.push(`${(100 + Math.cos(angle) * r).toFixed(1)},${(100 + Math.sin(angle) * r).toFixed(1)}`);
  }
  return points.join(" ");
}

const SEAL_STAR = star(18, 90, 72);

type StarburstProps = React.HTMLAttributes<HTMLSpanElement> & {
  animated?: boolean;
  /** "burst": an uneven comic burst (4:3). "seal": a round sticker, a disc with a star inside (1:1). */
  variant?: "burst" | "seal";
};

/**
 * A two-tone starburst (outer `--burst-outer`, inner `--burst-inner`) with content on top.
 * `animated` pops it in, then it throbs and its spikes shake; static with reduced motion.
 */
export function Starburst({ children, className = "", animated = false, variant = "burst", ...rest }: StarburstProps) {
  const seal = variant === "seal";
  return (
    <span className={`${styles.burst} ${seal ? styles.seal : ""} ${animated ? styles.animated : ""} ${className}`} {...rest}>
      <svg
        className={styles.shape}
        viewBox={seal ? "0 0 200 200" : "-6 -6 212 162"}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {seal ? <circle className={styles.outer} cx="100" cy="100" r="100" /> : <polygon className={styles.outer} points={OUTER} />}
        <polygon className={styles.inner} points={seal ? SEAL_STAR : INNER} />
      </svg>
      <span className={styles.content}>{children}</span>
    </span>
  );
}
