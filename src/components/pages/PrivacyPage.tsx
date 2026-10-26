import type { Metadata } from "next";
import { tr, type Lang } from "@/content/i18n";
import { privacy } from "@/content/privacy";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { pageMetadata } from "@/content/seo";
import styles from "./PrivacyPage.module.css";

export const privacyMetadata = (lang: Lang): Metadata => pageMetadata({
  lang,
  path: "/privacy",
  title: tr(privacy.title, lang),
  description: tr(privacy.intro, lang),
});

/** The privacy policy, in either language. */
export function PrivacyPage({ lang }: { lang: Lang }) {
  return (
    <main className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1 className="headline">{tr(privacy.title, lang)}</h1>
        <p className={styles.updated}>{tr(privacy.updated, lang)}</p>
        <p className="lead">{tr(privacy.intro, lang)}</p>
      </header>
      <section className={styles.section}>
        <h2>{tr(privacy.controllerTitle, lang)}</h2>
        <p>{site.business.name}</p>
        <p>{tr(ui.footer.taxId, lang)}: {site.business.cui} · {tr(ui.footer.registration, lang)}: {site.business.registration}</p>
        <p>EUID: {site.business.euid}</p>
        <p><a className="link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
      </section>
      {privacy.sections.map((section) => (
        <section key={section.title.en} className={styles.section}>
          <h2>{tr(section.title, lang)}</h2>
          <p>{tr(section.text, lang)}</p>
        </section>
      ))}
      <section className={styles.section}>
        <h2>{tr(privacy.resourcesTitle, lang)}</h2>
        <ul className={styles.resources}>
          {privacy.resources.map((resource) => (
            <li key={resource.href}>
              <a className="link" href={resource.href}>{tr(resource.label, lang)}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
