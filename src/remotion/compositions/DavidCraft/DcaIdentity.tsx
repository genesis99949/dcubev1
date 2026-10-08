import { TransitionSeries } from "@remotion/transitions";
import type React from "react";
import { AbsoluteFill, Img, Sequence, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { toFrames } from "../../config";
import { useLayout } from "../../lib/layout";
import { EASE, SPRINGS, mix, progress, springAt } from "../../lib/motion";
import { DCA, DCA_ART, DCA_FONT, tint } from "./brand";
import { FlyingHopper, Kicker, Ornament, Seal, Sparkle, Star, flight } from "./components/Marks";
import { POUR_REVEAL, pour, pourTiming } from "./components/Pour";
import { DCA_IDENTITY } from "./timing";

// David Craft Ale — identity film (Edition 02 brand board, animated):
// primary logo → splash mark & seal → the four → marquee, joined by the site's pour transition.

const C = DCA.colors;

/** Per-letter text; `style(i)` animates each letter. */
const Letters: React.FC<{ text: string; style: (i: number) => React.CSSProperties }> = ({ text, style }) => (
  <>
    {text.split("").map((ch, i) => (
      <span key={i} style={{ display: "inline-block", whiteSpace: "pre", ...style(i) }}>
        {ch}
      </span>
    ))}
  </>
);

/** Rising bubbles in the pour's cream tint, for dark grounds. */
const Bubbles: React.FC<{ count?: number; seed: string; alpha?: number }> = ({ count = 26, seed, alpha = 0.16 }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const { unit } = useLayout();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: count }, (_, i) => {
        const x = random(`${seed}-x-${i}`) * 100;
        const d = (8 + random(`${seed}-d-${i}`) * 26) * unit;
        const speed = (70 + random(`${seed}-s-${i}`) * 120) * unit;
        const start = random(`${seed}-o-${i}`) * (height + 200 * unit);
        const y = height + 60 * unit - ((start + t * speed) % (height + 200 * unit));
        const wobble = Math.sin(t * 2 + i) * 6 * unit;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: y,
              width: d,
              height: d,
              borderRadius: "50%",
              background: `rgba(253,238,223,${alpha})`,
              translate: `${wobble}px 0`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 01 primary logo */

const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { unit, margin } = useLayout();
  const t = frame / fps;

  const starPop = springAt(frame, fps, 0.2, SPRINGS.bouncy);
  const rules = progress(frame, fps, 0.35, 0.8, EASE.out);

  // Hopper flies in on an arc, then hovers.
  const arrive = progress(frame, fps, 0.6, 1.5, EASE.out);
  const path = flight(arrive, [-900 * unit, 300 * unit], [-380 * unit, -340 * unit], [0, 0], t, 0);
  const bob = Math.sin(t * 2.4) * 9 * unit * arrive;
  const sway = Math.sin(t * 1.7) * 2.5 * arrive;

  const tagline = progress(frame, fps, 1.5, 0.8, EASE.out);
  const kickers = progress(frame, fps, 0.2, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: C.cream }}>
      <Kicker n="01" color={C.cocoa} size={20 * unit} style={{ position: "absolute", left: margin, top: margin * 0.8, opacity: kickers }}>
        Primary logo
      </Kicker>
      <Kicker color={C.cocoa} size={20 * unit} style={{ position: "absolute", right: margin, top: margin * 0.8, opacity: kickers * 0.7 }}>
        Edition 02
      </Kicker>
      <div style={{ position: "absolute", left: width * 0.09, top: 170 * unit }}>
        <Sparkle size={44 * unit} color={C.brick} delay={1.9} />
      </div>
      <div style={{ position: "absolute", right: width * 0.1, bottom: 150 * unit }}>
        <Sparkle size={30 * unit} color={C.honeyDeep} delay={2.2} />
      </div>

      {/* Ambient Hopper drifting across the top (board: "ambient 24–56px · drifting"). */}
      {(() => {
        const p = progress(frame, fps, 1.2, 4.6, EASE.linear);
        const f = flight(p, [width + 120 * unit, 250 * unit], [width * 0.55, 120 * unit], [-160 * unit, 210 * unit], t, 8 * unit);
        return (
          <div style={{ position: "absolute", left: f.x, top: f.y, rotate: `${-f.bank}deg`, scale: "-1 1" }}>
            <FlyingHopper width={86 * unit} />
          </div>
        );
      })()}

      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 70 * unit, paddingTop: 20 * unit }}>
        <div style={{ position: "relative", width: 400 * unit, height: 336 * unit }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: -18 * unit,
              width: 300 * unit,
              height: 34 * unit,
              marginLeft: -150 * unit,
              borderRadius: "50%",
              background: C.honey,
              opacity: 0.55 * arrive,
              scale: String(mix(arrive, 0.4, 1) * (1 - bob / (180 * unit))),
            }}
          />
          <Img
            src={staticFile(`${DCA_ART}/hopper-hero.png`)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              translate: `${path.x}px ${path.y + bob}px`,
              rotate: `${path.bank * (1 - arrive) + sway}deg`,
              opacity: arrive > 0 ? 1 : 0,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Ornament scale={unit} progress={rules} starPop={starPop} star={46} />
          <div
            style={{
              fontFamily: DCA_FONT.display,
              fontSize: 200 * unit,
              lineHeight: 1,
              color: C.cocoa,
              letterSpacing: "0.01em",
              marginTop: 14 * unit,
            }}
          >
            <Letters
              text="DAVID"
              style={(i) => {
                const s = springAt(frame, fps, 0.45 + i * 0.07, SPRINGS.snappy);
                return { translate: `0 ${(1 - s) * -0.9}em`, rotate: `${(1 - s) * -12}deg`, opacity: Math.min(1, s * 3) };
              }}
            />
          </div>
          <div
            style={{
              fontFamily: DCA_FONT.display,
              fontSize: 106 * unit,
              lineHeight: 1.12,
              color: C.brick,
              letterSpacing: "0.08em",
              marginLeft: "0.08em",
              overflow: "hidden",
              paddingTop: 4 * unit,
            }}
          >
            <Letters
              text="CRAFT ALE"
              style={(i) => {
                const p = progress(frame, fps, 0.95 + i * 0.035, 0.6, EASE.out);
                return { translate: `0 ${(1 - p) * 110}%` };
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 22 * unit, marginTop: 24 * unit }}>
            <i style={{ display: "block", width: 104 * unit * tagline, height: 3 * unit, background: C.honeyDeep, borderRadius: 2 * unit, marginLeft: 104 * unit * (1 - tagline) }} />
            <span
              style={{
                fontFamily: DCA_FONT.body,
                fontWeight: 800,
                fontSize: 23 * unit,
                letterSpacing: `${mix(tagline, 0.5, 0.26)}em`,
                textTransform: "uppercase",
                color: C.cocoa,
                opacity: tagline,
                whiteSpace: "nowrap",
              }}
            >
              {DCA.tagline}
            </span>
            <i style={{ display: "block", width: 104 * unit * tagline, height: 3 * unit, background: C.honeyDeep, borderRadius: 2 * unit, marginRight: 104 * unit * (1 - tagline) }} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 02 splash mark & seal */

const SplashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { unit, margin } = useLayout();

  const star = springAt(frame, fps, 0.15, SPRINGS.bouncy);
  const word = progress(frame, fps, 0.3, 0.8, EASE.out);
  const sub = progress(frame, fps, 0.65, 0.9, EASE.out);

  const split = progress(frame, fps, 2.0, 0.95, EASE.inOut);
  const sealSize = 400 * unit;
  const roll = progress(frame, fps, 2.0, 1.1, EASE.out);
  const sealX = mix(roll, 1400 * unit, 330 * unit);
  // Rolling without slipping: angle = distance / radius.
  const rolled = (((1400 * unit - sealX) / (sealSize / 2)) * 180) / Math.PI;
  const captions = progress(frame, fps, 3.0, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: C.cocoa }}>
      <Bubbles seed="splash" />
      <Kicker n="02" numberColor={C.honey} color={C.creamSoft} size={20 * unit} style={{ position: "absolute", left: margin, top: margin * 0.8, opacity: progress(frame, fps, 0.2, 0.6) * 0.85 }}>
        Splash mark &amp; seal
      </Kicker>
      <div style={{ position: "absolute", right: margin * 1.2, top: margin * 1.6 }}>
        <Sparkle size={40 * unit} color={C.honey} delay={1.2} />
      </div>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", translate: `${split * -360 * unit}px 0` }}>
          <Star size={62 * unit} color={C.creamSoft} style={{ scale: String(star), rotate: `${(1 - star) * -180}deg`, marginBottom: 22 * unit }} />
          <div style={{ overflow: "hidden", paddingTop: 8 * unit }}>
            <div
              style={{
                fontFamily: DCA_FONT.mark,
                fontWeight: 900,
                fontSize: 172 * unit,
                lineHeight: 0.95,
                letterSpacing: "0.02em",
                color: C.creamSoft,
                translate: `0 ${(1 - word) * 105}%`,
              }}
            >
              DAVID
            </div>
          </div>
          <div
            style={{
              fontFamily: DCA_FONT.mark,
              fontWeight: 600,
              fontSize: 72 * unit,
              lineHeight: 1,
              letterSpacing: `${mix(sub, 0.6, 0.24)}em`,
              marginLeft: "0.12em",
              color: C.creamSoft,
              opacity: sub,
              marginTop: 8 * unit,
              whiteSpace: "nowrap",
            }}
          >
            CRAFT ALE
          </div>
          <Kicker color={C.creamSoft} size={17 * unit} style={{ marginTop: 46 * unit, opacity: captions * 0.6 }}>
            Splash mark · Archivo
          </Kicker>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ translate: `${sealX}px ${-14 * unit}px`, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Seal size={sealSize} spinSeconds={12} offsetDeg={-rolled} />
          <Kicker color={C.creamSoft} size={17 * unit} style={{ marginTop: 34 * unit, opacity: captions * 0.6 }}>
            Rotating seal
          </Kicker>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 03 the four */

