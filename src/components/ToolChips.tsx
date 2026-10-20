import Image from "next/image";
import { TOOLS, type ToolId } from "@/content/tools";
import styles from "./ToolChips.module.css";

/** A labelled, wrapping row of tool logos (case studies: "Built with" / "Made with"). */
export function ToolChips({ label, ids }: { label: string; ids: ToolId[] }) {
  return (
    <div className={styles.group}>
      <p className={styles.label}>{label}</p>
      <ul className={styles.chips}>
        {ids.map((id) => {
          const tool = TOOLS[id];
          return (
            <li key={id} className={styles.chip} title={tool.name}>
              {"logo" in tool && tool.logo ? (
                <Image
                  src={tool.logo}
                  width={tool.width}
                  height={tool.height}
                  alt={tool.wordmark ? tool.name : ""}
                  className={tool.wordmark ? styles.wordmark : styles.logo}
                />
              ) : null}
              {"wordmark" in tool && tool.wordmark ? null : <span>{tool.name}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
