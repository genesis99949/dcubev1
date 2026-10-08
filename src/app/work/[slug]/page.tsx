import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import { ProjectMedia } from "@/components/ProjectMedia";
import { getProject, projects, type GalleryItem } from "@/content/projects";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const { cover } = project;
  const image =
    cover.kind === "video" ? cover.poster : cover.kind === "image" ? cover.src : undefined;
  return {
    title: project.title,
    description: project.summary,
    openGraph: image ? { images: [image] } : undefined,
  };
}

const mediaKey = (item: GalleryItem) => (item.kind === "vimeo" ? item.id : item.src);

function GalleryFigure({ item, eager }: { item: GalleryItem; eager?: boolean }) {
  const half = item.span === "half";
  return (
    <figure className={half ? styles.half : styles.full}>
      <div className={styles.frame}>
        <ProjectMedia
          media={item}
          // The article column is at most ~1120px wide.
          sizes={half ? "(max-width: 760px) 100vw, 560px" : "(max-width: 1200px) 100vw, 1120px"}
          controls
          eager={eager}
        />
      </div>
      {item.caption ? <figcaption className={styles.caption}>{item.caption}</figcaption> : null}
    </figure>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = projects.indexOf(project);
  const next = projects[(position + 1) % projects.length];
  const facts = [{ label: "Year", value: String(project.year) }, ...(project.details ?? [])];

  return (
    <main className="container">
      <article className={styles.article}>
        <header className={styles.head}>
          <Link href="/#work" className={styles.back}>
            <span aria-hidden>‹</span> All work
          </Link>
          <p className={`eyebrow ${styles.services} reveal`}>{project.services.join(" · ")}</p>
          <h1 className={`${styles.title} reveal`} style={{ "--d": 0.06 } as React.CSSProperties}>
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className={`lead ${styles.subtitle} reveal`} style={{ "--d": 0.12 } as React.CSSProperties}>
              {project.subtitle}
            </p>
          ) : null}
        </header>

        {project.lead ? (
          <div className={`${styles.gallery} reveal`} style={{ "--d": 0.22 } as React.CSSProperties}>
            <GalleryFigure item={project.lead} eager />
          </div>
        ) : null}

        <div className={styles.intro}>
          <div className={styles.introText}>
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {project.sections.map((section, i) => (
          <section key={section.title} className={styles.section} aria-labelledby={`section-${i}`}>
            <div className={`${styles.sectionText} rise`}>
              <h2 id={`section-${i}`} className={styles.sectionTitle}>
                {section.title}
              </h2>
              <div className={styles.text}>
                {section.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            {section.media.length > 0 ? (
              <div className={styles.gallery}>
                {section.media.map((item) => (
                  <GalleryFigure key={mediaKey(item)} item={item} />
                ))}
              </div>
            ) : null}
          </section>
        ))}

        {next && next.slug !== project.slug ? (
          <Link href={`/work/${next.slug}`} className={`${styles.next} rise`}>
            <span className="eyebrow">Next project</span>
            <span className={styles.nextTitle}>{next.title}</span>
            {next.subtitle ? <span className={`lead ${styles.nextSubtitle}`}>{next.subtitle}</span> : null}
            <span className={`more ${styles.nextMore}`}>View case study</span>
          </Link>
        ) : null}
      </article>
    </main>
  );
}
