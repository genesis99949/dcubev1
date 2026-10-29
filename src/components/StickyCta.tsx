"use client";

import { useEffect, useState } from "react";
import styles from "./StickyCta.module.css";

/**
 * A slim bar at the bottom of the screen on phones: shown once the hero's buttons (`watch` = their id) have
 * scrolled away, hidden again when the contact section comes into view. Desktop never shows it.
 */
export function StickyCta({ label, action, watch }: { label: string; action: string; watch: string }) {
  const [heroGone, setHeroGone] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(watch);
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // "Gone" = scrolled above the viewport; "reached" = in view or already passed.
        const above = entry.boundingClientRect.bottom < 0;
        if (entry.target === hero) setHeroGone(!entry.isIntersecting && above);
        if (entry.target === contact) setAtContact(entry.isIntersecting || entry.boundingClientRect.top < 0);
      }
    });
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, [watch]);

  const visible = heroGone && !atContact;
  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <p>{label}</p>
      <a href="#contact" className="btn btn-light" tabIndex={visible ? undefined : -1}>
        {action}
      </a>
    </div>
  );
}
