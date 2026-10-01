# Front-End Motion Revamp — SHIVAM ITCS Portfolio App

**Target repo:** `C:\Projects\Shivam-ITCS-FableDesign` (shivamitcs.in flagship)
**Date:** 2026-10-01 · **Author:** Jarvis (Hermes Agent) · **For:** Vijay Paliwal, MD
**Source technique:** Charlie Hills, "Claude Code motion graphics with Opus 5.5"
(MarTech AI, 27 Sep 2026) — adapted to a live Next.js codebase rather than a rendered MP4.

---

## 0. Where the app stands today (audited, not assumed)

**Stack (from `package.json`):** Next.js 15.5 · React 19 · Tailwind v4 · `@react-three/fiber` 9
· `@react-three/drei` 10 · `three` 0.180 · `gsap` 3.13 · `framer-motion` 12 · TypeScript 5.8
strict. Single commit (`640ca04 Initial commit`), `origin` =
`VijayPaliwalSolutionArchitect/Shivam-ITCS-FableDesign`. `node_modules` **not installed**.

**Already built — do not rebuild:**

| Layer | What exists |
|---|---|
| 3D | Persistent `commander-scene.tsx` (533 LOC) — node graph, `ParticleStream` (instanced octahedrons on `CatmullRomCurve3`, additive), local/cloud ground grids, `CameraRig` driven by `scroll-store.ts` (mutable, **zero re-render/frame**), static SVG fallback under reduced motion |
| Scroll | GSAP ScrollTrigger → normalized progress → camera; DOM "live mirror" in `commander-architecture.tsx` |
| Reveal | `<Reveal>` (framer-motion fade + 22px rise, `once:true`) used across every section |
| Ambient | marquee (42s), `node-pulse` (2.6s), `dash-flow`, `blink` — all in `@theme` `globals.css` |
| Hover | `.card-hover` lift + `card-node` scale (motion-safe only) |
| A11y | Full `prefers-reduced-motion` kill-switch, focus rings, skip link, `sr-only`, zero-CLS `min-h` |
| Tokens | Complete `@theme` system — base/surface scale, signal blue ramp, commander amber ramp, ink, semantic ok/warn/critical, 3 type families, `--ease-out-expo` |

**Verdict:** this is a *sophisticated* baseline — top quartile for an agency site. It is not
"missing motion"; it is missing **escalation**. The 3D scene carries the futuristic weight and
everything else is conventionally polite (a single generic fade-up). The gap is a *motion
system*, not more motion.

**What is absent (the actual opportunity):**
1. No `MOTION.md` — motion values are ad-hoc per component; no shared timing/easing vocabulary.
2. No orchestrated **first-load** — the page appears rather than *powers up*.
3. No scroll-linked **HUD/telemetry** layer — scroll response is invisible outside the canvas.
4. No **text-level** machine motion (decode/type-on) — the single cheapest futuristic signal.
5. No **cursor / pointer** layer — the site doesn't respond to the user's presence.
6. No **post-processing** (bloom) — the signal/commander glows are CSS-only.
7. No **smooth scroll** — native scroll makes the GSAP camera feel stepped.
8. No cross-route **page transitions**.
9. No **perf budget** or fps audit.

---

## 1. Foundation (do first — everything downstream depends on it)

| # | Deliverable | File | Status |
|---|---|---|---|
| 0.1 | Motion design system — timing, easing, ownership, never-dos, worked example | `MOTION.md` | ✅ **created this session** |
| 0.2 | Agent rule: read `MOTION.md` before animating anything | `CLAUDE.md` | ✅ **created this session** |
| 0.3 | Install deps | `npm install` + 3 additions (below) | ⏳ |
| 0.4 | Apple motion audit of the *current* build (ranked worst-first) | `npx skills add emilkowalski/skills --skill apple-design` → audit hero + cards | ⏳ |
| 0.5 | Baseline perf capture (LCP, CLS, INP, fps on scroll) | Lighthouse + a scroll fps trace | ⏳ |

