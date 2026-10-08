"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/content/services";
import { BRAND } from "@/remotion/brand";
import { CssCube } from "@/remotion/components/CssCube";
import { angleDelta, orientationFor } from "@/remotion/lib/cube";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const FACES = SERVICES.map((s, i) => ({
  number: String(i + 1).padStart(2, "0"),
  kicker: s.axis,
  title: s.name,
}));

type CubeStageProps = {
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
export function CubeStage({ active, size, interactive = true, onFaceClick, onInteract, className }: CubeStageProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [orient, setOrient] = useState(() => orientationFor(active));
  const current = useRef(orientationFor(active));
  const target = useRef(orientationFor(active));
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const dragMoved = useRef(false);

  useEffect(() => {
    target.current = orientationFor(active);
    if (reducedMotion) {
      current.current = target.current;
      setOrient(target.current);
    }
  }, [active, reducedMotion]);

  // Ease towards the target, with a gentle idle sway.
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag.current) {
        const k = 1 - Math.exp(-dt * 4.5);
        const c = current.current;
        const t = target.current;
        current.current = { pitch: c.pitch + (t.pitch - c.pitch) * k, yaw: c.yaw + angleDelta(c.yaw, t.yaw) * k };
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
      target.current = current.current;
      if (reducedMotion) setOrient(current.current);
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

  return (
    <div
      className={className}
      onPointerDown={onPointerDown}
      style={{ cursor: interactive ? "grab" : undefined, touchAction: "pan-y", userSelect: "none" }}
      aria-hidden
    >
      <CssCube
        size={size}
        pitch={orient.pitch}
        yaw={orient.yaw}
        faces={FACES}
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
