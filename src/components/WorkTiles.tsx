import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "./ProjectMedia";
import styles from "./WorkTiles.module.css";

/** One large tile per project — title, one line, a link, and the cover playing underneath. */
export function WorkTiles({ projects }: { projects: Project[] }) {
  return (
    <ul className={styles.tiles}>
      {projects.map((project, i) => (
        <li key={project.slug} className={`${styles.tile} ${i % 2 === 0 ? styles.dark : styles.light} rise`}>
          <Link href={`/work/${project.slug}`} className={styles.link} aria-label={`${project.title} — view case study`}>
            <div className={styles.copy}>
              <p className={styles.services}>{project.services.join(" · ")}</p>
              <h3 className={styles.title}>{project.title}</h3>
              {project.subtitle ? <p className={styles.subtitle}>{project.subtitle}</p> : null}
              <span className={`more ${styles.more}`}>View case study</span>
            </div>
            <div className={styles.media}>
              <ProjectMedia media={project.cover} sizes="(max-width: 1336px) 100vw, 1240px" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
