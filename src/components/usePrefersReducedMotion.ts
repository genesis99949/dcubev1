"use client";

import { useMediaQuery } from "./useMediaQuery";

/** True when the visitor asked the OS for less motion. */
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
