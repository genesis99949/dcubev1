import { linearTiming, type TransitionPresentation, type TransitionPresentationComponentProps } from "@remotion/transitions";
import type React from "react";
import { AbsoluteFill, Easing, interpolate, useVideoConfig } from "remotion";
import { DCA, POUR_BUBBLES, POUR_STAR } from "../brand";

// "The pour" — the site's own page transition (css/pour.css + js/pour.js), rebuilt as a
// Remotion presentation: four bands in the beer palette rise from below (honey leads, cocoa
// lands last and holds the screen), the cream star appears with the last band while bubbles
// rise, then the stack unwinds upward — top band first — revealing the next scene.

/** Transition length in seconds. */
export const POUR_SECONDS = 1.6;

// Timeline inside the transition, in seconds (site: cover 800 ms, stagger 55 ms, reveal 300 ms).
const COVER = 0.62;
const STAGGER = 0.055;
const COVERED = COVER + 3 * STAGGER; // the entering scene may show from here on, under the cocoa band
const REVEAL_AT = 1.04;
const REVEAL = 0.32;
const ease = Easing.bezier(0.645, 0.045, 0.355, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const PourPresentation: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({
  children,
  presentationDirection,
  presentationProgress,
  presentationDurationInFrames,
}) => {
  const { fps, height } = useVideoConfig();
  // The outgoing scene simply stays put underneath; the overlay rides on the incoming one.
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const t = presentationProgress * (presentationDurationInFrames / fps);
  const unit = height / 1080;

  const band = (i: number) => {
    const rise = interpolate(t, [i * STAGGER, i * STAGGER + COVER], [100, 0], { ...clamp, easing: ease });
    const leave = interpolate(t, [REVEAL_AT + (3 - i) * STAGGER, REVEAL_AT + (3 - i) * STAGGER + REVEAL], [0, -100], {
      ...clamp,
      easing: ease,
    });
    return rise + leave;
  };
  const markIn = interpolate(t, [COVERED * 0.6, COVERED], [0, 1], clamp);
  const markOut = interpolate(t, [REVEAL_AT, REVEAL_AT + REVEAL * 0.6], [0, 1], clamp);
  const mark = markIn - markOut;
  const bubbleSpan = REVEAL_AT + REVEAL + 3 * STAGGER - COVERED * 0.5;
  const bubbleT = t - COVERED * 0.5;
  const bubblesAlpha = interpolate(bubbleT / bubbleSpan, [0, 0.12, 0.7, 1], [0, 1, 1, 0], clamp);
  const covered = t >= COVERED && t < REVEAL_AT + REVEAL + 3 * STAGGER + 0.5;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: t >= COVERED ? 1 : 0 }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
        {DCA.pour.map((color, i) => (
          <div
            key={color}
            style={{
              position: "absolute",
              left: "-6%",
              width: "112%",
              height: "100%",
              bottom: 0,
              background: color,
              translate: `0 ${band(i)}%`,
            }}
          />
        ))}
        {covered ? (
          <AbsoluteFill style={{ opacity: bubblesAlpha }}>
            {POUR_BUBBLES.map(([x, d, speed, delay]) => {
              const p = interpolate(bubbleT / bubbleSpan, [delay, 1], [0, 1], { ...clamp, easing: Easing.bezier(0.35, 0.6, 0.5, 1) });
              const size = d * 1.5 * unit;
              return (
                <span
                  key={`${x}-${d}`}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    bottom: "-10%",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: "rgba(253,238,223,.40)",
                    translate: `0 ${-height * 1.15 * speed * p}px`,
                    scale: String(0.6 + 0.4 * p),
                  }}
                />
              );
            })}
          </AbsoluteFill>
        ) : null}
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: mark }}>
          <svg width={110 * unit} height={110 * unit} viewBox="0 0 24 24" style={{ rotate: `${(1 - markIn) * -60}deg` }}>
            <path d={POUR_STAR} fill={DCA.colors.creamSoft} />
          </svg>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const pour = (): TransitionPresentation<Record<string, never>> => ({ component: PourPresentation, props: {} });

/** Linear timing for the pour (its easing lives inside the presentation). */
export const pourTiming = (fps: number) => linearTiming({ durationInFrames: Math.round(POUR_SECONDS * fps) });

/** Seconds into the transition at which the next scene is fully covered and starts to show. */
export const POUR_COVERED = COVERED;

/** Seconds into the transition at which the bands start to unwind and the next scene shows. */
export const POUR_REVEAL = REVEAL_AT;
