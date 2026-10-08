import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { EASE, progress } from "../../../lib/motion";
import { PF } from "../brand";
import { FLAME } from "../vector";

type FlameMarkProps = {
  /** Rendered height in px. */
  height: number;
  /** Seconds before the flame ignites. Use a negative value to show it already lit. */
  igniteAt?: number;
  /** Seconds the ignition takes. */
  igniteDuration?: number;
  /** Subtle living-flame motion. */
  flicker?: boolean;
  /** Warm glow around the mark (0 = none). */
  glow?: number;
  color?: string;
  style?: React.CSSProperties;
};

/**
 * The PureFlame flame mark. Ignites from its base: it grows upward through a soft
 * mask while a glow blooms, then keeps a gentle, deterministic flicker.
 */
export const FlameMark: React.FC<FlameMarkProps> = ({
  height,
  igniteAt = 0,
  igniteDuration = 1.2,
  flicker = true,
  glow = 1,
  color = PF.colors.flame,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const lit = progress(frame, fps, igniteAt, igniteDuration, EASE.out);
  const bloom = progress(frame, fps, igniteAt + 0.15, igniteDuration * 0.9, EASE.out);

  // Deterministic flicker: a few incommensurate sines, strongest at the tip.
  const live = flicker ? lit : 0;
  const sway = (Math.sin(t * 5.3) * 0.6 + Math.sin(t * 8.9 + 1.3) * 0.4) * 1.6 * live;
  const stretch = 1 + (Math.sin(t * 6.7 + 0.4) * 0.5 + Math.sin(t * 11.1) * 0.5) * 0.018 * live;
  const pulse = 0.85 + (Math.sin(t * 3.1) * 0.5 + 0.5) * 0.15;

  const width = height * FLAME.aspect;
  // Soft edge that rises from the base: fully hidden at lit=0, fully visible at lit=1.
  const edge = lit * 118;
  const mask = `linear-gradient(to top, black ${edge - 18}%, transparent ${edge}%)`;

  return (
    // Outer layer: transform + glow (the glow must not be clipped by the mask).
    <div
      style={{
        width,
        height,
        position: "relative",
        scale: `${0.92 + lit * 0.08} ${(0.55 + lit * 0.45) * stretch}`,
        transformOrigin: "50% 100%",
        rotate: `${sway * 0.4}deg`,
        filter:
          glow > 0 && bloom > 0
            ? `drop-shadow(0 0 ${height * 0.05 * bloom * pulse * glow}px ${PF.colors.emberBright}) drop-shadow(0 0 ${height * 0.2 * bloom * pulse * glow}px rgba(240,145,63,${0.4 * bloom * glow}))`
            : undefined,
        ...style,
      }}
    >
      <div style={{ width, height, WebkitMaskImage: mask, maskImage: mask, opacity: Math.min(1, lit * 3) }}>
        <svg viewBox={FLAME.viewBox} width={width} height={height} style={{ display: "block", overflow: "visible" }}>
          <path d={FLAME.d} fill={color} fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};
