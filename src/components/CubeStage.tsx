"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { tr, type Lang } from "@/content/i18n";
import { SERVICES } from "@/content/services";
import { BRAND } from "@/remotion/brand";
import { CssCube } from "@/remotion/components/CssCube";
import { angleDelta, orientationFor } from "@/remotion/lib/cube";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** The six faces, labelled in the page's language. */
const FACES: Record<Lang, { number: string; kicker: string; title: string }[]> = {
  en: SERVICES.map((s, i) => ({ number: String(i + 1).padStart(2, "0"), kicker: s.axis, title: tr(s.label, "en") })),
  ro: SERVICES.map((s, i) => ({ number: String(i + 1).padStart(2, "0"), kicker: s.axis, title: tr(s.label, "ro") })),
};

type Orientation = { pitch: number; yaw: number };
type Turn = { from: Orientation; to: Orientation; start: number; duration: number };

/** Slow in, slow out. */
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

type CubeStageProps = {
  lang: Lang;
  /** Face brought to the front (index into SERVICES). */
  active: number;
  /** Edge length in px. */
  size: number;
  /** Drag to rotate and click faces. */
  interactive?: boolean;
  onFaceClick?: (index: number) => void;
  /** Called when the visitor drags the cube (e.g. to pause an auto-cycle). */
  onInteract?: () => void;
  className?: string;
};

/**
 * The Dcube on the website: eases towards the orientation of `active`, sways gently while idle,
 * and can be dragged. Rendering is the same CssCube the Remotion films use.
 */
export function CubeStage({ lang, active, size, interactive = true, onFaceClick, onInteract, className }: CubeStageProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [orient, setOrient] = useState(() => orientationFor(active));
  // With reduced motion there is no animation loop: show the active face, or where a drag left it.
  const [dragged, setDragged] = useState<{ active: number; orient: Orientation } | null>(null);
  const current = useRef(orientationFor(active));
  const turn = useRef<Turn | null>(null);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const dragMoved = useRef(false);

  // A new face: turn to it along the shortest path, as one smooth, timed move.
  useEffect(() => {
    const to = orientationFor(active);
    if (reducedMotion) {
      current.current = to; // shown directly, see `shown` below
      return;
    }
    const from = current.current;
    const dPitch = to.pitch - from.pitch;
    const dYaw = angleDelta(from.yaw, to.yaw);
    const angle = Math.hypot(dPitch, dYaw);
    if (angle < 0.5) return;
    turn.current = {
      from,
      to: { pitch: from.pitch + dPitch, yaw: from.yaw + dYaw },
      start: performance.now(),
      // ~1.1 s for a quarter turn, a little longer for bigger ones.
      duration: 700 + angle * 4.5,
    };
  }, [active, reducedMotion]);

  // Play the turn, with a gentle idle sway.
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const tick = (now: number) => {
      const t = turn.current;
      if (t && !drag.current) {
        const p = Math.min(1, (now - t.start) / t.duration);
        const e = easeInOut(p);
        current.current = {
          pitch: t.from.pitch + (t.to.pitch - t.from.pitch) * e,
          yaw: t.from.yaw + (t.to.yaw - t.from.yaw) * e,
        };
        if (p >= 1) turn.current = null;
      }
      const sway = drag.current ? 0 : Math.sin(now / 1500) * 2.4;
      setOrient({ pitch: current.current.pitch + sway * 0.4, yaw: current.current.yaw + sway });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  // Drag to rotate (window listeners, so clicks on faces still reach them).
  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive || e.button !== 0) return;
    const start = { x: e.clientX, y: e.clientY };
    turn.current = null; // the finger takes over from any turn in progress
    drag.current = { ...start, moved: false };
    dragMoved.current = false;
    const move = (ev: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      if (!d.moved && Math.abs(ev.clientX - start.x) + Math.abs(ev.clientY - start.y) < 5) return;
      if (!d.moved) onInteract?.();
      d.moved = true;
      dragMoved.current = true;
      const dx = ev.clientX - d.x;
      const dy = ev.clientY - d.y;
      d.x = ev.clientX;
      d.y = ev.clientY;
      const c = current.current;
      current.current = { yaw: c.yaw + dx * 0.45, pitch: Math.max(-85, Math.min(85, c.pitch - dy * 0.45)) };
      if (reducedMotion) setDragged({ active, orient: current.current });
    };
    const up = () => {
      drag.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const shown = reducedMotion
    ? dragged && dragged.active === active
      ? dragged.orient
      : orientationFor(active)
    : orient;

  return (
    <div
      className={className}
      onPointerDown={onPointerDown}
      style={{ cursor: interactive ? "grab" : undefined, touchAction: "pan-y", userSelect: "none" }}
      aria-hidden
    >
      <CssCube
        size={size}
        pitch={shown.pitch}
        yaw={shown.yaw}
        faces={FACES[lang]}
        active={active}
        colors={{ paper: BRAND.colors.paper, ink: BRAND.colors.ink, muted: BRAND.colors.muted, accent: BRAND.colors.accent }}
        fonts={{ sans: "var(--font-sans), sans-serif", mono: "var(--font-sans), sans-serif" }}
        onFaceClick={
          interactive
            ? (i) => {
                if (!dragMoved.current) onFaceClick?.(i);
              }
            : undefined
        }
      />
    </div>
  );
}

/** Cube edge length that follows an element's width. Pass a module-level `fit` function. */
export function useCubeSize(ref: React.RefObject<HTMLElement | null>, fit: (width: number) => number) {
  const [size, setSize] = useState(360);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize(Math.round(fit(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, fit]);
  return size;
}
