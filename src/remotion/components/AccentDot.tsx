import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { EASE, SPRINGS, progress, springAt } from "../lib/motion";

type AccentDotProps = {
  /** Diameter in px (pass `n * unit` from useLayout for resolution independence). */
  readonly size: number;
  readonly delay?: number;
  readonly color?: string;
  /**
   * Seconds at which the dot turns into a square (the Dcube mark). Omit to stay round.
   * The corners sharpen while it makes a quarter turn and settles.
   */
  readonly squareAt?: number;
  readonly squareDuration?: number;
  readonly style?: React.CSSProperties;
};

/** The brand's accent full stop. Pops in with a spring, then can become a square. */
export const AccentDot: React.FC<AccentDotProps> = ({
  size,
  delay = 0,
  color = BRAND.colors.accent,
  squareAt,
  squareDuration = 0.6,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springAt(frame, fps, delay, SPRINGS.bouncy);
  const morph = squareAt === undefined ? 0 : progress(frame, fps, squareAt, squareDuration, EASE.inOut);
  // A small "breath" mid-morph so the change reads as a deliberate snap.
  const breathe = 1 + Math.sin(morph * Math.PI) * 0.12;

  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: `${(1 - morph) * 50}%`,
        backgroundColor: color,
        scale: pop * breathe,
        rotate: `${morph * 90}deg`,
        ...style,
      }}
    />
  );
};
