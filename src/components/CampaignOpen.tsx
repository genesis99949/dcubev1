"use client";

import type React from "react";
import { useSyncExternalStore } from "react";
import { blackFridayActive } from "@/content/blackFriday";

const subscribe = () => () => {};
// In `npm run dev` the offer is always open, so it can be checked before `start`; add `?teaser` to see the teaser.
const dev = process.env.NODE_ENV === "development";
// The server snapshot is the build's own date, so a site rebuilt after `start` renders the open campaign straight away.
const builtOpen = dev || blackFridayActive();
const isOpen = () => (dev ? !new URLSearchParams(window.location.search).has("teaser") : blackFridayActive());

/** Whether the Black Month offer is open (from `start`), on the visitor's clock. */
export const useCampaignOpen = () => useSyncExternalStore(subscribe, isOpen, () => builtOpen);

/** Shows `children` once the offer opens and `soon` before that (the teaser between `promoStart` and `start`). */
export function CampaignOpen({ children, soon }: { children: React.ReactNode; soon: React.ReactNode }) {
  return useCampaignOpen() ? children : soon;
}
