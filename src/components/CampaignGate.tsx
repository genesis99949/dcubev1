"use client";

import { useEffect } from "react";
import { blackFriday, blackFridayEnded, blackFridayPromoActive } from "@/content/blackFriday";
import { express } from "@/content/express";
import { localePath, type Lang } from "@/content/i18n";

/**
 * Switches between the Express page and its Black Friday version without a redeploy (the site is static, so the
 * date is checked in the browser): on the campaign page after `end`, visitors go to the normal Express page;
 * on the Express page from the homepage teaser (`promoStart`) to `end`, they go to the campaign page.
 */
export function CampaignGate({ lang, campaign }: { lang: Lang; campaign: boolean }) {
  useEffect(() => {
    if (campaign ? blackFridayEnded() : blackFridayPromoActive()) {
      window.location.replace(localePath(lang, campaign ? express.path : blackFriday.path));
    }
  }, [lang, campaign]);
  return null;
}
