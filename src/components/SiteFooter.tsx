import Link from "next/link";
import { localePath, tr, type Lang } from "@/content/i18n";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { express, linkExpress } from "@/content/express";
import { servicePages } from "@/content/service-pages";
import { serviceLabel } from "@/content/services";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ lang }: { lang: Lang }) {
  const explore = [
    { label: tr(ui.nav.work, lang), href: localePath(lang, "/#work") },
    { label: tr(ui.nav.pricing, lang), href: localePath(lang, "/#pricing") },
    { label: tr(ui.nav.about, lang), href: localePath(lang, "/#about") },
  ];
  const services = [
    ...Object.values(servicePages).map((page) => ({ label: tr(serviceLabel(page.service), lang), href: localePath(lang, page.path) })),
    ...(linkExpress ? [{ label: express.name, href: localePath(lang, express.path) }] : []),
    { label: tr(ui.footer.video, lang), href: localePath(lang, "/#video") },
  ];
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href={localePath(lang, "/")} className={styles.name}>
              {site.name}<span className="mark" aria-hidden />
            </Link>
            <p>{tr(ui.footer.tagline, lang)}</p>
          </div>
          <nav className={styles.group} aria-label={tr(ui.footer.explore, lang)}>
            <h2>{tr(ui.footer.explore, lang)}</h2>
            <ul className={styles.links}>
              {explore.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
            </ul>
          </nav>
          <nav className={styles.group} aria-label={tr(ui.nav.services, lang)}>
            <h2>{tr(ui.nav.services, lang)}</h2>
            <ul className={styles.links}>
              {services.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
            </ul>
          </nav>
          <nav className={`${styles.group} ${styles.contact}`} aria-label={tr(ui.nav.contact, lang)}>
            <h2>{tr(ui.nav.contact, lang)}</h2>
            <ul className={styles.links}>
              <li><Link href={localePath(lang, "/#contact")}>{tr(site.hero.primary, lang)}</Link></li>
              {site.contact.email ? <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li> : null}
              {site.contact.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className={styles.legal}>
          <span>
            © {site.year} {site.name}.
          </span>
          <Link href={localePath(lang, "/privacy")}>{tr(ui.footer.privacy, lang)}</Link>
        </p>
        <p className={styles.business}>
          <span>{site.business.name}</span>
          <span>{tr(ui.footer.taxId, lang)}: {site.business.cui} · {tr(ui.footer.registration, lang)}: {site.business.registration}</span>
        </p>
      </div>
    </footer>
  );
}