**Three additions to `package.json` — no more, no less:**

| Package | Why | Cost |
|---|---|---|
| `lenis` | Smooth/inertial scroll. Makes the existing GSAP camera read as *cinematic* rather than *stepped*. Highest feel-per-KB on this list. | ~3KB gz |
| `@react-three/postprocessing` + `postprocessing` | Bloom on signal/commander only; optional subtle chromatic aberration on the cinematic transition. | ~40KB gz, **desktop-only** |
| `split-type` | Splits headings into lines/chars for mask-up wipes and decode. Alternative: hand-rolled `Range` splitting (zero dep). | ~2KB gz |

---

## 2. The Five Signature Moves (ranked by visual ROI)

These are the changes that make a visitor say "this is not a normal agency site".

### S1 — Cold-boot sequence (first load, once per session)
The single biggest upgrade. Instead of the hero appearing, the **system boots**: node → wiring
draws → directives ignite → commander blooms amber → headline decodes → content settles.
Full shot-by-shot spec is in `MOTION.md` §7. Gated on `sessionStorage`, skippable, **does not
delay LCP** (runs *after* first paint, over the already-painted layout).
*Files:* new `src/components/system/boot-sequence.tsx`; wire into `app/layout.tsx` / `hero.tsx`.

### S2 — Text decode + mask-up reveals
Replace generic `<Reveal>` fade on **headlines and mono labels** with:
mono system labels type character-by-character (400ms), display headlines wipe up from a
`clip-path` mask (650ms, out-expo), line-by-line stagger 80ms. Body copy keeps the plain fade.
This is the register that reads "AI infrastructure" rather than "startup".
*Files:* upgrade `src/components/ui.tsx` (`<Reveal>` → variant prop `mode="decode" | "wipe" | "rise"`); new `src/components/system/text-decode.tsx`.

### S3 — Scroll HUD / telemetry rail
A fixed, always-on system readout that responds to scroll: section index (`04 / 14`), stage name,
"camera: LOCAL ZONE", a scroll-progress hairline, and a live pulse. It reuses GSAP's
`scroll-store` and runs on the **40ms desync beat** from `MOTION.md` so it feels multi-threaded.
Turns the entire page into an instrument panel.
*Files:* new `src/components/system/hud.tsx`; read `src/components/three/scroll-store.ts`.

### S4 — Pointer/cursor presence layer
Custom cursor that becomes a **node**: small signal dot at rest → ring that attaches/magnets to
interactive elements → crosshair + label ("EXECUTE") over CTAs → wire-line draw from card to
cursor on hover. Pointer-parallax (±6°) on the 3D camera so the scene acknowledges the user.
Disabled on touch and under reduced motion (native cursor returns).
*Files:* new `src/components/system/cursor.tsx`; extend `CameraRig` in `commander-scene.tsx`.

### S5 — Smooth scroll + section choreography
Lenis for inertial scroll; on top of it, scroll-linked **staggered panel assembly** (sections
assemble from their node-grid rather than fading), 1.1–1.3× grid parallax, and **SVG wire-draws**
connecting adjacent sections so the page reads as one continuous system diagram.
*Files:* new `src/components/system/smooth-scroll.tsx`; extend `globals.css`; touch each `home/*.tsx` reveal wrapper only.

---

## 3. 3D layer upgrade (escalate what already exists)

| # | Change | Note |
|---|---|---|
| 3.1 | **Bloom post-processing**, threshold tuned so ONLY signal + commander bloom | Desktop only; off on mobile & reduced motion. Makes the existing "only amber is the Commander" rule visual. |
| 3.2 | **Scroll-velocity-reactive particles** — stream speed/density keyed to scroll velocity | Reuse `scroll-store`; add a velocity channel. |
| 3.3 | **Directive burst** — a one-shot particle pulse when the camera crosses stage boundaries | Ties motion to the section narrative. |
| 3.4 | **WebGL→DOM bleed** — commander glow colour bleeds subtly onto the DOM headline as camera approaches | Single CSS var driven from `useFrame`; cheap, high-impact continuity. |
| 3.5 | Keep the **zero-re-render** discipline — everything reads from plain mutable state in `useFrame` | Non-negotiable; already the pattern. |

