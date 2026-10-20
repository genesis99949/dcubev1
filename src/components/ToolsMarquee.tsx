import Image from "next/image";
import type React from "react";
import { tr, type Lang } from "@/content/i18n";
import { TOOLS, tools, type Tool } from "@/content/tools";
import styles from "./ToolsMarquee.module.css";

function ToolList({ items, unique, hidden }: { items: Tool[]; unique: number; hidden?: boolean }) {
  return (
    <ul className={styles.track} aria-hidden={hidden || undefined}>
      {items.map((tool, i) => (
        // A row's items appear twice per copy, so the index keeps the keys unique.
        <li key={`${tool.name}-${i}`} className={styles.item} data-repeat={i >= unique || undefined}>
          <Image
            src={tool.logo!}
            width={tool.width}
            height={tool.height}
            alt={tool.wordmark ? tool.name : ""}
            // Tiny SVGs that slide in from off-screen: load them all up front so none pops in late.
            loading="eager"
            className={tool.wordmark ? styles.wordmark : styles.logo}
          />
          {tool.wordmark ? null : <span>{tool.name}</span>}
        </li>
      ))}
    </ul>
  );
}

/**
 * The tools and platforms, in a few rows that drift endlessly in alternating directions
 * (pure CSS: each row is rendered twice and slides by half its width). Pauses on hover;
 * static and wrapped when the visitor prefers reduced motion.
 */
export function ToolsMarquee({ lang }: { lang: Lang }) {
  return (
    <section className={`container ${styles.tools}`} aria-labelledby="tools-title">
      <h2 id="tools-title" className={`eyebrow ${styles.label}`}>
        {tr(tools.label, lang)}
      </h2>
      <div className={styles.panel}>
        {tools.rows.map((ids, r) => {
          const row: Tool[] = ids.map((id) => TOOLS[id]);
          // Short rows are doubled so one copy is always wider than the panel.
          const items = row.length < 8 ? [...row, ...row] : row;
          return (
            <div
              key={row[0].name}
              className={styles.viewport}
              style={{ "--duration": `${items.length * 5}s` } as React.CSSProperties}
              data-reverse={r % 2 === 1}
            >
              <div className={styles.marquee}>
                <ToolList items={items} unique={row.length} />
                <ToolList items={items} unique={row.length} hidden />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
