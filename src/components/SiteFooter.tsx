import Link from "next/link";
import { localePath, tr, type Lang } from "@/content/i18n";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { CubeMark } from "./CubeMark";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ lang }: { lang: Lang }) {
  const links = [
    { label: tr(ui.nav.work, lang), href: localePath(lang, "/#work") },
    { label: tr(ui.nav.services, lang), href: localePath(lang, "/#services") },
    { label: tr(ui.nav.pricing, lang), href: localePath(lang, "/#pricing") },
    { label: tr(ui.nav.about, lang), href: localePath(lang, "/#about") },
    { label: tr(ui.nav.contact, lang), href: localePath(lang, "/#contact") },
  ];
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Link href={localePath(lang, "/")} className={styles.name}>
          <CubeMark size={16} />
          {site.name}
        </Link>
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
          {site.contact.email ? (
            <li>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          ) : null}
          {site.contact.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.legal}>
          <span>
            © {site.year} {site.owner.name} · {site.name}. {tr(ui.footer.tagline, lang)}
          </span>
          <Link href={localePath(lang, "/privacy")}>{tr(ui.footer.privacy, lang)}</Link>
        </p>
      </div>
    </footer>
  );
}
