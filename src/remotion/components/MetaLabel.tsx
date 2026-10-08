import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../brand";
import { FONT } from "../fonts";
import { useLayout } from "../lib/layout";
import { EASE, progress } from "../lib/motion";

type MetaLabelProps = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly color?: string;
  /** Font size in units (1 unit = 1px at 1080p). */
  readonly size?: number;
  readonly style?: React.CSSProperties;
};

/** Small monospaced uppercase label — captions, indices, credits. */
export const MetaLabel: React.FC<MetaLabelProps> = ({
  children,
  delay = 0,
  color = BRAND.colors.muted,
  size = 24,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { unit } = useLayout();
  const p = progress(frame, fps, delay, 0.8, EASE.out);

  return (
    <div
      style={{
        fontFamily: FONT.mono,
        fontSize: size * unit,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        color,
        opacity: p,
        translate: `0 ${(1 - p) * 12 * unit}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
