import type React from "react";
import { PF } from "./brand";
import { DevicesLayout, PhonesLayout } from "./components/Layouts";

export type PureFlameStillProps = {
  variant: "product" | "details" | "mobile";
};

/**
 * Presentation stills for the portfolio — only views that are NOT in the showcase video.
 * Render at 2× for 4K:  npx remotion still PureFlame-Still-Product out/product.jpg --scale=2
 */
export const PureFlameStill: React.FC<PureFlameStillProps> = ({ variant }) => {
  switch (variant) {
    case "product":
      return <DevicesLayout desktop="embera-0.jpg" phone="m-embera-1.jpg" background={PF.colors.creamSoft} />;
    case "details":
      return <DevicesLayout desktop="embera-2.jpg" phone="m-embera-0.jpg" background={PF.colors.olive} />;
    case "mobile":
      return <PhonesLayout screens={["m-home-0.jpg", "m-home-1.jpg", "m-home-2.jpg", "m-collection-0.jpg"]} />;
  }
};
