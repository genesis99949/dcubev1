"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/content/services";
import { CubeStage, useCubeSize } from "./CubeStage";
import styles from "./ServicesScroll.module.css";

type ProjectLink = { slug: string; title: string };

const fit = (width: number) => (width < 600 ? width * 0.42 : Math.min(width * 0.64, 400));

/**
 * The six services, told by scroll: the cube stays pinned and turns to each service's face
 * as its description passes the middle of the screen.
 */
export function ServicesScroll({ projectsByService }: { projectsByService: Record<string, ProjectLink[]> }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const size = useCubeSize(stageRef, fit);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    for (const el of items.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.pin}>
        <div ref={stageRef} className={styles.stage}>
          <CubeStage
            active={active}
            size={size}
            onFaceClick={(i) => items.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
          />
        </div>
      </div>
      <ol className={styles.list}>
        {SERVICES.map((service, i) => {
          const projects = projectsByService[service.name] ?? [];
          return (
            <li
              key={service.name}
              ref={(el) => {
                items.current[i] = el;
              }}
              data-index={i}
              data-active={i === active}
              className={styles.item}
            >
              <p className={styles.axis}>
                {service.axis} <span aria-hidden>·</span> {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className={styles.name}>{service.name}</h3>
              <p className={styles.text}>{service.short}</p>
              {projects.length > 0 ? (
                <p className={styles.projects}>
                  {projects.map((p) => (
                    <Link key={p.slug} href={`/work/${p.slug}`} className="more">
                      {p.title}
                    </Link>
                  ))}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
