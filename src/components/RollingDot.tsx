"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const INITIAL_DELAY = 5;
const REPEAT_EVERY = 4;
const LEG_DURATION = 0.9;

/** The hero's square tumbles out and back, starting a new trip every four seconds. */
export function RollingDot() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const position = { progress: 0 };
      const setPosition = gsap.quickSetter(dot, "css");
      let side = 0;
      let quarters = 4;

      const render = () => {
        const turns = position.progress * quarters;
        const completed = Math.floor(turns);
        const angle = (turns - completed) * Math.PI / 2;

        // Rotate about each successive lower corner, keeping that corner on the baseline.
        setPosition({
          x: side * (completed + (1 - Math.cos(angle) + Math.sin(angle)) / 2),
          y: side * (1 - Math.cos(angle) - Math.sin(angle)) / 2,
          rotation: turns * 90,
        });
      };

      const measure = () => {
        setPosition({ x: 0, y: 0, rotation: 0 });
        const rect = dot.getBoundingClientRect();
        side = rect.width;
        const available = Math.max(0, window.innerWidth - rect.right - 8);
        quarters = side > 0 ? Math.min(4, Math.floor(available / side)) : 0;
        render();
      };

      measure();
      window.addEventListener("resize", measure);

      gsap.timeline({
        delay: INITIAL_DELAY,
        repeat: -1,
        repeatDelay: REPEAT_EVERY - 2 * LEG_DURATION,
        defaults: { duration: LEG_DURATION, ease: "power2.inOut" },
        onUpdate: render,
      })
        .to(position, { progress: 1 })
        .to(position, { progress: 0 });

      return () => {
        window.removeEventListener("resize", measure);
        dot.style.removeProperty("transform");
      };
    });

    return () => media.revert();
  }, []);

  return <span ref={ref} className="dot" aria-hidden="true" />;
}
