# CLAUDE.md — SHIVAM ITCS portfolio (Shivam-ITCS-FableDesign)

## Motion rules (MANDATORY)

Before designing, generating, or animating anything, **read `MOTION.md` in full**.
Every colour, font, timing and motion value comes from that file.

- The file sets the look, not the ambition. When the user says "go all out", go all out —
  but never outside `MOTION.md`.
- If something requested is not covered there, **ASK** — do not choose for yourself.
- When you have finished, check your own output against `MOTION.md`, fix what fails, and
  only then show it.

## Component donors

Whenever a component prompt or third-party component is pasted in, treat it as a
**structural donor only**. Keep its engineering. Replace its demo copy with real copy, and
translate every colour, border, shadow, font and timing to `MOTION.md`. Never let donor
demo styling ship.

## Non-negotiables

- Animate only `transform` / `opacity` / colour / `clip-path` / `filter` /
  `background-position` (plus SVG `stroke-dashoffset`). Never layout properties.
- Framer Motion = React enter/exit & state. GSAP + ScrollTrigger = scroll timelines & 3D
  camera. CSS = ambient loops. R3F `useFrame` = per-frame 3D reads from `scroll-store.ts`
  only, with **zero React re-renders per frame**.
- Every new effect needs a `prefers-reduced-motion` path that renders the final state.
- Amber (`commander-500`) is reserved for the Commander node only — never anywhere else.
