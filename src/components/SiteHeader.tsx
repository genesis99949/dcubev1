"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { express } from "@/content/express";
import { localePath, switchPath, tr, type Lang } from "@/content/i18n";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import styles from "./SiteHeader.module.css";

export function SiteHeader({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const other: Lang = lang === "en" ? "ro" : "en";
  const onServicePage = ["/website-design", "/online-store", "/one-page-express"].some((path) => localePath(lang, path) === pathname);
  const contactHref = onServicePage ? "#contact" : localePath(lang, "/#contact");
  // The One-Page Express page is a funnel: no menu to wander off through, only the request button.
  const funnel = localePath(lang, express.path) === pathname;

  const nav = [
    { label: tr(ui.nav.work, lang), href: localePath(lang, "/#work") },
    { label: tr(ui.nav.services, lang), href: localePath(lang, "/#services") },
    { label: tr(ui.nav.pricing, lang), href: onServicePage ? "#pricing" : localePath(lang, "/#pricing") },
    { label: tr(ui.nav.video, lang), href: localePath(lang, "/#video") },
    { label: tr(ui.nav.about, lang), href: localePath(lang, "/#about") },
  ];

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

  // The two languages use separate root layouts, so switching is a normal page load.
  const languageLink = (className: string, long = false) => (
    <a
      href={switchPath(pathname, other)}
      hrefLang={other}
      lang={other}
      className={className}
      aria-label={tr(ui.nav.otherLanguage, lang)}
    >
      {long ? tr(ui.nav.otherLanguage, lang) : tr(ui.nav.otherLanguageShort, lang)}
    </a>
  );

  if (funnel) {
    return (
      <header className={`${styles.header} ${styles.funnel}`}>
        <div className={`container ${styles.bar}`}>
          <span className={styles.name}>
            {site.name}
            <span className="mark" aria-hidden />
          </span>
          {languageLink(styles.lang)}
          <a href="#contact" className={`btn ${styles.cta}`}>
            {tr(express.sticky, lang)}
          </a>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header} data-open={open}>
      <div className={`container ${styles.bar}`}>
        <Link
          href={localePath(lang, "/")}
          className={styles.name}
          aria-label={`${site.name} — ${tr(ui.nav.home, lang)}`}
          onClick={() => setOpen(false)}
        >
          {site.name}
          <span className="mark" aria-hidden />
        </Link>
        <nav aria-label={tr(ui.nav.main, lang)} className={styles.nav}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {languageLink(styles.lang)}
        <Link href={contactHref} className={`btn ${styles.cta}`} onClick={() => setOpen(false)}>
          {tr(site.hero.primary, lang)}
        </Link>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={tr(open ? ui.nav.closeMenu : ui.nav.openMenu, lang)}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="menu" className={styles.menu} hidden={!open}>
        <ul className="container">
          {[...nav, { label: tr(ui.nav.contact, lang), href: contactHref }].map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className={styles.menuLang}>{languageLink("", true)}</li>
        </ul>
      </div>
    </header>
  );
}
