import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MaskReveal } from "../../components/MaskReveal";
import { SplitText } from "../../components/SplitText";
import { toFrames } from "../../config";
import { EASE, SPRINGS, progress, springAt } from "../../lib/motion";
import { PF, PF_FONT } from "./brand";
import { PfLabel } from "./components/Devices";
import { FlameMark } from "./components/FlameMark";
import { Grain } from "./components/Layouts";
import { PureFlameLogo } from "./PureFlameLogo";

// Scene lengths in seconds; transitions overlap neighbouring scenes.
// Ends dark (naming) so it loops seamlessly back into the logo build.
export const PF_IDENTITY_SECONDS = {
  logo: 7.2,
  palette: 3.2,
  type: 3.4,
  naming: 4.2,
  overlap: 0.7,
} as const;

export const getPfIdentityDuration = (fps: number) => {
  const s = PF_IDENTITY_SECONDS;
  return (
    toFrames(s.logo, fps) + toFrames(s.palette, fps) + toFrames(s.type, fps) + toFrames(s.naming, fps) -
    3 * toFrames(s.overlap, fps)
  );
};

const PAD = 120;
const muted = (hex: string, alpha: number) =>
  `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${alpha})`;

const SWATCHES = [
  { name: "Charcoal", hex: PF.colors.charcoal, ink: PF.colors.cream },
  { name: "Olive", hex: PF.colors.olive, ink: PF.colors.cream },
  { name: "Ember", hex: PF.colors.ember, ink: PF.colors.cream },
  { name: "Brass", hex: PF.colors.brass, ink: PF.colors.charcoal },
  { name: "Cream", hex: PF.colors.cream, ink: PF.colors.charcoal },
];

