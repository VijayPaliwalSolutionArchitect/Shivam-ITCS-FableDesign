# SHIVAM ITCS — Sovereign Commander Rebuild

Next.js 15 rebuild of **shivamitcs.in** — the AI infrastructure flagship. The information architecture, copy, URL structure, and structured data are preserved from the indexed production site; this build replaces the visual, motion, and 3D layer.

## The signature element

The "Sovereign Commander Architecture" text diagram from the old site is now a **live, persistent 3D node graph** (`src/components/three/`) rendered in React Three Fiber, following the user as a fixed background layer down the entire homepage:

- **Claude node** — amber (`#F5A623`), larger, glowing, ringed — the only amber element on the page, so the "who's in charge" hierarchy is visible at a glance.
- **`directives.json`** flows down from the Commander as an animated particle stream along curved tubes (`ParticleStream`, instanced octahedrons on a `CatmullRomCurve3`, additive blending). No static SVG arrows.
- **Qwen sub-agents** pulse when "active" — activity states are driven by scroll position.
- **Local vs cloud** are two visually distinct ground-grid zones: a dense, signal-blue-tinted local grid (Ollama on-prem) vs a sparse, dim cloud grid, separated by a boundary line — not a label.
- **The camera travels through the system.** GSAP ScrollTrigger writes normalized progress into `scroll-store.ts` (plain mutable state, zero React re-renders per frame); the `CameraRig` reads it inside `useFrame` and sweeps from the market-intel trigger → around the Commander → down the directives stream → inside the local agent zone → out to the published output. Scrolling the Architecture section **reconfigures** the same persistent scene — nothing is replaced. A DOM "live mirror" (`commander-architecture.tsx`) highlights the stage the camera has reached.
- The **node/particle motif recurs** at 2D scale everywhere: the 9-domains grid, tech stack buses, card hover node-glyphs, and the `bg-node-grid` backdrops.

## Design system

| Token | Value | Role |
|---|---|---|
| `base` | `#0B0D10` | graphite base (deliberately not near-black + neon) |
| `signal` | `#3E7BFA` | live/active system states — the only blue |
| `commander` | `#F5A623` | reserved exclusively for the Claude/Commander hierarchy |

Type: **Space Grotesk** (display) + **Source Sans 3** (body) + **JetBrains Mono** (system labels). All tokens live in `@theme` in `globals.css` — no inline magic numbers.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
  app/                    # App Router pages (URL structure 1:1 with production)
    page.tsx              # / (homepage, 14 sections in original order)
    architecture/         # SCA 7-layer stack + Commander pipeline
    services/ solutions/ work/ blog/ about/
    privacy-policy/ terms-of-use/ not-found.tsx
    sitemap.ts robots.ts manifest.ts
  components/
    three/                # R3F scene components
      commander-scene.tsx     # nodes, particle streams, zones, camera rig
      commander-canvas.tsx    # lazy mount gate + WebGL probe + fallbacks
      commander-diagram-static.tsx  # fully static SVG fallback
      scroll-store.ts         # ScrollTrigger → shared mutable state
    home/                 # one component per homepage section
    site-header.tsx site-footer.tsx ui.tsx work-grid.tsx
  lib/
    content/              # all site copy, extracted verbatim from production
    motion.ts            # usePrefersReducedMotion / useIdleAfterLoad hooks
    seo.ts               # Organization + WebSite JSON-LD (preserved)
