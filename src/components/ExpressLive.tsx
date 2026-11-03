"use client";

import type React from "react";
import { useSyncExternalStore } from "react";
import { expressLive } from "@/content/express";

const subscribe = () => () => {};

/**
 * Whether links to Express show: from `express.launch` on the visitor's clock (the site is static), always in `npm run dev`
 * so they can be checked locally. False while rendering on the server; React switches right after hydration.
 */
export const useExpressLive = () =>
  useSyncExternalStore(subscribe, () => process.env.NODE_ENV === "development" || expressLive(), () => false);

/** Renders its children (links to Express) only once Express is live. */
export function ExpressLive({ children }: { children: React.ReactNode }) {
  return useExpressLive() ? children : null;
}
