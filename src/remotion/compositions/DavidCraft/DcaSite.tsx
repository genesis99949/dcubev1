import { TransitionSeries } from "@remotion/transitions";
import type React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { toFrames } from "../../config";
import { useLayout } from "../../lib/layout";
import { EASE, SPRINGS, mix, progress, springAt } from "../../lib/motion";
import { DCA, DCA_FONT } from "./brand";
import { DcaBrowser, DcaPhone, Recording } from "./components/Devices";
import { FlyingHopper, Kicker, Seal, Sparkle, Star, flight } from "./components/Marks";
import { POUR_REVEAL, pour, pourTiming } from "./components/Pour";
import { DCA_SITE } from "./timing";

// David Craft Ale — the website in motion. Every page is a real, frame-by-frame recording of
// the site (scripts/site-capture/vt-record.mjs) with its own animations played out at real
// speed; Remotion adds the stage, callouts, the seal and the site's pour transition.

const C = DCA.colors;

type Callout = { at: number; until: number; text: string; star?: string };

/** A sticker-like pill that pops in over the browser's left edge while an interaction plays. */
const Chip: React.FC<Callout & { y: number }> = ({ at, until, text, star = C.brick, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { unit } = useLayout();
  const t = frame / fps;
  if (t < at - 0.1 || t > until + 0.6) return null;
  const pop = springAt(frame, fps, at, SPRINGS.snappy);
  const out = progress(frame, fps, until, 0.35, EASE.in);
  return (
    <div
      style={{
        position: "absolute",
        left: 200 * unit,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 12 * unit,
        padding: `${16 * unit}px ${26 * unit}px`,
        borderRadius: 999,
        background: C.paper,
        color: C.cocoa,
        fontFamily: DCA_FONT.body,
        fontWeight: 800,
        fontSize: 19 * unit,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        boxShadow: `0 ${10 * unit}px ${30 * unit}px rgba(46,26,14,0.28)`,
        scale: String(pop * (1 - out)),
        rotate: `${(1 - pop) * -8 - 2}deg`,
        transformOrigin: "left center",
      }}
    >
      <Star size={18 * unit} color={star} />
      {text}
    </div>
  );
};

type StageProps = {
  background: string;
  n: string;
  label: string;
  /** Kicker colours on this background. */
  ink: string;
  number: string;
  seal?: boolean;
  children: React.ReactNode;
};

/** Background, kicker and a browser with a site recording (and the seal stuck on its corner). */
const Stage: React.FC<StageProps> = ({ background, n, label, ink, number, seal = true, children }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { unit, margin } = useLayout();
  const enter = progress(frame, fps, 0, 0.9, EASE.out);
  const bw = 1360 * unit;
  const left = (width - bw) / 2;
  const top = 128 * unit;
  const sealPop = springAt(frame, fps, 0.9, SPRINGS.bouncy);
  return (
    <AbsoluteFill style={{ backgroundColor: background }}>
      <Kicker n={n} numberColor={number} color={ink} size={20 * unit} style={{ position: "absolute", left, top: 58 * unit, opacity: progress(frame, fps, 0.2, 0.6) }}>
        {label}
      </Kicker>
      <div style={{ position: "absolute", left: margin * 0.9, bottom: 150 * unit }}>
        <Sparkle size={34 * unit} color={number} delay={1.4} />
      </div>
      <div
        style={{
          position: "absolute",
          left,
          top,
          opacity: enter,
          scale: String(mix(enter, 0.95, 1)),
          translate: `0 ${(1 - enter) * 40 * unit}px`,
        }}
      >
        <DcaBrowser width={bw}>{children}</DcaBrowser>
      </div>
      {seal ? (
        <div style={{ position: "absolute", left: left + bw - 84 * unit, top: top - 66 * unit, scale: String(sealPop), rotate: `${(1 - sealPop) * -90}deg` }}>
          <Seal size={150 * unit} spinSeconds={10} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/** Chips are laid out bottom-left, stacked if two overlap in time. */
const Chips: React.FC<{ items: Callout[] }> = ({ items }) => {
  const { unit } = useLayout();
  return (
    <>
      {items.map((c, i) => (
        <Chip key={c.text} {...c} y={(i % 2 === 0 ? 860 : 780) * unit} />
      ))}
    </>
  );
};

/** A recording that arrives through a pour starts as the bands unwind. */
const AfterPour: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence from={toFrames(POUR_REVEAL - 0.08, fps)} premountFor={fps}>
      {children}
    </Sequence>
  );
};

/* ---------------------------------------------------------------- 01 homepage */

export const DcaHome: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { unit } = useLayout();
  const t = frame / fps;
  const s = DCA_SITE.home;
  const fly = progress(frame, fps, 9.0, 4.2, EASE.linear);
  const f = flight(fly, [width - 120 * unit, 1180 * unit], [width - 60 * unit, 540 * unit], [width - 170 * unit, -160 * unit], t, 8 * unit);
  return (
    <AbsoluteFill>
      <Stage background={C.cocoa} n="01" label="Homepage" ink={C.creamSoft} number={C.honey}>
        <Recording file={s.file} trimBefore={s.from} seconds={s.seconds} />
      </Stage>
      {fly > 0 && fly < 1 ? (
        <div style={{ position: "absolute", left: f.x, top: f.y, rotate: `${f.bank * 0.5}deg` }}>
          <FlyingHopper width={92 * unit} />
        </div>
      ) : null}
      <Chips
        items={[
          { at: 0.5, until: 2.5, text: "Splash loader" },
          { at: 3.1, until: 6.6, text: "Hopper follows your cursor", star: C.teal },
          { at: 8.9, until: 12.9, text: "Pick a brew" },
          { at: 13.9, until: 16.6, text: "Limited plush drop", star: C.honeyDeep },
          { at: 18.3, until: 20.7, text: "Real honest pours", star: C.teal },
        ]}
      />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 02 our story */

export const DcaStory: React.FC = () => {
  const s = DCA_SITE.story;
  return (
    <AbsoluteFill>
      <Stage background={C.honey} n="02" label="Our story" ink={C.cocoa} number={C.brick}>
        <Recording file={s.file} trimBefore={s.from} seconds={s.seconds} />
      </Stage>
      <Chips
        items={[
          { at: 2.9, until: 4.4, text: "Iris reveal", star: C.teal },
          { at: 5.3, until: 6.9, text: "Curtain reveal" },
          { at: 9.0, until: 19.0, text: "The brewery journey · 7 steps", star: C.teal },
          { at: 21.4, until: 23.2, text: "Bring a crate", star: C.honeyDeep },
        ]}
      />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 03 product pages */

export const DcaProduct: React.FC = () => {
  const { fps } = useVideoConfig();
  const { beer, hopper } = DCA_SITE;
  return (
    <TransitionSeries name="Product pages">
      <TransitionSeries.Sequence name="Beer page" durationInFrames={toFrames(beer.seconds, fps)} premountFor={fps}>
        <Stage background={C.cream} n="03" label="Beer page" ink={C.cocoa} number={C.brick}>
          <Recording file={beer.file} trimBefore={beer.from} seconds={beer.seconds} />
        </Stage>
        <Chips
          items={[
            { at: 1.5, until: 3.4, text: "Gallery" },
            { at: 4.5, until: 6.2, text: "Bottle or six-pack", star: C.teal },
          ]}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={pour()} timing={pourTiming(fps)} />
      <TransitionSeries.Sequence name="Hopper plushie" durationInFrames={toFrames(hopper.seconds, fps)} premountFor={fps}>
        <Stage background={C.brick} n="04" label="Hopper plushie" ink={C.creamSoft} number={C.honey}>
          <AfterPour>
            <Recording file={hopper.file} trimBefore={hopper.from} />
          </AfterPour>
        </Stage>
        <AfterPour>
          <Chips
            items={[
              { at: 1.3, until: 4.2, text: "Plush gallery", star: C.honeyDeep },
              { at: 8.2, until: 10.4, text: "Merch hover", star: C.teal },
            ]}
          />
        </AfterPour>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

/* ---------------------------------------------------------------- 04 shop */

export const DcaShop: React.FC = () => {
  const s = DCA_SITE.products;
  return (
    <AbsoluteFill>
      <Stage background={C.teal} n="05" label="Shop" ink={C.creamSoft} number={C.honey}>
        <Recording file={s.file} trimBefore={s.from} seconds={s.seconds} />
      </Stage>
      <Chips
        items={[
          { at: 2.0, until: 3.9, text: "Hover: macro shot", star: C.honeyDeep },
          { at: 4.2, until: 7.0, text: "Quick view", star: C.teal },
          { at: 8.2, until: 11.4, text: "Bottles · cans · accessories" },
        ]}
      />
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 05 mobile */

const PHONES = [
  { file: "m-story.mp4", width: 350, y: 70, delay: 0.15 },
  { file: "mobile.mp4", width: 392, y: -10, delay: 0 },
  { file: "m-products.mp4", width: 350, y: 70, delay: 0.3 },
] as const;

export const DcaMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { unit, margin } = useLayout();
  const t = frame / fps;
  const fly = progress(frame, fps, 5.4, 3.6, EASE.linear);
  const f = flight(fly, [-240 * unit, 760 * unit], [width * 0.5, 980 * unit], [width + 240 * unit, 640 * unit], t, 10 * unit);
  return (
    <AbsoluteFill style={{ backgroundColor: C.teal }}>
      <Kicker n="06" numberColor={C.honey} color={C.creamSoft} size={20 * unit} style={{ position: "absolute", left: margin, top: 58 * unit, opacity: progress(frame, fps, 0.2, 0.6) }}>
        Mobile
      </Kicker>
      <Kicker color={C.creamSoft} size={20 * unit} style={{ position: "absolute", right: margin, top: 58 * unit, opacity: progress(frame, fps, 0.35, 0.6) * 0.7 }}>
        David Craft Ale
      </Kicker>
      <div style={{ position: "absolute", right: margin * 1.1, bottom: 170 * unit }}>
        <Sparkle size={40 * unit} color={C.honey} delay={1.2} />
      </div>
      <div style={{ position: "absolute", left: margin * 1.2, top: 230 * unit }}>
        <Sparkle size={28 * unit} color={C.creamSoft} delay={1.6} />
      </div>
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 110 * unit, paddingTop: 50 * unit }}>
        {PHONES.map((p, i) => {
          const rise = springAt(frame, fps, p.delay, SPRINGS.smooth, 1.1);
          const drift = Math.sin(t * 0.9 + i * 1.7) * 8 * unit;
          return (
            <div key={p.file} style={{ translate: `0 ${p.y * unit + (1 - rise) * 1100 * unit + drift}px` }}>
              <DcaPhone width={p.width * unit} status={C.cocoa}>
                <Recording file={p.file} />
              </DcaPhone>
            </div>
          );
        })}
      </AbsoluteFill>
      {fly > 0 && fly < 1 ? (
        <div style={{ position: "absolute", left: f.x, top: f.y, rotate: `${f.bank}deg` }}>
          <FlyingHopper crate width={200 * unit} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
