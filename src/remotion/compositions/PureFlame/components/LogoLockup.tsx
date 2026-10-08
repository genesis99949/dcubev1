import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE, mix, progress } from "../../../lib/motion";
import { PF, PF_FONT } from "../brand";
import { FLAME, SIGNATURE } from "../vector";
import { FlameMark } from "./FlameMark";
import { Signature } from "./Signature";

export type LockupTheme = "dark" | "light";

type LogoLockupProps = {
  /** Text under the lockup. Empty = none. */
  tagline: string;
  theme: LockupTheme;
  /** true: start from the finished lockup (no build-up animation). */
  static?: boolean;
  /** Overall scale (1 = sized for 1920×1080). */
  scale?: number;
};

// Lockup geometry at scale 1 (px).
const FLAME_BIG = 420;
const FLAME_SMALL = 280;
const SIG_WIDTH = 880;
const GAP = 34;

/**
 * Logo build: the flame ignites centre stage, settles beside the wordmark,
 * then "Pure Flame" is written by hand and the tagline appears.
 * Timing (s): ignite 0.2–1.4 · settle 1.4–2.3 · write 1.9–6.1 · tagline 5.8.
 */
export const LogoLockup: React.FC<LogoLockupProps> = ({ tagline, theme, static: isStatic = false, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = isStatic ? 100 : 0; // jump to the end state
  const f = frame + at * fps;

  const settle = progress(f, fps, 1.4, 0.9, EASE.inOut);
  const taglineIn = progress(f, fps, 5.8, 1, EASE.out);

  const flameH = mix(settle, FLAME_BIG, FLAME_SMALL) * scale;
  const flameW = FLAME_SMALL * FLAME.aspect * scale;
  const sigW = SIG_WIDTH * scale;
  const sigH = sigW / SIGNATURE.aspect;
  const lockupW = flameW + GAP * scale + sigW;
  // Flame x: centred at first, then at the lockup's left edge.
  const flameX = mix(settle, -(FLAME_BIG * FLAME.aspect * scale) / 2, -lockupW / 2);

  const ink = theme === "dark" ? PF.colors.cream : PF.colors.charcoal;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: 0, height: 0 }}>
        {/* Settled flame stands on the script's baseline. */}
        <div style={{ position: "absolute", left: flameX, bottom: mix(settle, -FLAME_BIG * 0.5 * scale, -sigH * 0.12) }}>
          <FlameMark height={flameH} igniteAt={isStatic ? -10 : 0.2} igniteDuration={1.2} glow={theme === "dark" ? 1 : 0.35} />
        </div>
        <div style={{ position: "absolute", left: -lockupW / 2 + flameW + GAP * scale, top: -sigH * 0.62 }}>
          <Signature width={sigW} writeAt={isStatic ? -60 : 1.9} speed={1.15} nib={theme === "dark"} />
        </div>
        {tagline ? (
          <div
            style={{
              position: "absolute",
              left: -lockupW / 2,
              width: lockupW,
              top: sigH * 0.55,
              display: "flex",
              justifyContent: "center",
              opacity: taglineIn,
              translate: `0 ${(1 - taglineIn) * 14 * scale}px`,
            }}
          >
            <span
              style={{
                fontFamily: PF_FONT.serif,
                fontStyle: "italic",
                fontSize: 46 * scale,
                color: ink,
                opacity: 0.85,
                letterSpacing: "0.01em",
              }}
            >
              {tagline}
            </span>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
