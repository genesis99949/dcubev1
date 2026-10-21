import Link from "next/link";
import { localePath, tr, type Lang } from "@/content/i18n";
import { projects } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { site } from "@/content/site";
import { EventLink } from "./EventLink";
import { SERVICE_EVENT } from "./events";
import styles from "./ServicesSection.module.css";

/**
 * The two services, side by side: what it is, who it's for, the projects that show it,
 * and a button that jumps to the pricing, switched to that service.
 */
export function ServicesSection({ lang }: { lang: Lang }) {
  const s = site.services;
  return (
    <ul className={styles.grid}>
      {SERVICES.map((service, i) => {
        const examples = projects.filter((p) => p.services.includes(service.name));
        return (
          <li key={service.name} className={`${styles.tile} rise`}>
            <p className={styles.number}>{String(i + 1).padStart(2, "0")}</p>
            <h3 className={styles.name}>{tr(service.label, lang)}</h3>
            <p className={styles.text}>{tr(service.short, lang)}</p>
            <p className={styles.for}>{tr(service.for, lang)}</p>
            {examples.length > 0 ? (
              <p className={styles.examples}>
                <span>{tr(s.seeWork, lang)}</span>
                {examples.map((p) => (
                  <Link key={p.slug} href={localePath(lang, `/work/${p.slug}`)} className="more">
                    {p.title}
                  </Link>
                ))}
              </p>
            ) : null}
            <EventLink event={SERVICE_EVENT} detail={service.name} href="#pricing" className={`btn ${styles.action}`}>
              {tr(s.action, lang)}
            </EventLink>
          </li>
        );
      })}
    </ul>
  );
}
