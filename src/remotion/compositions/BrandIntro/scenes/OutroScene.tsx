import type React from "react";
import {
  AbsoluteFill,
  Interactive,
  type InteractivitySchema,
} from "remotion";
import { BRAND } from "../../../brand";
import { AccentDot } from "../../../components/AccentDot";
import { FrameLabels } from "../../../components/FrameLabels";
import { Hairline } from "../../../components/Hairline";
import { MetaLabel } from "../../../components/MetaLabel";
import { SplitText } from "../../../components/SplitText";
import { FONT } from "../../../fonts";
import { useLayout } from "../../../lib/layout";

type OutroSceneProps = {
  readonly title: string;
  readonly tagline: string;
  readonly year: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

/** When the accent dot pops in and turns into a square (seconds) — also used to sync sound. */
export const OUTRO_DOT = { pop: 1.2, square: 1.8, squareDuration: 0.6 } as const;

/** Scene 3 — sign-off. Ends on a clean, holdable frame (good as a poster). */
const OutroSceneInner: React.FC<OutroSceneProps> = ({
  title,
  tagline,
  year,
  accentColor,
  style,
}) => {
  const { width, unit, isPortrait } = useLayout();
  const titleSize = Math.min(width * (isPortrait ? 0.16 : 0.11), 220 * unit);
  const muted = "rgba(242, 241, 236, 0.5)";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.ink,
        color: BRAND.colors.paper,
        fontFamily: FONT.sans,
        ...style,
      }}
    >
      <FrameLabels topLeft={`Portfolio — ${year}`} bottomRight="03 — 03" color={muted} delay={0.4} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              fontSize: titleSize,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
            }}
          >
            <SplitText text={title} by="char" delay={0.45} stagger={0.04} duration={1} />
            <AccentDot
              size={titleSize * 0.18}
              delay={OUTRO_DOT.pop}
              squareAt={OUTRO_DOT.square}
              squareDuration={OUTRO_DOT.squareDuration}
              color={accentColor}
              // Room for the quarter turn: a square's diagonal is wider than the dot.
              style={{ marginLeft: titleSize * 0.11, marginBottom: titleSize * 0.06 }}
            />
          </div>
          <div style={{ width: "100%", margin: `${36 * unit}px 0 ${28 * unit}px` }}>
            <Hairline color="rgba(242, 241, 236, 0.3)" delay={0.8} duration={1} origin="center" />
          </div>
          <MetaLabel delay={1.3} size={26} color={muted}>
            {tagline}
          </MetaLabel>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const outroSceneSchema = {
  title: { type: "text-content", default: "Dcube", description: "Title" },
  tagline: {
    type: "text-content",
    default: "Available for new projects",
    description: "Tagline",
  },
  year: { type: "text-content", default: "2026", description: "Year" },
  accentColor: { type: "color", default: BRAND.colors.accent, description: "Accent color" },
} as const satisfies InteractivitySchema;

export const OutroScene = Interactive.withSchema({
  Component: OutroSceneInner,
  componentName: "<OutroScene>",
  schema: outroSceneSchema,
  wrapInSequence: true,
});
