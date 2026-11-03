"use client";

import { useEffect } from "react";
import { blackFriday, blackFridayActive, blackFridayEnded } from "@/content/blackFriday";
import { express } from "@/content/express";
import { localePath, type Lang } from "@/content/i18n";

/**
 * Switches between the Express page and its Black Friday version without a redeploy (the site is static, so the
 * date is checked in the browser): on the campaign page after `end`, visitors go to the normal Express page;
 * on the Express page while the campaign runs, they go to the campaign page.
 */
export function CampaignGate({ lang, campaign }: { lang: Lang; campaign: boolean }) {
  useEffect(() => {
    if (campaign ? blackFridayEnded() : blackFridayActive()) {
      window.location.replace(localePath(lang, campaign ? express.path : blackFriday.path));
    }
  }, [lang, campaign]);
  return null;
}
