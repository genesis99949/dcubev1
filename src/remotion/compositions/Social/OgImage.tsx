import { AbsoluteFill } from "remotion";
import { BRAND } from "../../brand";
import { FONT } from "../../fonts";

const { ink, paper, muted, accent } = BRAND.colors;

/**
 * The site's social preview (public/og.png, 1200×630): the wordmark with its accent stop,
 * a hairline and what's on offer. Render: npm run still -- OG public/og.png
 */
export const OgImage: React.FC = () => {
  const label: React.CSSProperties = {
    fontFamily: FONT.mono,
    fontSize: 15,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: muted,
  };
  return (
    <AbsoluteFill style={{ background: ink, color: paper, fontFamily: FONT.sans }}>
      <div style={{ ...label, position: "absolute", top: 40, left: 62 }}>Portfolio — 2026</div>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 108, fontWeight: 500, letterSpacing: "-0.055em", lineHeight: 1 }}>
            Ramon Bugariu
            <span style={{ display: "inline-block", width: 22, height: 22, marginLeft: 6, background: accent }} />
          </div>
          <div style={{ alignSelf: "stretch", height: 1, marginTop: 34, background: "rgba(242,241,236,0.28)" }} />
          <div style={{ ...label, marginTop: 20 }}>Websites &amp; online stores</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
