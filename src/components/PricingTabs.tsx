"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { tr, type Lang } from "@/content/i18n";
import { formatPrice, packages } from "@/content/packages";
import { SERVICES, type Service } from "@/content/services";
import { site } from "@/content/site";
import { EventLink } from "./EventLink";
import { PACKAGE_EVENT, SERVICE_EVENT } from "./events";
import styles from "./PricingSection.module.css";

/**
 * A segmented switch between the two services, and that service's two tiers side by side:
 * Start on a light tile, Custom on a dark one. "See prices" on a service tile turns the switch.
 */
export function PricingTabs({ lang, service: fixedService }: { lang: Lang; service?: Service }) {
  const p = site.pricing;
  const [service, setService] = useState<Service>(fixedService ?? SERVICES[0].name);
  const index = SERVICES.findIndex((s) => s.name === service);

  useEffect(() => {
    const onService = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (!fixedService && SERVICES.some((s) => s.name === name)) setService(name as Service);
    };
    window.addEventListener(SERVICE_EVENT, onService);
    return () => window.removeEventListener(SERVICE_EVENT, onService);
  }, [fixedService]);

  return (
    <div className={styles.tabs}>
      {!fixedService ? <div
        role="tablist"
        aria-label={tr(p.switchLabel, lang)}
        className={styles.switch}
        style={{ "--i": index } as React.CSSProperties}
      >
        {SERVICES.map((s) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            id={`tab-${s.name}`}
            aria-selected={s.name === service}
            aria-controls="pricing-panel"
            className={styles.segment}
            onClick={() => setService(s.name)}
          >
            {tr(s.label, lang)}
          </button>
        ))}
      </div> : null}

      {/* Re-keyed per service, so the cards play their entrance again when the switch turns. */}
      <ul key={service} id="pricing-panel" role={fixedService ? undefined : "tabpanel"} aria-labelledby={fixedService ? undefined : `tab-${service}`} className={styles.grid}>
        {packages
          .filter((pkg) => pkg.service === service)
          .map((pkg, i) => {
            const dark = pkg.tier === "custom";
            return (
              <li
                key={pkg.id}
                className={`${styles.card} ${dark ? styles.featured : ""}`}
                style={{ "--d": i * 0.06 } as React.CSSProperties}
              >
                <h3 className={styles.name}>{tr(pkg.name, lang)}</h3>
                <p className={styles.for}>{tr(pkg.for, lang)}</p>
                <p className={styles.price}>
                  {pkg.price === null ? (
                    <span className={styles.request}>{tr(p.onRequest, lang)}</span>
                  ) : (
                    <>
                      <span className={styles.from}>{tr(p.from, lang)} </span>
                      {formatPrice(pkg.price[lang], lang)}
                    </>
                  )}
                </p>
                <ul className={styles.includes}>
                  {pkg.includes.map((item) => (
                    <li key={item.en}>{tr(item, lang)}</li>
                  ))}
                </ul>
                {pkg.editing ? <p className={styles.packageNote}>{tr(pkg.editing, lang)}</p> : null}
                <EventLink
                  event={PACKAGE_EVENT}
                  detail={pkg.id}
                  href="#contact"
                  className={`btn ${dark ? "btn-light" : ""} ${styles.action}`}
                >
                  {tr(p.action, lang)}
                </EventLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
