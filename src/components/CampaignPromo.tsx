"use client";

import type React from "react";
import { useExpressLive } from "./ExpressLive";
import { useCampaignActive } from "./useCampaignActive";

/**
 * The homepage Express tile: the Black Friday version while the campaign runs, the usual one once Express is live
 * (1 December), nothing in between. Both are rendered on the server and passed in; the visitor's clock picks one.
 */
export function CampaignPromo({ campaign, regular }: { campaign: React.ReactNode; regular: React.ReactNode }) {
  const live = useExpressLive();
  if (useCampaignActive()) return campaign;
  return live ? regular : null;
}
