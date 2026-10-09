import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { toFrames } from "../../config";
import { EASE, progress } from "../../lib/motion";
import { PF } from "./brand";
import { BrowserPage } from "./components/Layouts";

// Scene lengths in seconds — each plays a real, frame-by-frame scroll recording of the site
// (scripts/site-capture/record.mjs → public/remotion/pureflame/*-scroll.mp4).
// The collection page is not in this film: the case study shows it in its own mockup video
// (public/videos/pureflame/collection-field.mp4), and every view appears only once.
export const PF_SHOWCASE_SECONDS = {
  home: 8.4,
  about: 8.8,
  overlap: 0.6,
} as const;

export const getPfShowcaseDuration = (fps: number) => {
  const s = PF_SHOWCASE_SECONDS;
  return toFrames(s.home, fps) + toFrames(s.about, fps) - toFrames(s.overlap, fps);
};

const Page: React.FC<{ video: string; seconds: number; background: string; label: string; first?: boolean }> = ({
  video,
  seconds,
  background,
  label,
  first,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <BrowserPage
      video={video}
      videoSeconds={seconds}
      background={background}
      label={label}
      enter={first ? progress(frame, fps, 0, 0.9, EASE.out) : 1}
    />
  );
};

/** The PureFlame website in motion: homepage → about. */
export const PureFlameShowcase: React.FC = () => {
  const { fps } = useVideoConfig();
  const s = PF_SHOWCASE_SECONDS;
  const t = linearTiming({ durationInFrames: toFrames(s.overlap, fps), easing: EASE.inOut });
  return (
    <TransitionSeries name="PureFlame website">
      <TransitionSeries.Sequence name="Homepage" durationInFrames={toFrames(s.home, fps)} premountFor={fps}>
        <Page first video="home-scroll.mp4" seconds={s.home} background={PF.colors.oliveDeep} label="01 — Homepage" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="About" durationInFrames={toFrames(s.about, fps)} premountFor={fps}>
        <Page video="about-scroll.mp4" seconds={s.about} background={PF.colors.charcoal} label="02 — About us" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
