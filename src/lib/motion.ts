"use client";

import { useEffect, useState } from "react";

/**
 * True when the user has asked the OS for reduced motion.
 * Fully disables camera moves and particle animation — callers
 * render a static SVG fallback instead of the R3F canvas.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * True once the browser has been idle after load — used to mount
 * the WebGL canvas without ever blocking first paint / LCP.
 */
export function useIdleAfterLoad(delayMs = 350): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const start = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      if (w.requestIdleCallback) {
        w.requestIdleCallback(() => setTimeout(() => setIdle(true), delayMs), { timeout: 2500 });
      } else {
        setTimeout(() => setIdle(true), delayMs + 1200);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [delayMs]);

  return idle;
}
