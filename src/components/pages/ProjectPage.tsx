import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectVideoAds } from "@/components/ProjectVideoAds";
import { StructuredData } from "@/components/StructuredData";
import { ToolChips } from "@/components/ToolChips";
import { localePath, tr, type Lang } from "@/content/i18n";
import { getProject, projects, type GalleryItem } from "@/content/projects";
import { pageMetadata } from "@/content/seo";
import { projectStructuredData } from "@/content/structured-data";
import { ui } from "@/content/ui";
import styles from "./ProjectPage.module.css";

export type ProjectPageProps = { params: Promise<{ slug: string }> };

/** One static page per project (shared by the English and Romanian routes). */
export const projectStaticParams = () => projects.map((project) => ({ slug: project.slug }));

export async function projectMetadata(lang: Lang, { params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { cover } = project;
  const image = cover.kind === "video" ? cover.poster : cover.kind === "image" ? cover.src : undefined;
  return pageMetadata({
    lang,
    path: `/work/${slug}`,
    title: tr(project.seo.title, lang),
    description: tr(project.seo.description, lang),
    image: image ? { url: image, width: cover.width, height: cover.height, alt: tr(cover.alt, lang) } : undefined,
  });
}

const mediaKey = (item: GalleryItem) => (item.kind === "vimeo" ? item.id : item.src);

function GalleryFigure({ lang, item, eager }: { lang: Lang; item: GalleryItem; eager?: boolean }) {
  const half = item.span === "half";
  return (
    <figure className={half ? styles.half : styles.full}>
      <div className={styles.frame}>
        <ProjectMedia
          lang={lang}
          media={item}
          // The article column is at most ~1120px wide.
          sizes={half ? "(max-width: 760px) 100vw, 560px" : "(max-width: 1200px) 100vw, 1120px"}
          controls
          eager={eager}
        />
      </div>
      {item.caption ? <figcaption className={styles.caption}>{tr(item.caption, lang)}</figcaption> : null}
    </figure>
  );
}

/** A case study, in either language. */
export async function ProjectPage({ lang, params }: ProjectPageProps & { lang: Lang }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = (text: { en: string; ro: string }) => tr(text, lang);
  const position = projects.indexOf(project);
  const next = projects[(position + 1) % projects.length];
  const facts = [{ label: ui.work.year, value: { en: String(project.year), ro: String(project.year) } }, ...(project.details ?? [])];

  return (
    <main className="container">
      <StructuredData data={projectStructuredData(project, lang)} />
      <article className={styles.article}>
        <header className={styles.head}>
          <Link href={localePath(lang, "/#work")} className={styles.back}>
            <span aria-hidden>‹</span> {t(ui.work.allWork)}
          </Link>
          <p className={`eyebrow ${styles.services} reveal`}>{project.scope.map((s) => t(s)).join(" · ")}</p>
          <h1 className={`${styles.title} reveal`} style={{ "--d": 0.06 } as React.CSSProperties}>
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className={`lead ${styles.subtitle} reveal`} style={{ "--d": 0.12 } as React.CSSProperties}>
              {t(project.subtitle)}
            </p>
          ) : null}
        </header>

        {project.lead ? (
          <div className={`${styles.gallery} reveal`} style={{ "--d": 0.22 } as React.CSSProperties}>
            <GalleryFigure lang={lang} item={project.lead} eager />
          </div>
        ) : null}

        <div className={styles.intro}>
          <div className={styles.introText}>
            {project.description.map((paragraph) => (
              <p key={paragraph.en}>{t(paragraph)}</p>
            ))}
          </div>
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label.en}>
                <dt>{t(fact.label)}</dt>
                <dd>
                  {"href" in fact && fact.href ? (
                    <a href={fact.href} className="link" target="_blank" rel="noreferrer">
                      {t(fact.value)}
                    </a>
                  ) : (
                    t(fact.value)
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {project.stack ? (
            <div className={styles.stack}>
              <ToolChips label={t(ui.work.builtWith)} ids={project.stack.built} />
              <ToolChips label={t(ui.work.madeWith)} ids={project.stack.made} />
            </div>
          ) : null}
        </div>

        {project.sections.map((section, i) => (
          <section key={section.title.en} className={styles.section} aria-labelledby={`section-${i}`}>
            <div className={`${styles.sectionText} rise`}>
              <h2 id={`section-${i}`} className={styles.sectionTitle}>
                {t(section.title)}
              </h2>
              <div className={styles.text}>
                {section.text.map((paragraph) => (
                  <p key={paragraph.en}>{t(paragraph)}</p>
                ))}
              </div>
            </div>
            {section.media.length > 0 ? (
              <div className={styles.gallery}>
                {section.media.map((item) => (
                  <GalleryFigure key={mediaKey(item)} lang={lang} item={item} />
                ))}
              </div>
            ) : null}
            {section.videoAds ? <ProjectVideoAds lang={lang} ads={section.videoAds} /> : null}
          </section>
        ))}

        {next && next.slug !== project.slug ? (
          <Link href={localePath(lang, `/work/${next.slug}`)} className={`${styles.next} rise`}>
            <span className="eyebrow">{t(ui.work.nextProject)}</span>
            <span className={styles.nextTitle}>{next.title}</span>
            {next.subtitle ? <span className={`lead ${styles.nextSubtitle}`}>{t(next.subtitle)}</span> : null}
            <span className={`more ${styles.nextMore}`}>{t(ui.work.viewCaseStudy)}</span>
          </Link>
        ) : null}
      </article>
    </main>
  );
}
