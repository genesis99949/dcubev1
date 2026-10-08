// Vector data of the PureFlame logo, extracted from Logo PF/New Logo.ai for the site's
// After Effects work (after-effects/assets/*.json). Converted here to SVG path strings.
import flameData from "./data/flame-paths.json";
import signatureData from "./data/signature-data.json";

type AePath = { v: number[][]; i: number[][]; o: number[][] };

/** After Effects bezier (vertices + relative tangents) → SVG path data. */
const toPath = ({ v, i, o }: AePath, closed: boolean) => {
  const n = v.length;
  let d = `M${v[0][0]},${v[0][1]}`;
  const segments = closed ? n : n - 1;
  for (let k = 0; k < segments; k++) {
    const a = v[k];
    const b = v[(k + 1) % n];
    d += `C${a[0] + o[k][0]},${a[1] + o[k][1]} ${b[0] + i[(k + 1) % n][0]},${b[1] + i[(k + 1) % n][1]} ${b[0]},${b[1]}`;
  }
  return closed ? `${d}Z` : d;
};

const [fx1, fy1, fx2, fy2] = flameData.bbox;

/** The flame mark. Fill with evenodd — the inner tongues are cut-outs. */
export const FLAME = {
  d: flameData.paths.map((p) => toPath(p, true)).join(" "),
  viewBox: `${fx1} ${fy1} ${fx2 - fx1} ${fy2 - fy1}`,
  /** width / height */
  aspect: (fx2 - fx1) / (fy2 - fy1),
};

const [sx1, sy1, sx2, sy2] = signatureData.bbox;
const PAD = 24;

/**
 * The hand-lettered "Pure Flame" wordmark.
 * `glyphs` are the filled letter outlines; `strokes` are the pen paths in writing order,
 * with the original per-frame writing progress (`progress`, 0–100, sampled at `fps`).
 */
export const SIGNATURE = {
  glyphs: signatureData.text.map((g) => g.paths.map((p) => toPath(p, true)).join(" ")).join(" "),
  strokes: signatureData.strokes.map((s) => ({
    name: s.name,
    d: toPath(s, false),
    width: s.width,
    startFrame: s.write.f0,
    progress: s.write.e,
  })),
  fps: signatureData.fps,
  writeStart: signatureData.write_start,
  writeEnd: signatureData.write_end,
  viewBox: `${sx1 - PAD} ${sy1 - PAD} ${sx2 - sx1 + 2 * PAD} ${sy2 - sy1 + 2 * PAD}`,
  /** Explicit mask region — SVG's default region is relative to 0,0 and would clip the descenders. */
  maskRegion: { x: sx1 - 200, y: sy1 - 200, width: sx2 - sx1 + 400, height: sy2 - sy1 + 400 },
  aspect: (sx2 - sx1 + 2 * PAD) / (sy2 - sy1 + 2 * PAD),
  /** Pen-tip position per source frame (for the glowing nib). */
  tip: signatureData.tip,
};

/** Seconds the signature takes to write at speed 1. */
export const SIGNATURE_DURATION = SIGNATURE.writeEnd - SIGNATURE.writeStart;
