import type React from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { BRAND } from "../../../brand";
import { AccentDot } from "../../../components/AccentDot";
import { FrameLabels } from "../../../components/FrameLabels";
import { Hairline } from "../../../components/Hairline";
import { MaskReveal } from "../../../components/MaskReveal";
import { MetaLabel } from "../../../components/MetaLabel";
import { SplitText } from "../../../components/SplitText";
import { FONT } from "../../../fonts";
import { useLayout } from "../../../lib/layout";

type IntroSceneProps = {
  // Not `name`: that prop is reserved for the timeline label of interactive components.
  readonly title: string;
  readonly subtitle: string;
  readonly year: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

/** When the accent dot pops in and turns into a square (seconds) — also used to sync sound. */
export const INTRO_DOT = { pop: 1.25, square: 1.85, squareDuration: 0.6 } as const;

/** Scene 1 — the wordmark builds itself around a drawn hairline. */
const IntroSceneInner: React.FC<IntroSceneProps> = ({
  title,
  subtitle,
  year,
  accentColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, unit, margin, isPortrait } = useLayout();
  const wordmarkSize = Math.min(width * (isPortrait ? 0.24 : 0.2), 330 * unit);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.paper,
        color: BRAND.colors.ink,
        fontFamily: FONT.sans,
        ...style,
      }}
    >
      <FrameLabels
        topLeft={BRAND.name}
        topRight={`Portfolio — ${year}`}
        bottomLeft="Three axes · Six faces"
        bottomRight="01 — 03"
        delay={0.2}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `0 ${margin}px`,
          // Slow drift keeps the frame alive after the build.
          scale: interpolate(frame, [0, 3.4 * fps], [1, 1.025], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            fontSize: wordmarkSize,
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          }}
        >
          <SplitText text={title} by="char" delay={0.35} stagger={0.035} duration={1} />
          <AccentDot
            size={wordmarkSize * 0.16}
            delay={INTRO_DOT.pop}
            squareAt={INTRO_DOT.square}
            squareDuration={INTRO_DOT.squareDuration}
            color={accentColor}
            // Room for the quarter turn: a square's diagonal is wider than the dot.
            style={{ marginLeft: wordmarkSize * 0.09, marginBottom: wordmarkSize * 0.04 }}
          />
        </div>
        <Hairline delay={0.1} duration={1.2} style={{ margin: `${40 * unit}px 0` }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: wordmarkSize * 0.26,
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: BRAND.colors.muted,
            }}
          >
            <MaskReveal delay={0.7} duration={1.1} from="above">
              {subtitle}
            </MaskReveal>
          </div>
          <MetaLabel delay={1.1} size={28} color={BRAND.colors.ink}>
            ©{year}
          </MetaLabel>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const introSceneSchema = {
  title: { type: "text-content", default: "Dcube", description: "Title" },
  subtitle: { type: "text-content", default: "Web · Branding · Marketing", description: "Subtitle" },
  year: { type: "text-content", default: "2026", description: "Year" },
  accentColor: { type: "color", default: BRAND.colors.accent, description: "Accent color" },
} as const satisfies InteractivitySchema;

export const IntroScene = Interactive.withSchema({
  Component: IntroSceneInner,
  componentName: "<IntroScene>",
  schema: introSceneSchema,
  wrapInSequence: true,
});
