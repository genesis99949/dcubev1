import type React from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { SERVICES } from "../../../../content/services";
import { BRAND } from "../../../brand";
import { CssCube } from "../../../components/CssCube";
import { FrameLabels } from "../../../components/FrameLabels";
import { MetaLabel } from "../../../components/MetaLabel";
import { SplitText } from "../../../components/SplitText";
import { FONT } from "../../../fonts";
import { angleDelta, orientationFor } from "../../../lib/cube";
import { useLayout } from "../../../lib/layout";
import { EASE, SPRINGS, springAt } from "../../../lib/motion";

type CubeSceneProps = {
  readonly headline: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

const FACES = SERVICES.map((s, i) => ({
  number: String(i + 1).padStart(2, "0"),
  kicker: s.axis,
  title: s.name,
}));

const FIRST_TURN = 0.9; // seconds — the cube starts stepping through its faces
const STEP = 0.55; // seconds per face
const TURN = 0.38; // seconds of each turn (the rest is a hold)

/** Seconds (from the scene start) at which the active face changes — for syncing sound. */
export const CUBE_FACE_CHANGES = Array.from({ length: 5 }, (_, i) => FIRST_TURN + i * STEP + TURN / 2);

/** Scene 2 — the Dcube turns to each of its six faces, one service per face. */
const CubeSceneInner: React.FC<CubeSceneProps> = ({ headline, accentColor, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, height, unit, margin, isPortrait } = useLayout();
  const t = frame / fps;

  // Which face we're on, and how far through the turn to the next one.
  const step = Math.max(0, (t - FIRST_TURN) / STEP);
  const k = Math.min(FACES.length - 1, Math.floor(step));
  const turn = k >= FACES.length - 1 ? 0 : Math.min(1, ((step - k) * STEP) / TURN);
  const eased = EASE.inOut(turn);
  const from = orientationFor(k);
  const to = orientationFor(Math.min(k + 1, FACES.length - 1));
  const active = eased > 0.5 ? Math.min(k + 1, FACES.length - 1) : k;

  // Entrance: the cube spins in and settles on face 01.
  const enter = springAt(frame, fps, 0.1, SPRINGS.smooth, 1.1);
  const pitch = from.pitch + (to.pitch - from.pitch) * eased;
  const yaw = from.yaw + angleDelta(from.yaw, to.yaw) * eased - (1 - enter) * 140;

  // Leave room for the corners when the cube turns to its top/bottom faces.
  const size = Math.min(isPortrait ? width * 0.5 : height * 0.36, 400 * unit);
  const ink = BRAND.colors.paper;

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.ink, color: ink, fontFamily: FONT.sans, ...style }}>
      <FrameLabels topLeft={BRAND.name} bottomRight="02 — 03" color="rgba(242, 241, 236, 0.5)" delay={0.3} />
      <AbsoluteFill
        style={{
          flexDirection: isPortrait ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: isPortrait ? "center" : "space-between",
          gap: isPortrait ? 260 * unit : 0,
          padding: `${margin * 1.4}px ${margin}px`,
        }}
      >
        <div style={{ maxWidth: isPortrait ? "100%" : width * 0.38 }}>
          <MetaLabel delay={0.5} color="rgba(242, 241, 236, 0.5)" style={{ marginBottom: 28 * unit }}>
            Services
          </MetaLabel>
          <div style={{ fontSize: 96 * unit, fontWeight: 500, letterSpacing: "-0.045em", lineHeight: 0.98 }}>
            <SplitText text={headline} by="word" delay={0.6} stagger={0.09} />
          </div>
          <div
            style={{
              marginTop: 40 * unit,
              fontFamily: FONT.mono,
              fontSize: 26 * unit,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(242, 241, 236, 0.6)",
              opacity: interpolate(t, [1, 1.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            {String(active + 1).padStart(2, "0")} / 06 — {SERVICES[active].name}
          </div>
        </div>
        <div style={{ opacity: Math.min(1, enter * 1.5), scale: 0.7 + enter * 0.3, marginRight: isPortrait ? 0 : 60 * unit }}>
          <CssCube
            size={size}
            pitch={pitch}
            yaw={yaw}
            faces={FACES}
            active={active}
            activeFill={accentColor}
            colors={{ paper: BRAND.colors.paper, ink: BRAND.colors.ink, muted: BRAND.colors.muted, accent: accentColor }}
            fonts={{ sans: FONT.sans, mono: FONT.mono }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const cubeSceneSchema = {
  headline: { type: "text-content", default: "Six faces. One cube.", description: "Headline" },
  accentColor: { type: "color", default: BRAND.colors.accent, description: "Accent color" },
} as const satisfies InteractivitySchema;

export const CubeScene = Interactive.withSchema({
  Component: CubeSceneInner,
  componentName: "<CubeScene>",
  schema: cubeSceneSchema,
  wrapInSequence: true,
});