---

## 4. Micro-interactions & polish

- Stat **count-up** on `hero.stats` and `proven-results` (mono numerals, 900ms, only on first view).
- **Magnetic CTAs** (≤8px pull toward cursor, release on leave).
- **Morphing underlines** on nav + tab chips (single element, in-out easing).
- **Link underline draw** (`background-size` transition).
- **Scan-line sweep** on form fields / input focus.
- **System toasts** — rare, peripheral "directive transmitted" notices in the HUD corner.
- **Route page transitions** — shared-element morph from `work-grid` card → project hero.
- `NodeGlyph` and `Tag` get a 200ms `quick` state transition on hover.

---

## 5. Verification gates (a tier is not done until all pass)

1. **60fps** on scroll on a mid-range laptop; ≥45fps on a mid Android. Trace, don't assume.
2. **Reduced motion**: every new effect renders its final state. No exceptions. Nested-system check.
3. **Perf budget**: LCP < 2.5s, CLS = 0, INP < 200ms; the 3D canvas still mounts post-idle.
4. **Mobile**: post-processing off, cursor layer off, particle counts halved.
5. **Visual self-review**: screenshot desktop + mobile + JS console clean, per the user's standard.
6. **`npx tsc --noEmit` clean** and `npm run build` green (the repo has a `typecheck` script).

---

## 6. Execution order (continuous & parallel — no week-numbering)

```
T0 Foundation  ──▶ S1 Boot ──▶ S2 Text ──▶ S3 HUD ──▶ S4 Cursor ──▶ S5 Scroll/Lenis
                        │                      │
                        └──────▶ 3D upgrade ───┘   (bloom, velocity particles, DOM bleed)
                                        │
                                        └──▶ §4 micro-interactions + route transitions
                                                  │
                                                  └──▶ §5 verification on every landing
```

Each item commits on its own (author = Vijay Paliwal). No fabricated activity, no filler
commits — if an item stalls, it is reported, not padded.

---

## 7. Optional premium add-on — code-rendered hero film

The article's core trick (LLM writes the animation as code → draws every frame → MP4) applied
here: generate a **15s motion-graphics hero film** in the SHIVAM ITCS palette — node graph
assembling, directive stream, commander bloom — via the `hyperframes` + motion-graphics skill
pack, rendered frame-by-frame from code, embedded muted/looping in the hero as a
`<video>` behind (or instead of) the live canvas on low-power devices.
*Note: no audio engine in the model — voiceover/TTS stays in the existing ffmpeg/edge-tts
pipeline. Rendered assets too heavy for autoplay on mobile unless < 1.5MB.*

---

## 8. Guardrails carried over from the article (adopt / adapt / trap)

- **ADOPT** — `MOTION.md` read-before-animate; the CLAUDE.md rule; design-review notes phrased as
  one change per note ("the text undersells what's coming"); Apple-design skill as an objective
  motion auditor.
- **ADAPT** — the article builds standalone MP4s; here the same "animation is code" principle
  lands as *live* React/GSAP/R3F instead of rendered frames — better for a website (responsive,
  interactive, tiny payload vs a video).
- **TRAP** — "one prompt → finished site". This repo's fidelity came from a real design system
  plus a hand-authored 3D scene. Iterate with named notes; never let a model repaint the
  Commander hierarchy or introduce a colour outside `MOTION.md` §1.
- **Component donors** (21st.dev) — if importing any third-party component, treat it as a
  **structural donor only**: keep its engineering, replace its copy with real copy, translate
  every colour/border/shadow/font/timing to `MOTION.md`. Never let donor demo styling in.

---

*Living document. Update as tiers land; mirror the summary to JarvisWork on completion.*
