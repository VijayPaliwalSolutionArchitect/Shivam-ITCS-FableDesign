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
