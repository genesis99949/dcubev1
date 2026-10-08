import { Video } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { mix } from "../../../lib/motion";
import { PF } from "../brand";
import { BrowserFrame, PfLabel, PhoneFrame, Screen } from "./Devices";

// Device layouts shared by the showcase video (animated via `enter`, 0 → 1)
// and the presentation stills (enter = 1). All sizes are for 1920×1080.

const MEDIA = "remotion/pureflame";
const SHOTS = `${MEDIA}/shots`;

/** Colour at the top edge of each mobile capture (sampled with ffmpeg) → phone status bar. */
const STATUS_BAR: Record<string, string> = {
  "m-home-0.jpg": "#342C24",
  "m-home-1.jpg": "#FEFEFE",
  "m-home-2.jpg": "#13110F",
  "m-collection-0.jpg": "#62605F",
  "m-embera-0.jpg": "#62605F",
  "m-embera-1.jpg": "#FBF6F6",
  "mobile-scroll.mp4": "#423F3B",
};

/** Soft ember light behind the devices. */
export const Glow: React.FC<{ x?: string; y?: string; alpha?: number }> = ({ x = "50%", y = "50%", alpha = 0.18 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 70% 75% at ${x} ${y}, rgba(217,119,46,${alpha}) 0%, rgba(217,119,46,${alpha * 0.45}) 40%, transparent 85%)`,
    }}
  />
);

/**
 * Fine static grain. Dithers smooth dark gradients so they don't band into visible
 * rings after JPEG/H.264 compression.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => (
  <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
    <svg width="100%" height="100%">
      <filter id="pf-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#pf-grain)" />
    </svg>
  </AbsoluteFill>
);

type BrowserPageProps = {
  /** A recorded scroll in public/remotion/pureflame (e.g. "home-scroll.mp4")… */
  video?: string;
  /** …or a screenshot in public/remotion/pureflame/shots. */
  shot?: string;
  /** Stop the video early (seconds). */
  videoSeconds?: number;
  background: string;
  label?: string;
  enter?: number;
};

/** One page of the site in a desktop browser, with a small label above it. */
export const BrowserPage: React.FC<BrowserPageProps> = ({ video, shot, videoSeconds, background, label, enter = 1 }) => {
  const { fps } = useVideoConfig();
  const dark = background !== PF.colors.creamSoft && background !== PF.colors.cream;
  return (
    <AbsoluteFill style={{ backgroundColor: background }}>
      {dark ? <Glow y="55%" alpha={0.2} /> : null}
      {dark ? <Grain /> : null}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ opacity: enter, scale: mix(enter, 0.96, 1), translate: `0 ${(1 - enter) * 30 + 16}px` }}>
          {label ? (
            <PfLabel
              size={17}
              color={dark ? "rgba(254,255,253,0.55)" : "rgba(17,15,10,0.5)"}
              style={{ marginBottom: 20 }}
            >
              {label}
            </PfLabel>
          ) : null}
          <BrowserFrame width={1400} dark={dark}>
            {video ? (
              <Video
                src={staticFile(`${MEDIA}/${video}`)}
                muted
                premountFor={fps}
                durationInFrames={videoSeconds ? Math.round(videoSeconds * fps) : undefined}
                objectFit="cover"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            ) : shot ? (
              <Screen file={`${SHOTS}/${shot}`} />
            ) : null}
          </BrowserFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Desktop + phone, side by side. */
export const DevicesLayout: React.FC<{ desktop: string; phone: string; background: string }> = ({
  desktop,
  phone,
  background,
}) => {
  const dark = background !== PF.colors.creamSoft;
  return (
    <AbsoluteFill style={{ backgroundColor: background }}>
      {dark ? <Glow x="40%" alpha={0.16} /> : null}
      {dark ? <Grain /> : null}
      <div style={{ position: "absolute", left: 140, top: 100 }}>
        <BrowserFrame width={1340} dark={dark}>
          <Screen file={`${SHOTS}/${desktop}`} />
        </BrowserFrame>
      </div>
      <div style={{ position: "absolute", right: 165, bottom: 80 }}>
        <PhoneFrame width={330} status={STATUS_BAR[phone]}>
          <Screen file={`${SHOTS}/${phone}`} />
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

/** A row of phones. */
export const PhonesLayout: React.FC<{ screens: string[] }> = ({ screens }) => {
  const width = screens.length > 3 ? 330 : 360;
  return (
    <AbsoluteFill style={{ backgroundColor: PF.colors.charcoal }}>
      <Glow y="60%" alpha={0.2} />
      <Grain />
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: screens.length > 3 ? 70 : 90 }}>
        {screens.map((file, i) => (
          <div key={file} style={{ translate: `0 ${i % 2 === 0 ? 40 : -40}px` }}>
            <PhoneFrame width={width} status={STATUS_BAR[file]}>
              <Screen file={`${SHOTS}/${file}`} />
            </PhoneFrame>
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
