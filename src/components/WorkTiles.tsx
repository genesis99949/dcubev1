import Link from "next/link";
import { localePath, tr, type Lang } from "@/content/i18n";
import type { Project } from "@/content/projects";
import { ui } from "@/content/ui";
import { ProjectMedia } from "./ProjectMedia";
import styles from "./WorkTiles.module.css";

/** One large tile per project — title, one line, a link, and the cover playing underneath. */
export function WorkTiles({ lang, projects }: { lang: Lang; projects: Project[] }) {
  const view = tr(ui.work.viewCaseStudy, lang);
  return (
    <ul className={styles.tiles}>
      {projects.map((project, i) => (
        <li key={project.slug} className={`${styles.tile} ${i % 2 === 0 ? styles.dark : styles.light} rise`}>
          <Link href={localePath(lang, `/work/${project.slug}`)} className={styles.link} aria-label={`${project.title} — ${view}`}>
            <div className={styles.copy}>
              <p className={styles.services}>{project.scope.map((s) => tr(s, lang)).join(" · ")}</p>
              <h3 className={styles.title}>{project.title}</h3>
              {project.subtitle ? <p className={styles.subtitle}>{tr(project.subtitle, lang)}</p> : null}
              <span className={`more ${styles.more}`}>{view}</span>
            </div>
            <div className={styles.media}>
              <ProjectMedia lang={lang} media={project.cover} sizes="(max-width: 1336px) 100vw, 1240px" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