```

## Performance decisions

- The R3F canvas mounts **only after** `load` + `requestIdleCallback` (+350 ms) via a `dynamic(..., { ssr: false })` import — WebGL init never blocks first paint or LCP.
- `dpr={[1, 1.75]}`, `antialias: false`, `flat` (no tone mapping), and a single shared scene keep the frame budget small on mobile.
- All canvas content is **instanced or batched**: particle streams use one `InstancedMesh` per curve; labels/halos are canvas-texture sprites created once in `useMemo`.
- `contain: strict` + `min-h` reservations mean no layout shift when the canvas mounts (CLS ≈ 0).
- Scroll-driven animation runs on the GSAP→ref pipeline, not React state, so scrolling never re-renders the tree.

## Accessibility

- **Every 3D canvas / WebGL layer has a text-equivalent**: a `sr-only-text` description of the pipeline (screen readers can't parse WebGL), and visual layers are `aria-hidden`.
- The static SVG fallback diagram carries a full `aria-label` describing the data flow.
- Keyboard: skip-to-content link, visible `:focus-visible` rings site-wide, dropdowns open/close on click + Escape, filter radios use `role="radiogroup"`, tab order follows visual order.
- Text contrast meets WCAG AA on the graphite base.

## Reduced-motion fallbacks — what they are and how to test

These sections/canvas layers **fully disable motion** under `prefers-reduced-motion: reduce` (not merely "slower"):

| Location | Behavior with reduced motion |
|---|---|
| `three/commander-canvas.tsx` | The WebGL scene never mounts. A **static SVG diagram** (`CommanderDiagramStatic`) renders instead — no camera moves, no particles, no pulses. |
| `lib/motion.ts` (`useIdleAfterLoad` drivers) | No scroll drivers are registered at all. |
| `ui.tsx` (`Reveal`) | Framer Motion skipped; children render directly in final state — no opacity/y transitions. |
| `work-grid.tsx` | Card filter swap animations and layout transitions disabled; the grid updates instantly. |
| `globals.css` | Global `@media (prefers-reduced-motion: reduce)` block: all animation/transition durations forced to `0.01ms`, the marquee track stops, and `scroll-behavior` becomes `auto`. |
| Hero availability pulse, footer status dot | `animate-node-pulse` is neutralized by the same global block. |

**How to test:**

1. **OS toggle:**
   - Windows: Settings → Accessibility → Visual effects → Animation effects **Off**, then hard-refresh.
   - macOS: System Settings → Accessibility → Display → **Reduce motion**.
   - Or run DevTools → ⌘/Ctrl+Shift+P → "Show Rendering" → set **Emulate CSS media feature prefers-reduced-motion** to `reduce`.
2. Reload the homepage. Verify: the hero renders with the faded static SVG pipeline behind the content (no canvas in the DOM — check `document.querySelector('canvas')` is `null`), scrolling produces **no camera movement** (the backdrop never changes), the tech marquee is a static row, and cards appear without fade/slide.
3. Toggle reduced motion **off** and reload — the canvas should mount after a beat, particles flow, and the Architecture-section scroll dive works.
4. **WebGL-absent fallback** (same static diagram): in DevTools Console run `const c=document.createElement('canvas'); c.getContext('webgl2')` after patching `HTMLCanvasElement.prototype.getContext` to return `null`, or test in a browser with WebGL disabled (`chrome://flags` → "Disable WebGL" / `--disable-webgl`).

## SEO equity — preserved

All existing meta tags, JSON-LD (Organization `ProfessionalService` + `WebSite` with `SearchAction`), canonical URLs (`/`, `/architecture`, `/services`, `/solutions`, `/work`, `/blog`, `/about`, legal pages), geo meta, `og:`/`twitter:` cards, sitemap, and robots routes are carried over 1:1 — see `src/lib/seo.ts` and each route's `metadata` export.

## Acceptance criteria status

- **Lighthouse perf ≥ 90 mobile / a11y ≥ 95** — verify with `npx lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --throttling` against `npm run build && npm start`.
- **prefers-reduced-motion fully static** — see table above.
- **3D text-equivalents** — sr-only pipeline description + labeled SVG fallback.
- **Keyboard focus visible everywhere; tab order = visual order** — skip link, focus rings, radiogroup filters.
- **LCP < 2.5s / CLS < 0.1** — text-first hero, idle-time canvas mount, space reservation.
- **All meta/JSON-LD/canonicals preserved** — `seo.ts`, per-route `metadata`, `sitemap.ts`.

## Notes

- The homepage pipeline content, founders' bios, project list, and every section's copy were extracted verbatim from the production site (2026-09-27 snapshot).
- The blog is currently a listing stub pointing at production post URLs; wire `content/blog` when migrating post bodies.
