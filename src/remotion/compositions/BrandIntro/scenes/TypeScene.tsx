import type React from "react";
import {
  AbsoluteFill,
  Interactive,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { BRAND } from "../../../brand";
import { FrameLabels } from "../../../components/FrameLabels";
import { MetaLabel } from "../../../components/MetaLabel";
import { SplitText } from "../../../components/SplitText";
import { FONT } from "../../../fonts";
import { useLayout } from "../../../lib/layout";
import { inOut } from "../../../lib/motion";

type TypeSceneProps = {
  readonly first: string;
  readonly second: string;
  readonly third: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

const START = 0.35; // seconds — first word (after the incoming transition settles)
const EVERY = 1.0; // seconds between words
const HOLD = 0.8; // seconds a word stays before leaving

/** Scene 3 — kinetic typography cycling through the disciplines. */
const TypeSceneInner: React.FC<TypeSceneProps> = ({
  first,
  second,
  third,
  accentColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, unit, margin } = useLayout();
  const words = [first, second, third];
  const fontSize = Math.min(width * 0.16, 300 * unit);
  const seconds = frame / fps;
  const current = Math.min(words.length, Math.max(1, Math.floor((seconds - START) / EVERY) + 1));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.colors.paper,
        color: BRAND.colors.ink,
        fontFamily: FONT.sans,
        ...style,
      }}
    >
      <FrameLabels topLeft={BRAND.name} topRight="Disciplines" bottomRight="03 — 04" delay={0.2} />
      {words.map((word, i) => {
        const at = START + i * EVERY;
        // The last word stays on screen and leaves with the scene transition.
        const exitAt = i < words.length - 1 ? at + HOLD : undefined;
        const bar = inOut(
          frame,
          fps,
          { at: at + 0.15, duration: 0.6 },
          exitAt === undefined ? undefined : { at: exitAt, duration: 0.35 },
        );

        return (
          <AbsoluteFill
            key={`${word}-${i}`}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              style={{
                fontSize,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              <SplitText
                text={word}
                by="char"
                delay={at}
                stagger={0.025}
                duration={0.7}
                exitAt={exitAt}
                exitStagger={0.015}
                exitDuration={0.35}
              />
            </div>
            <div
              style={{
                width: fontSize * 0.9,
                height: 10 * unit,
                marginTop: 28 * unit,
                backgroundColor: accentColor,
                scale: `${Math.max(0, bar)} 1`,
                transformOrigin: exitAt !== undefined && frame / fps > exitAt ? "100% 50%" : "0% 50%",
              }}
            />
          </AbsoluteFill>
        );
      })}
      <AbsoluteFill
        style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: margin }}
      >
        <MetaLabel delay={0.3} color={BRAND.colors.ink}>
          {String(current).padStart(2, "0")} / {String(words.length).padStart(2, "0")}
        </MetaLabel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const typeSceneSchema = {
  first: { type: "text-content", default: "Web", description: "First word" },
  second: { type: "text-content", default: "Branding", description: "Second word" },
  third: { type: "text-content", default: "Marketing", description: "Third word" },
  accentColor: { type: "color", default: BRAND.colors.accent, description: "Accent color" },
} as const satisfies InteractivitySchema;

export const TypeScene = Interactive.withSchema({
  Component: TypeSceneInner,
  componentName: "<TypeScene>",
  schema: typeSceneSchema,
  wrapInSequence: true,
});
