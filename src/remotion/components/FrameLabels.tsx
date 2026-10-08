import type React from "react";
import { AbsoluteFill } from "remotion";
import { BRAND } from "../brand";
import { useLayout } from "../lib/layout";
import { MetaLabel } from "./MetaLabel";

type FrameLabelsProps = {
  readonly topLeft?: string;
  readonly topRight?: string;
  readonly bottomLeft?: string;
  readonly bottomRight?: string;
  readonly color?: string;
  /** Seconds before the first label appears; the others follow with a stagger. */
  readonly delay?: number;
};

/** Four corner labels inside the safe area — the editorial "frame" of the brand. */
export const FrameLabels: React.FC<FrameLabelsProps> = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  color = BRAND.colors.muted,
  delay = 0,
}) => {
  const { margin } = useLayout();
  const corner = (position: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    ...position,
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {topLeft ? (
        <MetaLabel color={color} delay={delay} style={corner({ top: margin, left: margin })}>
          {topLeft}
        </MetaLabel>
      ) : null}
      {topRight ? (
        <MetaLabel color={color} delay={delay + 0.08} style={corner({ top: margin, right: margin })}>
          {topRight}
        </MetaLabel>
      ) : null}
      {bottomLeft ? (
        <MetaLabel color={color} delay={delay + 0.16} style={corner({ bottom: margin, left: margin })}>
          {bottomLeft}
        </MetaLabel>
      ) : null}
      {bottomRight ? (
        <MetaLabel color={color} delay={delay + 0.24} style={corner({ bottom: margin, right: margin })}>
          {bottomRight}
        </MetaLabel>
      ) : null}
    </AbsoluteFill>
  );
};
