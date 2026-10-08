import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { EASE, progress } from "../lib/motion";

type MaskRevealProps = {
  readonly children: React.ReactNode;
  /** Seconds before the reveal starts. */
  readonly delay?: number;
  /** Seconds the reveal takes. */
  readonly duration?: number;
  /** Where the content slides in from. */
  readonly from?: "below" | "above";
  /** Optional exit: seconds at which the content slides out (opposite side). */
  readonly exitAt?: number;
  readonly exitDuration?: number;
  readonly style?: React.CSSProperties;
};

/**
 * Slides content into view from behind an invisible mask — the classic
 * editorial text reveal. Works for any inline content (text, icons, numbers).
 */
export const MaskReveal: React.FC<MaskRevealProps> = ({
  children,
  delay = 0,
  duration = 0.9,
  from = "below",
  exitAt,
  exitDuration = 0.5,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = progress(frame, fps, delay, duration, EASE.out);
  const exit =
    exitAt === undefined ? 0 : progress(frame, fps, exitAt, exitDuration, EASE.in);
  const direction = from === "below" ? 1 : -1;
  // 150% (not 100%) so the glyph fully clears the (padded) mask.
  const offset = ((1 - enter) * 150 - exit * 150) * direction;

  return (
    <span
      style={{
        display: "inline-block",
        // Clip vertically only: with tight (negative) letter-spacing, glyphs overhang their
        // box sideways, and a horizontal clip would cut them.
        overflowX: "visible",
        overflowY: "clip",
        verticalAlign: "top",
        // Room above and below for overshoots and descenders, compensated so layout doesn't shift.
        paddingTop: "0.15em",
        marginTop: "-0.15em",
        paddingBottom: "0.2em",
        marginBottom: "-0.2em",
        ...style,
      }}
    >
      <span style={{ display: "inline-block", translate: `0 ${offset}%` }}>
        {children}
      </span>
    </span>
  );
};