/** 02 — the palette rises as five editorial colour columns. */
const PaletteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: PF.colors.creamSoft, color: PF.colors.charcoal }}>
      <PfLabel color={muted(PF.colors.charcoal, 0.55)} style={{ position: "absolute", left: PAD, top: 104 }}>
        02 — Colour
      </PfLabel>
      <div style={{ position: "absolute", left: PAD, top: 150, fontFamily: PF_FONT.serif, fontSize: 80, letterSpacing: "-0.01em" }}>
        <SplitText text="Charcoal, olive & ember." by="word" delay={0.35} stagger={0.07} duration={0.9} />
      </div>
      <div style={{ position: "absolute", left: PAD, right: PAD, top: 380, bottom: 110, display: "flex" }}>
        {SWATCHES.map((s, i) => {
          const rise = springAt(frame, fps, 0.45 + i * 0.1, SPRINGS.smooth, 1.1);
          const text = progress(frame, fps, 0.9 + i * 0.1, 0.7, EASE.out);
          return (
            <div
              key={s.name}
              style={{
                flex: 1,
                backgroundColor: s.hex,
                color: s.ink,
                scale: `1 ${rise}`,
                transformOrigin: "50% 100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 30,
                boxShadow: s.name === "Cream" ? `inset 0 0 0 1px ${muted(PF.colors.charcoal, 0.12)}` : undefined,
              }}
            >
              <div style={{ opacity: text, translate: `0 ${(1 - text) * 12}px` }}>
                <div style={{ fontFamily: PF_FONT.serif, fontSize: 38 }}>{s.name}</div>
                <div style={{ fontFamily: PF_FONT.sans, fontSize: 18, letterSpacing: "0.14em", opacity: 0.7, marginTop: 8 }}>
                  {s.hex.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** 03 — editorial serif + utility sans, shown as type specimens. */
const TypeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = (delay: number) => {
    const p = progress(frame, fps, delay, 0.8, EASE.out);
    return { opacity: p, translate: `0 ${(1 - p) * 14}px` };
  };
  const line: React.CSSProperties = { fontFamily: PF_FONT.serif, fontSize: 50, lineHeight: 1.22, letterSpacing: "0.01em" };
  return (
    <AbsoluteFill style={{ backgroundColor: PF.colors.olive, color: PF.colors.cream }}>
      <PfLabel style={{ position: "absolute", left: PAD, top: 104 }}>03 — Typography</PfLabel>
      <div style={{ position: "absolute", left: PAD - 14, top: 230, fontFamily: PF_FONT.serif, fontSize: 520, lineHeight: 1, letterSpacing: "-0.03em" }}>
        <MaskReveal delay={0.3} duration={1.1}>
          Aa
        </MaskReveal>
      </div>
      <div style={{ position: "absolute", left: 900, right: PAD, top: 236 }}>
        <PfLabel size={18} style={fadeIn(0.5)}>
          Editorial · Georgia
        </PfLabel>
        <div style={{ marginTop: 22 }}>
          <div style={{ ...line, ...fadeIn(0.6) }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div style={{ ...line, ...fadeIn(0.7) }}>abcdefghijklmnopqrstuvwxyz</div>
          <div style={{ ...line, ...fadeIn(0.8), fontStyle: "italic", color: PF.colors.brass }}>ăâîșț — 0123456789 &amp;</div>
        </div>
        <div style={{ height: 1, background: muted(PF.colors.cream, 0.25), margin: "58px 0 32px" }} />
        <PfLabel size={18} style={fadeIn(1.1)}>
          Utility · Work Sans
        </PfLabel>
        <div
          style={{
            ...fadeIn(1.25),
            marginTop: 22,
            fontFamily: PF_FONT.sans,
            fontWeight: 500,
            fontSize: 28,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Aa Bb Cc 0123456789
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** 04 — the product names as a typographic system; the ember marker walks the list. */
const NamingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // The flame glides down the list once all names are in; the name beside it lights up.
  const last = PF.products.length - 1;
  const row = interpolate(t, [1.4, 3.4], [0, last], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.inOut,
  });
  const active = Math.round(row);
  const markerY = interpolate(t, [1.1, 1.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ROW = 150;
  return (
    <AbsoluteFill style={{ backgroundColor: PF.colors.charcoal, color: PF.colors.cream }}>
      <Grain />
      <PfLabel style={{ position: "absolute", left: PAD, top: 104 }}>04 — Naming</PfLabel>
      <div
        style={{
          position: "absolute",
          left: PAD,
          top: 160,
          width: 520,
          fontFamily: PF_FONT.serif,
          fontStyle: "italic",
          fontSize: 34,
          lineHeight: 1.35,
          color: muted(PF.colors.cream, 0.7),
          ...(() => {
            const p = progress(frame, fps, 0.6, 0.9, EASE.out);
            return { opacity: p, translate: `0 ${(1 - p) * 14}px` };
          })(),
        }}
      >
        Five tables, five names — one fire.
      </div>
      <div style={{ position: "absolute", left: 820, top: 150 }}>
        {PF.products.map((name, i) => {
          const isActive = i === active && markerY > 0;
          return (
            <div key={name} style={{ height: ROW, display: "flex", alignItems: "center", gap: 36 }}>
              <PfLabel size={18} color={isActive ? PF.colors.ember : muted(PF.colors.cream, 0.4)} style={{ width: 40 }}>
                {String(i + 1).padStart(2, "0")}
              </PfLabel>
              <div style={{ fontFamily: PF_FONT.serif, fontSize: 118, lineHeight: 1, color: isActive ? PF.colors.cream : muted(PF.colors.cream, 0.32) }}>
                <MaskReveal delay={0.25 + i * 0.12} duration={0.9}>
                  {name}
                </MaskReveal>
              </div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: -110, top: row * ROW + ROW / 2 - 45, opacity: markerY }}>
          <FlameMark height={90} igniteAt={1.1} igniteDuration={0.5} glow={0.8} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** PureFlame identity film: logo → palette → typography → naming. */
export const PureFlameIdentity: React.FC = () => {
  const { fps } = useVideoConfig();
  const s = PF_IDENTITY_SECONDS;
  const t = linearTiming({ durationInFrames: toFrames(s.overlap, fps), easing: EASE.inOut });
  return (
    <TransitionSeries name="PureFlame identity">
      <TransitionSeries.Sequence name="Logo" durationInFrames={toFrames(s.logo, fps)} premountFor={fps}>
        <PureFlameLogo background="charcoal" tagline={PF.tagline} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={t} />
      <TransitionSeries.Sequence name="Palette" durationInFrames={toFrames(s.palette, fps)} premountFor={fps}>
        <PaletteScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Typography" durationInFrames={toFrames(s.type, fps)} premountFor={fps}>
        <TypeScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={t} />
      <TransitionSeries.Sequence name="Naming" durationInFrames={toFrames(s.naming, fps)} premountFor={fps}>
        <NamingScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
