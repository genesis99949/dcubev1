import type React from "react";
import { CUBE_FACES, faceLight } from "../lib/cube";

export type CubeFaceContent = {
  number: string;
  kicker: string;
  title: string;
};

type CssCubeProps = {
  /** Edge length in px. */
  size: number;
  /** Orientation in degrees (CSS: rotateX(pitch) rotateY(yaw)). */
  pitch: number;
  yaw: number;
  faces: CubeFaceContent[];
  /** Highlighted face (inverted colours). */
  active?: number;
  colors: { paper: string; ink: string; muted: string; accent: string };
  /** Fill of the active face (default: ink). Use the accent on dark backgrounds. */
  activeFill?: string;
  fonts: { sans: string; mono: string };
  onFaceClick?: (index: number) => void;
};

/**
 * A solid CSS 3D cube with content on each face. Pure React (no Remotion / Next imports),
 * so it renders identically in the website hero and in Remotion videos.
 */
export const CssCube: React.FC<CssCubeProps> = ({
  size,
  pitch,
  yaw,
  faces,
  active,
  colors,
  fonts,
  activeFill,
  onFaceClick,
}) => {
  const accentFace = activeFill !== undefined && activeFill !== colors.ink;
  const half = size / 2;
  const pad = size * 0.075;
  return (
    <div style={{ width: size, height: size, perspective: size * 5.5 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${pitch}deg) rotateY(${yaw}deg)`,
        }}
      >
        {CUBE_FACES.map((face, i) => {
          const content = faces[i];
          const isActive = i === active;
          const shade = (1 - faceLight(i, pitch, yaw)) * (isActive && !accentFace ? 0.35 : 0.16);
          return (
            <div
              key={i}
              onClick={onFaceClick ? () => onFaceClick(i) : undefined}
              style={{
                position: "absolute",
                inset: 0,
                transform: `${face.place} translateZ(${half}px)`,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: isActive ? (activeFill ?? colors.ink) : colors.paper,
                color: isActive && !accentFace ? colors.paper : colors.ink,
                boxShadow: `inset 0 0 0 ${Math.max(1, size * 0.003)}px ${colors.ink}`,
                padding: pad,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: onFaceClick ? "pointer" : undefined,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: fonts.mono,
                  fontSize: Math.max(10, size * 0.034),
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isActive ? (accentFace ? colors.ink : colors.paper) : colors.muted,
                }}
              >
                <span>{content?.number}</span>
                <span>{content?.kicker}</span>
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 500,
                  fontSize: size * 0.088,
                  lineHeight: 1.02,
                  letterSpacing: "-0.035em",
                }}
              >
                {content?.title}
                {isActive && !accentFace ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: size * 0.028,
                      height: size * 0.028,
                      marginLeft: size * 0.018,
                      borderRadius: "50%",
                      background: colors.accent,
                    }}
                  />
                ) : null}
              </div>
              {/* Light: faces turned away from the light get slightly darker. */}
              <div style={{ position: "absolute", inset: 0, background: "#000", opacity: shade, pointerEvents: "none" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
