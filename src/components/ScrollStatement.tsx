"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import styles from "./ScrollStatement.module.css";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * A large statement whose words light up one by one as it scrolls through the viewport.
 * Paragraphs are separated by a blank line ("\n\n"); the lighting runs on across them.
 * Only a single CSS variable (--p, 0 → 1) is updated on scroll; the words derive their
 * opacity from it. Fully lit when motion is reduced.
 */
export function ScrollStatement({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const paragraphs = text.split("\n\n").map((p) => p.split(" "));
  const total = paragraphs.reduce((n, words) => n + words.length, 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top enters the lower part of the screen, 1 when the bottom reaches the middle.
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      el.style.setProperty("--p", String(Math.max(0, Math.min(1, p))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  let index = 0;
  return (
    <div ref={ref} className={`${styles.statement} ${className ?? ""}`} style={{ "--n": total } as React.CSSProperties}>
      {paragraphs.map((words, p) => (
        <p key={p}>
          {words.map((word, i) => (
            <span key={i} className={styles.word} style={{ "--i": index++ } as React.CSSProperties}>
              {word}{" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
