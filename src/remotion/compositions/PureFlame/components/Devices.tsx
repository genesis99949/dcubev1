import type React from "react";
import { Img, staticFile } from "remotion";
import { PF, PF_FONT } from "../brand";

type FrameProps = {
  /** Outer width in px. */
  width: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/** Minimal desktop browser window with a 16:10 viewport. */
export const BrowserFrame: React.FC<FrameProps & { url?: string; dark?: boolean }> = ({
  width,
  children,
  url = PF.domain,
  dark = false,
  style,
}) => {
  const bar = Math.round(width * 0.03);
  const radius = Math.round(width * 0.009);
  return (
    <div
      style={{
        width,
        borderRadius: radius,
        overflow: "hidden",
        background: dark ? "#1E1C17" : "#ECEBE6",
        boxShadow: `0 ${width * 0.02}px ${width * 0.06}px rgba(0,0,0,0.28), 0 ${width * 0.004}px ${width * 0.01}px rgba(0,0,0,0.18)`,
        ...style,
      }}
    >
      <div
        style={{
          height: bar,
          display: "flex",
          alignItems: "center",
          padding: `0 ${bar * 0.5}px`,
          gap: bar * 0.22,
        }}
      >
        {["#E2685D", "#E4B54A", "#5FBF5A"].map((c) => (
          <span key={c} style={{ width: bar * 0.26, height: bar * 0.26, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
        <div
          style={{
            margin: "0 auto",
            height: bar * 0.56,
            width: "36%",
            borderRadius: bar,
            background: dark ? "#2C2A24" : "#FFFFFF",
            color: dark ? "rgba(254,255,253,0.6)" : "rgba(17,15,10,0.55)",
            fontFamily: PF_FONT.sans,
            fontSize: bar * 0.3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "0.02em",
          }}
        >
          {url}
        </div>
        <span style={{ width: bar * 1.3 }} />
      </div>
      <div style={{ width, aspectRatio: "16 / 10", overflow: "hidden", position: "relative", background: PF.colors.cream }}>
        {children}
      </div>
    </div>
  );
};

/** Relative luminance check, to pick status-bar text colour. */
const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
};

/**
 * Frameless phone. The page viewport (390×844 capture) sits below a status bar
 * coloured like the top of the page, as Safari does.
 */
export const PhoneFrame: React.FC<FrameProps & { status?: string }> = ({
  width,
  children,
  status = PF.colors.cream,
  style,
}) => {
  const bezel = width * 0.035;
  const inner = width - bezel * 2;
  const bar = inner * 0.12;
  const ink = isDark(status) ? "#FFFFFF" : "#0B0A07";
  return (
    <div
      style={{
        width,
        padding: bezel,
        borderRadius: width * 0.15,
        background: "#0B0A07",
        boxShadow: `0 ${width * 0.06}px ${width * 0.16}px rgba(0,0,0,0.35), inset 0 0 0 ${Math.max(1, width * 0.004)}px rgba(255,255,255,0.12)`,
        ...style,
      }}
    >
      <div
        style={{
          width: inner,
          aspectRatio: "390 / 844",
          borderRadius: width * 0.12,
          overflow: "hidden",
          position: "relative",
          background: PF.colors.cream,
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: bar, bottom: 0, overflow: "hidden" }}>
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: bar,
            background: status,
            color: ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${inner * 0.085}px`,
            fontFamily: PF_FONT.sans,
            fontWeight: 500,
            fontSize: inner * 0.04,
          }}
        >
          <span>9:41</span>
          <span
            style={{
              width: inner * 0.065,
              height: inner * 0.03,
              borderRadius: inner * 0.008,
              border: `${Math.max(1, inner * 0.004)}px solid ${ink}`,
              padding: inner * 0.004,
              display: "flex",
            }}
          >
            <span style={{ flex: 1, background: ink, borderRadius: inner * 0.004 }} />
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: inner * 0.028,
            left: "50%",
            translate: "-50% 0",
            width: inner * 0.3,
            height: inner * 0.08,
            borderRadius: inner,
            background: "#0B0A07",
          }}
        />
      </div>
    </div>
  );
};

/** Small uppercase utility label, as on the PureFlame site. */
export const PfLabel: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, color = "rgba(254,255,253,0.6)", size = 20, style }) => (
  <div
    style={{
      fontFamily: PF_FONT.sans,
      fontSize: size,
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Fills its frame with a screenshot from public/ (top-aligned). Rendering waits for it to load. */
export const Screen: React.FC<{ file: string; offsetY?: number; style?: React.CSSProperties }> = ({
  file,
  offsetY = 0,
  style,
}) => (
  <Img
    src={staticFile(file)}
    style={{ position: "absolute", inset: 0, width: "100%", height: "auto", translate: `0 ${-offsetY}%`, ...style }}
  />
);
