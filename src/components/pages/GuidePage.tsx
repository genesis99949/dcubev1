import type { Metadata } from "next";
import { GuideForm } from "@/components/GuideForm";
import { HeadingText } from "@/components/HeadingText";
import { guide } from "@/content/guide";
import { localePath, tr, type Lang } from "@/content/i18n";
import { formatPrice, packages } from "@/content/packages";
import { pageMetadata } from "@/content/seo";
import { site } from "@/content/site";
import styles from "./ServicePage.module.css";
import g from "./GuidePage.module.css";

export const guideMetadata = (lang: Lang): Metadata => ({
  ...pageMetadata({ lang, path: guide.path, title: tr(guide.metaTitle, lang), description: tr(guide.description, lang) }),
  // A draft until Ramon approves it: keep it out of search results.
  ...(guide.published ? {} : { robots: { index: false, follow: true } }),
});

/** The guide's own page is the source of the PDF and the "read online" link: never indexed. */
export const guideDocumentMetadata = (lang: Lang): Metadata => ({
  ...pageMetadata({ lang, path: guide.documentPath, title: tr(guide.documentTitle, lang), description: tr(guide.description, lang) }),
  robots: { index: false, follow: true },
});

/** The landing page: what the guide covers, then the form that hands it over. */
export function GuidePage({ lang }: { lang: Lang }) {
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  const inside = [...guide.chapters.map((chapter) => chapter.title), guide.costsTitle, guide.questionsTitle];

  return (
    <main>
      <section className={`container ${styles.hero}`} aria-labelledby="guide-title">
        <p className="eyebrow">{t(guide.eyebrow)}</p>
        <h1 id="guide-title" className={`${styles.title} ${g.title} reveal`}>{t(guide.title)}</h1>
        <p className={`lead ${styles.intro}`}>{t(guide.intro)}</p>
        <div className={styles.actions}>
          <a href="#guide-form" className="btn">{t(guide.cta)}</a>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="inside-title">
        <header className={styles.head}>
          <h2 id="inside-title" className="headline"><HeadingText text={t(guide.insideTitle)} /></h2>
          <p className="lead">{t(guide.origin)}</p>
        </header>
        <ol className={g.inside}>
          {inside.map((title, i) => (
            <li key={title.en} className="rise">
              <span className={g.number} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {t(title)}
            </li>
          ))}
        </ol>
      </section>

      <section id="guide-form" className={`${styles.contact} ${g.formSection}`} aria-labelledby="form-title">
        <div className={`container ${styles.contactInner}`}>
          <h2 id="form-title" className="headline"><HeadingText text={t(guide.formTitle)} /></h2>
          <p className={`lead ${styles.contactText}`}>{t(guide.formText)}</p>
          <GuideForm lang={lang} />
        </div>
      </section>
    </main>
  );
}

/** The guide itself, laid out to read on screen and to print on A4 (scripts/render-guide.mjs). */
export function GuideDocument({ lang }: { lang: Lang }) {
  const t = (text: { en: string; ro: string }) => tr(text, lang);
  const price = (id: string) => {
    const pkg = packages.find((p) => p.id === id);
    return pkg?.price ? formatPrice(pkg.price[lang], lang) : "";
  };
  const prices = t(guide.pricesFrom).replace("{website}", price("website-start")).replace("{store}", price("store-start"));
  const siteHost = new URL(site.url).host;

  return (
    <main className={g.document}>
      <article className={g.paper}>
        <header className={g.cover}>
          <p className="eyebrow">{t(guide.eyebrow)} · {site.name}</p>
          <h1>{t(guide.documentTitle)}</h1>
          <p className={g.coverIntro}>{t(guide.documentIntro)}</p>
        </header>

        {guide.chapters.map((chapter, i) => (
          <section key={chapter.title.en} className={g.chapter}>
            <h2><span className={g.number}>{String(i + 1).padStart(2, "0")}</span>{t(chapter.title)}</h2>
            <p className={g.chapterText}>{t(chapter.text)}</p>
            <ul className={g.checklist}>
              {chapter.items.map((item) => <li key={item.en}>{t(item)}</li>)}
            </ul>
          </section>
        ))}

        <section className={g.chapter}>
          <h2><span className={g.number}>{String(guide.chapters.length + 1).padStart(2, "0")}</span>{t(guide.costsTitle)}</h2>
          <p className={g.chapterText}>{t(guide.costsText)}</p>
          <dl className={g.costs}>
            {guide.costs.map((cost) => (
              <div key={cost.item.en}>
                <dt>{t(cost.item)}</dt>
                <dd>{t(cost.note)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={g.chapter}>
          <h2><span className={g.number}>{String(guide.chapters.length + 2).padStart(2, "0")}</span>{t(guide.questionsTitle)}</h2>
          <ul className={g.checklist}>
            {guide.questions.map((question) => <li key={question.en}>{t(question)}</li>)}
          </ul>
        </section>

        <footer className={g.closing}>
          <h2>{t(guide.closingTitle)}</h2>
          <p>{t(guide.closingText)}</p>
          <p className={g.prices}>{prices}</p>
          {/* Absolute, so the link still points at the live site from inside the PDF. */}
          <a href={new URL(localePath(lang, "/#contact"), site.url).toString()} className={g.siteLink}>{siteHost}</a>
        </footer>
      </article>
    </main>
  );
}
