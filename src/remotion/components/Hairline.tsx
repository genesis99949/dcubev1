import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { useLayout } from "../lib/layout";
import { EASE, progress } from "../lib/motion";

type HairlineProps = {
  readonly delay?: number;
  readonly duration?: number;
  readonly orientation?: "horizontal" | "vertical";
  /** Which end the line grows from. */
  readonly origin?: "start" | "center" | "end";
  readonly color?: string;
  /** Thickness in units (1 unit = 1px at 1080p). */
  readonly thickness?: number;
  readonly style?: React.CSSProperties;
};

/** A thin rule that draws itself on. Fills its container's width (or height). */
export const Hairline: React.FC<HairlineProps> = ({
  delay = 0,
  duration = 1,
  orientation = "horizontal",
  origin = "start",
  color = BRAND.colors.ink,
  thickness = 2,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { unit } = useLayout();
  const p = progress(frame, fps, delay, duration, EASE.inOut);
  const horizontal = orientation === "horizontal";
  const originPct = origin === "start" ? "0%" : origin === "end" ? "100%" : "50%";

  return (
    <div
      style={{
        backgroundColor: color,
        width: horizontal ? "100%" : Math.max(1, thickness * unit),
        height: horizontal ? Math.max(1, thickness * unit) : "100%",
        scale: horizontal ? `${p} 1` : `1 ${p}`,
        transformOrigin: horizontal ? `${originPct} 50%` : `50% ${originPct}`,
        ...style,
      }}
    />
  );
};
