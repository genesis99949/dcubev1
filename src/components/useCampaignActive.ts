import { useSyncExternalStore } from "react";
import { blackFridayPromoActive } from "@/content/blackFriday";

const subscribe = () => () => {};

/**
 * Whether the homepage shows the Black Month tile (from `promoStart` to `end`), read from the visitor's clock (the site is static, so a build can't know).
 * False while rendering on the server; React switches to the real value right after hydration.
 */
export const useCampaignActive = () => useSyncExternalStore(subscribe, () => blackFridayPromoActive(), () => false);
