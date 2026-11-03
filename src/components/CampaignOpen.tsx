"use client";

import type React from "react";
import { useSyncExternalStore } from "react";
import { blackFridayActive } from "@/content/blackFriday";

const subscribe = () => () => {};
// The server snapshot is the build's own date, so a site rebuilt after `start` renders the open campaign straight away.
const builtOpen = blackFridayActive();

/** Whether the Black Friday offer is open (from `start`), on the visitor's clock. */
export const useCampaignOpen = () => useSyncExternalStore(subscribe, () => blackFridayActive(), () => builtOpen);

/** Shows `children` once the offer opens and `soon` before that (the teaser between `promoStart` and `start`). */
export function CampaignOpen({ children, soon }: { children: React.ReactNode; soon: React.ReactNode }) {
  return useCampaignOpen() ? children : soon;
}
