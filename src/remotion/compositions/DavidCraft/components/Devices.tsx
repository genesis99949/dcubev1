import { Video } from "@remotion/media";
import type React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { DCA, DCA_FONT, DCA_MEDIA, starPath } from "../brand";

// Device frames for the David Craft Ale recordings (1440×900 desktop, 390×844 mobile).

/** Rounded browser window in the brand's warm palette. The tab pill shows the brand, not a domain. */
export const DcaBrowser: React.FC<{ width: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  width,
  children,
  style,
}) => {
  const bar = Math.round(width * 0.03);
  const radius = Math.round(width * 0.014);
  return (
    <div
      style={{
        width,
        borderRadius: radius,
        overflow: "hidden",
        background: DCA.colors.paper,
        boxShadow: `0 ${width * 0.022}px ${width * 0.055}px rgba(46,26,14,0.30), 0 ${width * 0.004}px ${width * 0.01}px rgba(46,26,14,0.18)`,
        ...style,
      }}
    >
      <div style={{ height: bar, display: "flex", alignItems: "center", padding: `0 ${bar * 0.5}px`, gap: bar * 0.22 }}>
        {[DCA.colors.brick, DCA.colors.honey, DCA.colors.teal].map((c) => (
          <span key={c} style={{ width: bar * 0.26, height: bar * 0.26, borderRadius: "50%", background: c }} />
        ))}
        <div
          style={{
            margin: "0 auto",
            height: bar * 0.58,
            padding: `0 ${bar * 0.6}px`,
            borderRadius: bar,
            background: DCA.colors.cream,
            color: DCA.colors.cocoa,
            fontFamily: DCA_FONT.body,
            fontWeight: 800,
            fontSize: bar * 0.27,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: bar * 0.22,
          }}
        >
          <svg width={bar * 0.3} height={bar * 0.3} viewBox="0 0 24 24">
            <path d={starPath(12, 12, 11)} fill={DCA.colors.brick} />
          </svg>
          David Craft Ale
        </div>
        <span style={{ width: bar * 1.3 }} />
      </div>
      <div style={{ width, aspectRatio: "1440 / 900", overflow: "hidden", position: "relative", background: DCA.colors.cream }}>
        {children}
      </div>
    </div>
  );
};

/**
 * Frameless phone with a status bar tinted like the top of the page. The page viewport below the
 * status bar keeps the exact 390×844 proportions of the recordings, so nothing (e.g. the site's
 * header) is cropped.
 */
export const DcaPhone: React.FC<{ width: number; status?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  width,
  status = DCA.colors.cream,
  children,
  style,
}) => {
  const bezel = width * 0.035;
  const inner = width - bezel * 2;
  const bar = inner * 0.12;
  const viewport = (inner * 844) / 390;
  const ink = status === DCA.colors.cocoa ? DCA.colors.creamSoft : DCA.colors.ink;
  return (
    <div
      style={{
        width,
        padding: bezel,
        borderRadius: width * 0.15,
        background: "#1B120C",
        boxShadow: `0 ${width * 0.06}px ${width * 0.15}px rgba(46,26,14,0.38), inset 0 0 0 ${Math.max(1, width * 0.004)}px rgba(255,255,255,0.12)`,
        ...style,
      }}
    >
      <div style={{ width: inner, height: bar + viewport, borderRadius: width * 0.12, overflow: "hidden", position: "relative", background: DCA.colors.cream }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: bar, height: viewport, overflow: "hidden" }}>{children}</div>
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
            fontFamily: DCA_FONT.body,
            fontWeight: 600,
            fontSize: inner * 0.04,
          }}
        >
          <span>9:41</span>
          <span style={{ width: inner * 0.065, height: inner * 0.03, borderRadius: inner * 0.008, border: `${Math.max(1, inner * 0.004)}px solid ${ink}`, padding: inner * 0.004, display: "flex" }}>
            <span style={{ flex: 1, background: ink, borderRadius: inner * 0.004 }} />
          </span>
        </div>
        <div style={{ position: "absolute", top: inner * 0.028, left: "50%", translate: "-50% 0", width: inner * 0.3, height: inner * 0.08, borderRadius: inner, background: "#1B120C" }} />
      </div>
    </div>
  );
};

/** A site recording from public/remotion/dca, filling its frame. */
export const Recording: React.FC<{ file: string; trimBefore?: number; seconds?: number }> = ({ file, trimBefore = 0, seconds }) => {
  const { fps } = useVideoConfig();
  return (
    <Video
      src={staticFile(`${DCA_MEDIA}/${file}`)}
      muted
      premountFor={fps}
      trimBefore={Math.round(trimBefore * fps)}
      durationInFrames={seconds ? Math.round(seconds * fps) : undefined}
      objectFit="cover"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};
