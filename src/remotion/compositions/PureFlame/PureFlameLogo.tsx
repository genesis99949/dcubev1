import type React from "react";
import { AbsoluteFill } from "remotion";
import { useLayout } from "../../lib/layout";
import { PF } from "./brand";
import { Glow, Grain } from "./components/Layouts";
import { LogoLockup } from "./components/LogoLockup";

export type PureFlameLogoProps = {
  /** "transparent" renders an alpha channel (export as WebM/ProRes for use on the website). */
  background: "charcoal" | "cream" | "transparent";
  tagline: string;
};

export const PURE_FLAME_LOGO_SECONDS = 7.5;

/**
 * PureFlame logo animation — flame ignition + hand-written wordmark + tagline.
 * Usable on its own (site intro / loader, social) or inside the identity film.
 */
export const PureFlameLogo: React.FC<PureFlameLogoProps> = ({ background, tagline }) => {
  const { width, height } = useLayout();
  const scale = Math.min(width / 1920, height / 1080) * (width < height ? 1.6 : 1);
  return (
    <AbsoluteFill
      style={{
        backgroundColor:
          background === "charcoal" ? PF.colors.charcoal : background === "cream" ? PF.colors.cream : undefined,
      }}
    >
      {background === "charcoal" ? (
        <>
          <Glow y="44%" alpha={0.13} />
          <Grain />
        </>
      ) : null}
      <LogoLockup tagline={tagline} theme={background === "cream" ? "light" : "dark"} scale={Math.min(scale, 1.1)} />
    </AbsoluteFill>
  );
};
