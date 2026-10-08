import type React from "react";
import { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { PF } from "../brand";
import { SIGNATURE } from "../vector";

type SignatureProps = {
  /** Rendered width in px. */
  width: number;
  /** Seconds before the pen starts writing. */
  writeAt?: number;
  /** 1 = the original hand-lettering speed (~4.9 s). */
  speed?: number;
  color?: string;
  /** Glowing ember at the pen tip while writing. */
  nib?: boolean;
  style?: React.CSSProperties;
};

/** Interpolated value of a per-source-frame array at a fractional index. */
const sample = (values: number[], index: number) => {
  if (index <= 0) return values[0] ?? 0;
  if (index >= values.length - 1) return values[values.length - 1] ?? 0;
  const i = Math.floor(index);
  return values[i] + (values[i + 1] - values[i]) * (index - i);
};

/**
 * "Pure Flame", written by hand. Each pen stroke reveals the real letter outlines
 * in the original writing order and rhythm, recorded from the logo's master file.
 */
export const Signature: React.FC<SignatureProps> = ({
  width,
  writeAt = 0,
  speed = 1,
  color = PF.colors.flame,
  nib = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maskId = `pf-sig-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Time on the source timeline (seconds), where writing begins at SIGNATURE.writeStart.
  const sourceTime = Math.max(0, (frame / fps - writeAt) * speed) + SIGNATURE.writeStart;
  const sourceFrame = sourceTime * SIGNATURE.fps;
  const writing = frame / fps >= writeAt && sourceTime < SIGNATURE.writeEnd + 0.05;

  const tipIndex = Math.min(sourceFrame, SIGNATURE.tip.x.length - 1);
  const tipX = sample(SIGNATURE.tip.x, tipIndex);
  const tipY = sample(SIGNATURE.tip.y, tipIndex);
  const tipCore = sample(SIGNATURE.tip.core, tipIndex);

  return (
    <svg
      viewBox={SIGNATURE.viewBox}
      width={width}
      height={width / SIGNATURE.aspect}
      style={{ display: "block", overflow: "visible", ...style }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" {...SIGNATURE.maskRegion}>
          {SIGNATURE.strokes.map((stroke) => {
            const p = sample(stroke.progress, sourceFrame - stroke.startFrame) / 100;
            return (
              <path
                key={stroke.name}
                d={stroke.d}
                pathLength={1}
                fill="none"
                stroke="white"
                strokeWidth={stroke.width * 1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 1"
                strokeDashoffset={1 - Math.max(0, Math.min(1, p))}
                opacity={p > 0 ? 1 : 0}
              />
            );
          })}
        </mask>
        <radialGradient id={`${maskId}-nib`}>
          <stop offset="0%" stopColor="#FFF4DA" />
          <stop offset="35%" stopColor={PF.colors.emberBright} stopOpacity={0.9} />
          <stop offset="100%" stopColor={PF.colors.ember} stopOpacity={0} />
        </radialGradient>
      </defs>
      <path d={SIGNATURE.glyphs} fill={color} fillRule="evenodd" mask={`url(#${maskId})`} />
      {nib && writing && tipCore > 0.01 ? (
        <circle cx={tipX} cy={tipY} r={34} fill={`url(#${maskId}-nib)`} opacity={Math.min(1, tipCore)} />
      ) : null}
    </svg>
  );
};
