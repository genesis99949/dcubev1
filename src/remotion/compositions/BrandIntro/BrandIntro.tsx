import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EASE } from "../../lib/motion";
import { CUBE_FACE_CHANGES, CubeScene } from "./scenes/CubeScene";
import { INTRO_DOT, IntroScene } from "./scenes/IntroScene";
import { OUTRO_DOT, OutroScene } from "./scenes/OutroScene";
import { getBrandIntroTimeline } from "./timing";

export type BrandIntroProps = {
  readonly name: string;
  /** Line under the wordmark in the intro. */
  readonly subtitle: string;
  readonly year: string;
  /** Line under the wordmark in the outro. */
  readonly tagline: string;
  readonly accentColor: string;
  /** Sound effects synced to the transitions, cube turns and accent pops. */
  readonly sfx: boolean;
  /** Optional music bed: a path inside public/, e.g. "audio/music.mp3". Empty = none. */
  readonly soundtrack: string;
};

/**
 * The Dcube brand film: wordmark → the cube turning through its six faces (services) → sign-off.
 * Scene lengths live in ./timing.ts (seconds); sound effects are placed from
 * the same timeline, so they stay in sync when you change durations or fps.
 */
export const BrandIntro: React.FC<BrandIntroProps> = ({
  name,
  subtitle,
  year,
  tagline,
  accentColor,
  sfx,
  soundtrack,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = getBrandIntroTimeline(fps);
  const transition = linearTiming({ durationInFrames: t.overlap, easing: EASE.inOut });
  // Whooshes peak mid-transition; the sample's peak is ~0.45s in.
  const whooshLead = Math.round(0.45 * fps) - Math.round(t.overlap / 2);

  return (
    <AbsoluteFill>
      <TransitionSeries name="Scenes">
        <TransitionSeries.Sequence name="Intro" durationInFrames={t.intro} premountFor={fps}>
          <IntroScene title={name} subtitle={subtitle} year={year} accentColor={accentColor} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={transition} />
        <TransitionSeries.Sequence name="Cube" durationInFrames={t.cube} premountFor={fps}>
          <CubeScene headline="Six faces. One cube." accentColor={accentColor} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={transition} />
        <TransitionSeries.Sequence name="Outro" durationInFrames={t.outro} premountFor={fps}>
          <OutroScene title={name} tagline={tagline} year={year} accentColor={accentColor} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {sfx ? (
        <>
          {/* One whoosh per transition, derived from the timeline. */}
          <Audio name="Whoosh 1" src={staticFile("audio/whoosh.wav")} from={t.starts.cube - whooshLead} volume={0.55} premountFor={fps} />
          <Audio name="Whoosh 2" src={staticFile("audio/whoosh.wav")} from={t.starts.outro - whooshLead} volume={0.55} premountFor={fps} />
          {/* Ticks land on the accent-dot pops, and softer ones when the dot snaps into a square… */}
          <Audio name="Tick intro" src={staticFile("audio/tick.wav")} from={Math.round(INTRO_DOT.pop * fps)} volume={0.7} premountFor={fps} />
          <Audio
            name="Snap intro"
            src={staticFile("audio/tick.wav")}
            from={Math.round((INTRO_DOT.square + INTRO_DOT.squareDuration) * fps)}
            volume={0.45}
            premountFor={fps}
          />
          <Audio name="Tick outro" src={staticFile("audio/tick.wav")} from={t.starts.outro + Math.round(OUTRO_DOT.pop * fps)} volume={0.7} premountFor={fps} />
          <Audio
            name="Snap outro"
            src={staticFile("audio/tick.wav")}
            from={t.starts.outro + Math.round((OUTRO_DOT.square + OUTRO_DOT.squareDuration) * fps)}
            volume={0.45}
            premountFor={fps}
          />
          {/* …and, softer, on every turn of the cube. */}
          {CUBE_FACE_CHANGES.map((sec, i) => (
            <Audio
              key={sec}
              name={`Tick cube ${i + 1}`}
              src={staticFile("audio/tick.wav")}
              from={t.starts.cube + Math.round(sec * fps)}
              volume={0.32}
              premountFor={fps}
            />
          ))}
        </>
      ) : null}

      {soundtrack ? (
        <Audio
          name="Soundtrack"
          src={staticFile(soundtrack)}
          premountFor={fps}
          volume={interpolate(
            frame,
            [0, fps, durationInFrames - 1.5 * fps, durationInFrames],
            [0, 0.8, 0.8, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )}
        />
      ) : null}
    </AbsoluteFill>
  );
};
