"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Normalized pointer position (-1..1), written by the canvas wrapper. */
export const pointerState = { x: 0, y: 0 };

/**
 * Shared mutable scroll state. GSAP ScrollTrigger (DOM side) writes;
 * the R3F useFrame loop (canvas side) reads. Deliberately NOT React
 * state — re-rendering per scroll tick would destroy the frame budget.
 */
export const scrollState = {
  /** 0 → 1 across the whole page */
  progress: 0,
  /** 0 → 1 across the Commander Architecture section only */
  archProgress: 0,
  /** normalized [start,end] ranges of the camera chapters, measured from the DOM */
  chapters: {
    hero: [0, 0.1] as [number, number],
    drift: [0.1, 0.48] as [number, number],
    architecture: [0.48, 0.66] as [number, number],
    work: [0.66, 0.82] as [number, number],
    outro: [0.82, 1] as [number, number],
  },
};

function measure() {
  const doc = document.documentElement;
  const total = doc.scrollHeight - window.innerHeight;
  if (total <= 0) return;

  // chapter boundaries anchored to real section offsets
  const pos: Record<string, number | null> = {};
  for (const [key, id] of [
    ["architecture", "section-architecture"],
    ["work", "section-work"],
  ] as const) {
    const el = document.getElementById(id);
    pos[key] = el ? Math.min(1, Math.max(0, el.offsetTop / total)) : null;
  }

  const c = scrollState.chapters;
  const archStart = pos.architecture ?? 0.48;
  const workStart = pos.work ?? Math.min(archStart + 0.18, 0.9);

  c.hero = [0, Math.max(0.06, archStart * 0.35)];
  c.drift = [c.hero[1], archStart];
  c.architecture = [archStart, workStart];
  c.work = [workStart, Math.min(workStart + 0.16, 0.94)];
  c.outro = [c.work[1], 1];
}

/** Wire up GSAP ScrollTrigger drivers. Returns a cleanup fn. */
export function initScrollDrivers(): () => void {
  measure();

  const globalTrigger = ScrollTrigger.create({
    trigger: "#main",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      scrollState.progress = self.progress;
    },
  });

  const archTrigger = ScrollTrigger.create({
    trigger: "#section-architecture",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      scrollState.archProgress = self.progress;
    },
  });

  const onResize = () => {
    measure();
    globalTrigger.refresh();
    archTrigger.refresh();
  };
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    globalTrigger.kill();
    archTrigger.kill();
  };
}
