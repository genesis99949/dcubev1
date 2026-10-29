import { useSyncExternalStore } from "react";
import { express } from "@/content/express";
import type { Lang } from "@/content/i18n";

// The Express "I already have a domain" switch, shared by the hero price and the request form, so flipping
// one flips the other. Off by default: the price includes the domain for the first year.

let ownDomain = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function setOwnDomain(value: boolean) {
  ownDomain = value;
  for (const listener of listeners) listener();
}

export const useOwnDomain = () => useSyncExternalStore(subscribe, () => ownDomain, () => false);

export const expressPrice = (own: boolean, lang: Lang) => (own ? express.priceOwnDomain : express.price)[lang];
