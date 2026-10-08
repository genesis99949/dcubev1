import type React from "react";
import { useId } from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, springAt } from "../../../lib/motion";
import { DCA, DCA_ART, DCA_FONT, sparklePath, starPath } from "../brand";

// The David Craft Ale graphic kit (brand board 08): identity star, sparkle, rotating seal,
// ornament rules and the winged Hopper. All motion is driven by the current frame.

/** The 8-point identity star. */
export const Star: React.FC<{ size: number; color: string; style?: React.CSSProperties }> = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", overflow: "visible", ...style }}>
    <path d={starPath(12, 12, 11)} fill={color} />
  </svg>
);

/** A 4-point sparkle that pops in at `delay` and then twinkles (one per band, per the board). */
export const Sparkle: React.FC<{
  size: number;
  color: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ size, color, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springAt(frame, fps, delay, SPRINGS.bouncy);
  const t = frame / fps - delay;
  const twinkle = 0.82 + 0.18 * Math.sin(t * 4.2);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", overflow: "visible", scale: String(pop * twinkle), rotate: `${(1 - pop) * -90 + t * 12}deg`, ...style }}
    >
      <path d={sparklePath(12, 12, 11)} fill={color} />
    </svg>
  );
};

/**
 * The rotating seal: honey disc, cocoa star, "DAVID CRAFT ALE · EST 2023 ·" on a circle
 * (same geometry as the site's #badge-spin). The site spins it once every 16 s.
 */
export const Seal: React.FC<{ size: number; spinSeconds?: number; offsetDeg?: number; style?: React.CSSProperties }> = ({
  size,
  spinSeconds = 16,
  offsetDeg = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = `seal-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const R = 34;
  const C = 46;
  const spin = offsetDeg + (frame / fps / spinSeconds) * 360;
  return (
    <svg width={size} height={size} viewBox="0 0 92 92" style={{ display: "block", rotate: `${spin}deg`, ...style }}>
      <defs>
        <path id={id} d={`M ${C} ${C} m -${R},0 a ${R},${R} 0 1,1 ${R * 2},0 a ${R},${R} 0 1,1 -${R * 2},0`} />
      </defs>
      <circle cx={C} cy={C} r={45} fill={DCA.colors.honey} />
      <path d={starPath(C, C, 13)} fill={DCA.colors.cocoa} />
      <text fontFamily={DCA_FONT.body} fontWeight={800} fontSize={10.5} letterSpacing={2.4} fill={DCA.colors.cocoa}>
        <textPath href={`#${id}`} textLength={(2 * Math.PI * R - 3).toFixed(1)} lengthAdjust="spacing">
          DAVID CRAFT ALE · EST 2023 ·
        </textPath>
      </text>
    </svg>
  );
};

/**
 * The lockup ornament: two pairs of rules (cocoa over honey) either side of a star.
 * `progress` 0 → 1 draws the rules outward from the star; `starPop` (a spring value) pops the star.
 */
export const Ornament: React.FC<{
  scale?: number;
  progress: number;
  starPop: number;
  star: number;
  starColor?: string;
}> = ({ scale = 1, progress, starPop, star, starColor = DCA.colors.brick }) => {
  const rule = (w: number, color: string, side: "l" | "r") => (
    <i
      style={{
        display: "block",
        width: w * scale * progress,
        height: 3 * scale,
        borderRadius: 2 * scale,
        background: color,
        marginLeft: side === "l" ? "auto" : 0,
      }}
    />
  );
  const pair = (side: "l" | "r") => (
    <div style={{ width: 150 * scale, display: "flex", flexDirection: "column", gap: 5 * scale, alignItems: side === "l" ? "flex-end" : "flex-start" }}>
      {rule(150, DCA.colors.cocoa, side)}
      {rule(120, DCA.colors.honeyDeep, side)}
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * scale }}>
      {pair("l")}
      <Star size={star * scale} color={starColor} style={{ scale: String(starPop), rotate: `${(1 - starPop) * -140}deg` }} />
      {pair("r")}
    </div>
  );
};

/**
 * Hopper in flight: the site's two wing frames, swapped every half flap
 * (css/hopper-flight.css flaps every 240 ms). Both frames stay mounted so neither
 * has to load mid-render. `crate` uses the "carrying a crate" pair.
 */
export const FlyingHopper: React.FC<{
  width: number;
  crate?: boolean;
  flap?: number;
  phase?: number;
  style?: React.CSSProperties;
}> = ({ width, crate = false, flap = 0.24, phase = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const up = Math.floor((frame / fps + phase) / (flap / 2)) % 2 === 0;
  const [a, b] = crate ? ["hopper-crate-up.png", "hopper-crate-down.png"] : ["hopper-up.png", "hopper-down.png"];
  const ratio = crate ? 1 : 241 / 262;
  const img = (file: string, show: boolean) => (
    <Img
      src={staticFile(`${DCA_ART}/${file}`)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: show ? 1 : 0 }}
    />
  );
  return (
    <div style={{ position: "relative", width, height: width * ratio, ...style }}>
      {img(a, up)}
      {img(b, !up)}
    </div>
  );
};

type Pt = readonly [number, number];

/**
 * Position along a gentle flight path: a quadratic curve from `from` via `via` to `to`,
 * plus a bob. Returns x, y and a banking angle that follows the direction of travel.
 */
export const flight = (p: number, from: Pt, via: Pt, to: Pt, time: number, bob = 10) => {
  const q = Math.max(0, Math.min(1, p));
  const x = (1 - q) ** 2 * from[0] + 2 * (1 - q) * q * via[0] + q ** 2 * to[0];
  const y = (1 - q) ** 2 * from[1] + 2 * (1 - q) * q * via[1] + q ** 2 * to[1] + Math.sin(time * 5.2) * bob;
  const dx = 2 * (1 - q) * (via[0] - from[0]) + 2 * q * (to[0] - via[0]);
  const dy = 2 * (1 - q) * (via[1] - from[1]) + 2 * q * (to[1] - via[1]);
  const bank = interpolate(Math.atan2(dy, Math.abs(dx) + 1e-6), [-1.2, 1.2], [-16, 16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { x, y, bank, flip: dx < 0 };
};

/** Small tracked kicker, as used for the board's cell labels ("01  Primary logo"). */
export const Kicker: React.FC<{
  n?: string;
  children: React.ReactNode;
  color: string;
  numberColor?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ n, children, color, numberColor = DCA.colors.brick, size = 20, style }) => (
  <div
    style={{
      fontFamily: DCA_FONT.body,
      fontWeight: 800,
      fontSize: size,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color,
      whiteSpace: "nowrap",
      display: "flex",
      gap: size * 0.9,
      ...style,
    }}
  >
    {n ? <span style={{ color: numberColor }}>{n}</span> : null}
    <span>{children}</span>
  </div>
);
