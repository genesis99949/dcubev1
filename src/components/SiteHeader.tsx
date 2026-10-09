"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { CubeMark } from "./CubeMark";
import styles from "./SiteHeader.module.css";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  // While the menu is open: Escape closes it (links close it on click) and the page underneath doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={styles.header} data-open={open}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.name} aria-label={`${site.name} — home`} onClick={() => setOpen(false)}>
          <CubeMark />
          {site.name}
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/#contact" className={`btn ${styles.cta}`} onClick={() => setOpen(false)}>
          {site.hero.primary}
        </Link>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="menu" className={styles.menu} hidden={!open}>
        <ul className="container">
          {[...nav, { label: "Contact", href: "/#contact" }].map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
