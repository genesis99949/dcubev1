"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/content/i18n";
import styles from "./ExpressDialog.module.css";
import { ExpressForm } from "./ExpressForm";

/**
 * The Express request form in a modal. Every link to "#contact" on the page (hero, templates, comparison,
 * sticky bar, header) opens it instead of scrolling; without JavaScript they still lead to the form at the
 * bottom of the page. A template link's TEMPLATE_EVENT still reaches the form, which skips to step 2.
 */
export function ExpressDialog({ lang }: { lang: Lang }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Capture phase: runs before the link's own click handler, so the form is open when the event arrives.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href="#contact"]');
      if (!link || dialog.current?.contains(link)) return;
      e.preventDefault();
      const box = dialog.current;
      if (!box || box.open) return;
      box.showModal();
      // Start on the current step's question rather than on the close button.
      [...box.querySelectorAll<HTMLElement>("h3[tabindex]")].find((h) => h.offsetParent !== null)?.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label="One-Page Express"
      // A click on the dimmed backdrop (the dialog element itself, outside the form) closes it.
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <ExpressForm lang={lang} onClose={close} />
    </dialog>
  );
}