/** Card ink per the board: dark text on Blonde, cream elsewhere; one sparkle per card. */
const CARD_STYLE: Record<string, { text: string; sparkle: string }> = {
  blonde: { text: "#2E1808", sparkle: C.brick },
  amber: { text: C.creamSoft, sparkle: C.creamSoft },
  ipa: { text: C.creamSoft, sparkle: C.creamSoft },
  dark: { text: C.creamSoft, sparkle: C.honey },
};

const BeerCard: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { unit } = useLayout();
  const beer = DCA.beers[index];
  const look = CARD_STYLE[beer.key];
  const w = 330 * unit;
  const h = 700 * unit;
  const t = frame / fps;

  const fillStart = 0.25 + index * 0.14;
  const fill = progress(frame, fps, fillStart, 1.05, EASE.inOut);
  const drop = springAt(frame, fps, 1.05 + index * 0.12, SPRINGS.bouncy);
  const label = progress(frame, fps, 1.45 + index * 0.1, 0.7, EASE.out);
  const tone = tint(beer.color, C.cream, 0.25);
  const crest = 14 * unit;

  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: 26 * unit, overflow: "hidden", background: C.paper, boxShadow: `inset 0 0 0 ${2 * unit}px ${tint(beer.color, C.cream, 0.7)}` }}>
      {/* the pour: tone rises from the bottom with a scalloped foam crest */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 104}%`, background: tone }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "100%",
            height: crest,
            background: `radial-gradient(circle ${crest}px at 50% 100%, ${tone} 0 97%, transparent 100%) ${Math.sin(t * 3 + index) * crest}px 0 / ${crest * 2}px ${crest}px repeat-x`,
          }}
        />
        {Array.from({ length: 7 }, (_, i) => {
          const sp = 0.25 + random(`b${index}-${i}`) * 0.5;
          const y = ((t - fillStart) * sp + random(`o${index}-${i}`)) % 1;
          const d = (5 + random(`d${index}-${i}`) * 9) * unit;
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${10 + random(`x${index}-${i}`) * 80}%`,
                bottom: `${y * 100}%`,
                width: d,
                height: d,
                borderRadius: "50%",
                background: "rgba(253,238,223,0.32)",
                opacity: fill < 1 ? 1 : Math.max(0, 1 - (t - fillStart - 1.05) * 0.8),
              }}
            />
          );
        })}
      </div>
      <div style={{ position: "absolute", right: 26 * unit, top: 26 * unit }}>
        <Sparkle size={30 * unit} color={look.sparkle} delay={1.7 + index * 0.1} />
      </div>
      <Img
        src={staticFile(`${DCA_ART}/bottle-${beer.key}.png`)}
        style={{
          position: "absolute",
          left: "50%",
          top: 46 * unit,
          height: 500 * unit,
          translate: `-50% ${(1 - drop) * -820 * unit}px`,
          rotate: `${(1 - drop) * 10}deg`,
          filter: `drop-shadow(0 ${14 * unit}px ${16 * unit}px rgba(46,26,14,0.28))`,
        }}
      />
      <div style={{ position: "absolute", left: 26 * unit, right: 26 * unit, bottom: 24 * unit, color: look.text }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontFamily: DCA_FONT.display, fontSize: 62 * unit, lineHeight: 1.05, translate: `0 ${(1 - label) * 105}%` }}>
            {beer.name.toUpperCase()}
          </div>
        </div>
        <div style={{ fontFamily: DCA_FONT.body, fontWeight: 800, fontSize: 17 * unit, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.55, opacity: label * 0.9, marginTop: 6 * unit }}>
          <div>
            {beer.style} · {beer.n}
          </div>
          <div>
            {beer.abv} · IBU {beer.ibu}
          </div>
        </div>
      </div>
    </div>
  );
};

const FourScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { unit, margin } = useLayout();
  const t = frame / fps;
  const fly = progress(frame, fps, 2.4, 3.0, EASE.linear);
  const f = flight(fly, [-260 * unit, 330 * unit], [width * 0.5, 40 * unit], [width + 260 * unit, 250 * unit], t, 10 * unit);
  return (
    <AbsoluteFill style={{ backgroundColor: C.cream }}>
      <Kicker n="03" color={C.cocoa} size={20 * unit} style={{ position: "absolute", left: margin, top: margin * 0.8, opacity: progress(frame, fps, 0.2, 0.6) }}>
        Product line — the four
      </Kicker>
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 36 * unit, paddingTop: 70 * unit }}>
        {DCA.beers.map((b, i) => (
          <BeerCard key={b.key} index={i} />
        ))}
      </AbsoluteFill>
      {fly > 0 && fly < 1 ? (
        <div style={{ position: "absolute", left: f.x, top: f.y, rotate: `${f.bank}deg` }}>
          <FlyingHopper crate width={190 * unit} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 04 marquee */

const BANDS = [
  { bg: C.honey, ink: C.cocoa, star: C.brick },
  { bg: C.brick, ink: C.creamSoft, star: C.honey },
  { bg: C.teal, ink: C.creamSoft, star: C.honey },
  { bg: C.creamSoft, ink: C.cocoa, star: C.brick },
] as const;

const MarqueeBand: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { unit } = useLayout();
  const band = BANDS[index];
  const dir = index % 2 === 0 ? -1 : 1;
  const enter = progress(frame, fps, 0.08 * index, 0.9, EASE.out);
  const phrases = [...DCA.marquee.slice(index % DCA.marquee.length), ...DCA.marquee.slice(0, index % DCA.marquee.length)];
  const run = [...phrases, ...phrases];
  const shift = ((frame / fps) * 150 * unit * dir) % (2400 * unit);
  return (
    <div
      style={{
        height: 148 * unit,
        background: band.bg,
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        translate: `0 ${(1 - enter) * 1100 * unit}px`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 44 * unit, translate: `${shift - 1200 * unit}px 0` }}>
        {run.map((p, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 44 * unit }}>
            <span style={{ fontFamily: DCA_FONT.display, fontSize: 84 * unit, lineHeight: 1, color: band.ink }}>{p.toUpperCase()}</span>
            <Star size={44 * unit} color={band.star} />
          </span>
        ))}
      </div>
    </div>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { unit, margin } = useLayout();
  const seal = springAt(frame, fps, 1.0, SPRINGS.bouncy);
  return (
    <AbsoluteFill style={{ backgroundColor: C.cocoa }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "130%", rotate: "-6deg", display: "flex", flexDirection: "column" }}>
          {BANDS.map((b, i) => (
            <MarqueeBand key={b.bg} index={i} />
          ))}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ padding: 22 * unit, borderRadius: "50%", background: C.cocoa, scale: String(seal), rotate: `${(1 - seal) * -120}deg` }}>
          <Seal size={330 * unit} spinSeconds={10} />
        </div>
      </AbsoluteFill>
      <Kicker n="04" numberColor={C.honey} color={C.creamSoft} size={20 * unit} style={{ position: "absolute", left: margin, top: margin * 0.8, opacity: progress(frame, fps, 0.6, 0.6) * 0.85 }}>
        Marquee
      </Kicker>
      <div style={{ position: "absolute", left: margin, bottom: margin * 0.7, display: "flex", alignItems: "center", gap: 12 * unit, opacity: progress(frame, fps, 1.4, 0.6) * 0.75 }}>
        <Star size={16 * unit} color={C.honey} />
        <Kicker color={C.creamSoft} size={17 * unit}>
          Drink responsibly · 18+
        </Kicker>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- film */

