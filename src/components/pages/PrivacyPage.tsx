import type { Metadata } from "next";
import { tr, type Lang } from "@/content/i18n";
import { privacy } from "@/content/privacy";
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
      {privacy.sections.map((section) => (
        <section key={section.title.en} className={styles.section}>
          <h2>{tr(section.title, lang)}</h2>
          <p>{tr(section.text, lang)}</p>
        </section>
      ))}
    </main>
  );
}
