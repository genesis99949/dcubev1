import Link from "next/link";
import { site } from "@/content/site";
import { CubeMark } from "./CubeMark";
import styles from "./SiteFooter.module.css";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.name}>
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
          © {site.year} {site.owner.name} · {site.name}. Web · Branding · Marketing.
        </p>
      </div>
    </footer>
  );
}