/** A scene that arrives through a pour: its clock starts as the bands unwind (it's hidden before). */
const Revealed: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence from={toFrames(POUR_REVEAL - 0.08, fps)} premountFor={fps}>
      {children}
    </Sequence>
  );
};

export const DcaIdentity: React.FC = () => {
  const { fps } = useVideoConfig();
  const s = DCA_IDENTITY;
  const t = pourTiming(fps);
  return (
    <TransitionSeries name="David Craft Ale identity">
      <TransitionSeries.Sequence name="Primary logo" durationInFrames={toFrames(s.logo, fps)} premountFor={fps}>
        <LogoScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={pour()} timing={t} />
      <TransitionSeries.Sequence name="Splash mark & seal" durationInFrames={toFrames(s.splash, fps)} premountFor={fps}>
        <Revealed>
          <SplashScene />
        </Revealed>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={pour()} timing={t} />
      <TransitionSeries.Sequence name="The four" durationInFrames={toFrames(s.four, fps)} premountFor={fps}>
        <Revealed>
          <FourScene />
        </Revealed>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={pour()} timing={t} />
      <TransitionSeries.Sequence name="Marquee" durationInFrames={toFrames(s.outro, fps)} premountFor={fps}>
        <Revealed>
          <OutroScene />
        </Revealed>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
