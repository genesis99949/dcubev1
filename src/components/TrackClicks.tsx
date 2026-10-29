"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "./track";

/** Which contact link was clicked, by its href. */
const kind = (href: string): TrackEvent | null => {
  if (href.startsWith("mailto:")) return "click_email";
  if (href.startsWith("tel:")) return "click_phone";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "click_whatsapp";
  return null;
};

/**
 * One listener for every email, phone and WhatsApp link on the page, so no link needs its own handler and
 * none is counted twice. Sends only where the link sits (header, main, footer), never the address itself.
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const event = kind(link.getAttribute("href") ?? "");
      if (!event) return;
      const area = link.closest("header, footer, main")?.tagName.toLowerCase() ?? "page";
      track(event, { link_area: area });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
