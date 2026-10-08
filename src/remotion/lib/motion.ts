// Animation helpers. Everything is expressed in SECONDS and converted with fps,
// so animations keep the same real-time speed at 24, 30 or 60 fps.
import { Easing, interpolate, spring, type SpringConfig } from "remotion";

export const EASE = {
  /** Confident entrances (expo-out). Default for things appearing. */
  out: Easing.bezier(0.16, 1, 0.3, 1),
  /** Scene-level moves and transitions. */
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  /** Exits — accelerate away. */
  in: Easing.bezier(0.7, 0, 0.84, 0),
  linear: Easing.linear,
} as const;

export const SPRINGS = {
  /** No bounce — calm, premium. */
  smooth: { damping: 200 },
  /** Quick with a tiny overshoot. */
  snappy: { damping: 18, stiffness: 180 },
  /** Playful pop. Use sparingly. */
  bouncy: { damping: 9, stiffness: 120 },
} as const satisfies Record<string, Partial<SpringConfig>>;

/**
 * Eased 0 → 1 progress between `start` and `start + duration` (seconds), clamped.
 */
export const progress = (
  frame: number,
  fps: number,
  start: number,
  duration: number,
  easing: (t: number) => number = EASE.out,
) => {
  if (duration <= 0) {
    return frame >= start * fps ? 1 : 0;
  }
  return interpolate(frame, [start * fps, (start + duration) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
};

/** A spring starting `delay` seconds in. Optionally stretched to `duration` seconds. */
export const springAt = (
  frame: number,
  fps: number,
  delay = 0,
  config: Partial<SpringConfig> = SPRINGS.smooth,
  duration?: number,
) =>
  spring({
    frame,
    fps,
    delay: Math.round(delay * fps),
    config,
    durationInFrames: duration ? Math.round(duration * fps) : undefined,
  });

/** Linear mix: p = 0 → `from`, p = 1 → `to`. */
export const mix = (p: number, from: number, to: number) => from + (to - from) * p;

/** Delay (seconds) for the `index`-th item of a staggered group. */
export const stagger = (index: number, each: number, base = 0) =>
  base + index * each;

/** Enter/exit helper: 0 before, 1 while visible, back to 0 after `exitAt`. */
export const inOut = (
  frame: number,
  fps: number,
  enter: { at: number; duration: number },
  exit?: { at: number; duration: number },
) => {
  const a = progress(frame, fps, enter.at, enter.duration, EASE.out);
  const b = exit ? progress(frame, fps, exit.at, exit.duration, EASE.in) : 0;
  return a - b;
};
