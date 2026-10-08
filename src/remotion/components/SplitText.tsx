import type React from "react";
import { MaskReveal } from "./MaskReveal";

type SplitTextProps = {
  readonly text: string;
  /** Animate per character or per word. */
  readonly by?: "char" | "word";
  /** Seconds before the first unit starts. */
  readonly delay?: number;
  /** Seconds between units. */
  readonly stagger?: number;
  /** Seconds each unit takes. */
  readonly duration?: number;
  readonly from?: "below" | "above";
  /** Optional exit (seconds); units leave with the same stagger. */
  readonly exitAt?: number;
  readonly exitStagger?: number;
  readonly exitDuration?: number;
  readonly style?: React.CSSProperties;
};

/** Kinetic typography: reveals text unit by unit with a stagger. */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  by = "char",
  delay = 0,
  stagger = 0.03,
  duration = 0.9,
  from = "below",
  exitAt,
  exitStagger = 0.02,
  exitDuration = 0.45,
  style,
}) => {
  const units = by === "char" ? Array.from(text) : text.split(" ");

  return (
    <span style={{ display: "inline-block", whiteSpace: "pre", ...style }}>
      {units.map((unit, i) => (
        <MaskReveal
          key={`${unit}-${i}`}
          delay={delay + i * stagger}
          duration={duration}
          from={from}
          exitAt={exitAt === undefined ? undefined : exitAt + i * exitStagger}
          exitDuration={exitDuration}
        >
          {by === "char" ? (unit === " " ? " " : unit) : unit}
          {by === "word" && i < units.length - 1 ? " " : null}
        </MaskReveal>
      ))}
    </span>
  );
};
