"use client";

import type React from "react";
import { useCampaignActive } from "./useCampaignActive";

/**
 * The homepage Express tile: the Black Friday version while the campaign runs, the usual one before and after.
 * Both are rendered on the server and passed in; the visitor's clock picks one.
 */
export function CampaignPromo({ campaign, regular }: { campaign: React.ReactNode; regular: React.ReactNode }) {
  return useCampaignActive() ? campaign : regular;
}
