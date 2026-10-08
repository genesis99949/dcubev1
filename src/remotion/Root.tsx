import type React from "react";
import { Composition, Folder, Still } from "remotion";
import { BRAND } from "./brand";
import { FORMATS, VIDEO } from "./config";
import { BrandIntro } from "./compositions/BrandIntro/BrandIntro";
import { IntroScene } from "./compositions/BrandIntro/scenes/IntroScene";
import { OutroScene } from "./compositions/BrandIntro/scenes/OutroScene";
import { CubeScene } from "./compositions/BrandIntro/scenes/CubeScene";
import { TypeScene } from "./compositions/BrandIntro/scenes/TypeScene";
import { getBrandIntroTimeline } from "./compositions/BrandIntro/timing";
import { PureFlameIdentity, getPfIdentityDuration } from "./compositions/PureFlame/PureFlameIdentity";
import { PureFlameLogo, PURE_FLAME_LOGO_SECONDS } from "./compositions/PureFlame/PureFlameLogo";
import { PureFlameShowcase, getPfShowcaseDuration } from "./compositions/PureFlame/PureFlameShowcase";
import { PureFlameStill } from "./compositions/PureFlame/PureFlameStill";
import { DcaIdentity } from "./compositions/DavidCraft/DcaIdentity";
import { DcaHome, DcaMobile, DcaProduct, DcaShop, DcaStory } from "./compositions/DavidCraft/DcaSite";
import { getDcaIdentityDuration, getDcaProductDuration, getDcaSiteDuration } from "./compositions/DavidCraft/timing";

// Every renderable video is registered here. Format and fps come from ./config.ts;
// durations come from each composition's timing file (written in seconds).
const brandIntro = getBrandIntroTimeline(VIDEO.fps);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BrandIntro"
        component={BrandIntro}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={VIDEO.fps}
        durationInFrames={brandIntro.total}
        defaultProps={{
          name: "Dcube",
          subtitle: "Web · Branding · Marketing",
          year: "2026",
          tagline: "Available for new projects",
          accentColor: BRAND.colors.accent,
          sfx: true,
          soundtrack: "",
        }}
      />
      {/* Same component, vertical format — layouts adapt via useLayout(). */}
      <Composition
        id="BrandIntro-Vertical"
        component={BrandIntro}
        width={FORMATS.vertical.width}
        height={FORMATS.vertical.height}
        fps={VIDEO.fps}
        durationInFrames={brandIntro.total}
        defaultProps={{
          name: "Dcube",
          subtitle: "Web · Branding · Marketing",
          year: "2026",
          tagline: "Available for new projects",
          accentColor: BRAND.colors.accent,
          sfx: true,
          soundtrack: "",
        }}
      />

      {/* Connected compositions: each scene can be previewed and rendered on its own. */}
      <Folder name="BrandIntro-Scenes">
        <Composition
          id="Intro"
          component={IntroScene}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={brandIntro.intro}
          defaultProps={{
            title: "Dcube",
            subtitle: "Web · Branding · Marketing",
            year: "2026",
            accentColor: BRAND.colors.accent,
          }}
        />
        <Composition
          id="Cube"
          component={CubeScene}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={brandIntro.cube}
          defaultProps={{
            headline: "Six faces. One cube.",
            accentColor: BRAND.colors.accent,
          }}
        />
        <Composition
          id="Outro"
          component={OutroScene}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={brandIntro.outro}
          defaultProps={{
            title: "Dcube",
            tagline: "Available for new projects",
            year: "2026",
            accentColor: BRAND.colors.accent,
          }}
        />
      </Folder>

      {/* Standalone studies (not in the brand film). */}
      <Folder name="Studies">
        <Composition
          id="Type"
          component={TypeScene}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={Math.round(4.4 * VIDEO.fps)}
          defaultProps={{
            first: "Web",
            second: "Branding",
            third: "Marketing",
            accentColor: BRAND.colors.accent,
          }}
        />
      </Folder>

      {/* Client work: PureFlame (identity + website presentation). */}
      <Folder name="PureFlame">
        <Composition
          id="PureFlame-Logo"
          component={PureFlameLogo}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={Math.round(PURE_FLAME_LOGO_SECONDS * VIDEO.fps)}
          defaultProps={{
            background: "charcoal" as const,
            tagline: "The art of gathering",
          }}
        />
        {/* Same animation without a background — export as WebM/ProRes with alpha for the website. */}
        <Composition
          id="PureFlame-Logo-Transparent"
          component={PureFlameLogo}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={Math.round(PURE_FLAME_LOGO_SECONDS * VIDEO.fps)}
          defaultProps={{
            background: "transparent" as const,
            tagline: "The art of gathering",
          }}
        />
        <Composition
          id="PureFlame-Identity"
          component={PureFlameIdentity}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={getPfIdentityDuration(VIDEO.fps)}
        />
        <Composition
          id="PureFlame-Showcase"
          component={PureFlameShowcase}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={getPfShowcaseDuration(VIDEO.fps)}
        />
        {/* Stills show only what the showcase video doesn't (product page, details, mobile). */}
        <Still id="PureFlame-Still-Product" component={PureFlameStill} width={VIDEO.width} height={VIDEO.height} defaultProps={{ variant: "product" as const }} />
        <Still id="PureFlame-Still-Details" component={PureFlameStill} width={VIDEO.width} height={VIDEO.height} defaultProps={{ variant: "details" as const }} />
        <Still id="PureFlame-Still-Mobile" component={PureFlameStill} width={VIDEO.width} height={VIDEO.height} defaultProps={{ variant: "mobile" as const }} />
      </Folder>

      {/* Client work: David Craft Ale (Edition 02 identity + the website in motion). */}
      <Folder name="DavidCraft">
        <Composition id="DCA-Identity" component={DcaIdentity} width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={getDcaIdentityDuration(VIDEO.fps)} />
        <Composition id="DCA-Home" component={DcaHome} width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={getDcaSiteDuration("home", VIDEO.fps)} />
        <Composition id="DCA-Story" component={DcaStory} width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={getDcaSiteDuration("story", VIDEO.fps)} />
        <Composition id="DCA-Product" component={DcaProduct} width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={getDcaProductDuration(VIDEO.fps)} />
        <Composition id="DCA-Shop" component={DcaShop} width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={getDcaSiteDuration("products", VIDEO.fps)} />
        <Composition id="DCA-Mobile" component={DcaMobile} width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={getDcaSiteDuration("mobile", VIDEO.fps)} />
      </Folder>
    </>
  );
};
