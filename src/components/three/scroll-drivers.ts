"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "./scroll-store";

gsap.registerPlugin(ScrollTrigger);

function measure() {
  const doc = document.documentElement;
  const total = doc.scrollHeight - window.innerHeight;
  if (total <= 0) return;

  // Chapter boundaries are anchored to real section offsets.
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

/** Register scroll animation drivers only when the visual scene is needed. */
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