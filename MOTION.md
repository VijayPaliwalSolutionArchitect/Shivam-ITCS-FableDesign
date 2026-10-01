# MOTION.md — SHIVAM ITCS Motion Design System

> Read this file IN FULL before designing, generating, or animating anything for this
> project. Every colour, font, timing and motion value comes from this file.
> The file sets the *look*, not the ambition. When Vijay says "go all out", go all out —
> but stay inside these rules.
>
> Where a decision is not covered here, **ASK** rather than choosing.

---

## 1. Colour — hex codes and their job

| Hex | Token | Purpose — and its ONE job |
|---|---|---|
| `#0B0D10` | `base` | Graphite page base. Deliberately **not** near-black. Never place pure `#000` anywhere. |
| `#0E1116` | `base-raised` | Raised base for sticky bars / blurred chrome. |
| `#10141B` `#151A23` `#1B212D` | `surface-1..3` | Panel fills, in that order of elevation. |
| `#1E242F` `#2A3241` | `line`, `line-strong` | Hairlines and panel borders. `line-strong` for interactive borders. |
| `#3E7BFA` | `signal-500` | **Live / active system state ONLY.** The single blue. Its presence means "this is running". |
| `#5F93FF` `#8AB2FF` | `signal-400/300` | Signal text on dark; signal hover. |
| `#1A3670`–`#234BB0` | `signal-900..700` | Signal tints for chip/glow backgrounds. |
| `#F5A623` | `commander-500` | **Reserved exclusively for the Commander (Claude) node / hierarchy.** The ONLY amber element in any frame. If two amber things are on screen, one is wrong. |
| `#FDC45C` `#FFDB94` | `commander-300/200` | Commander text / glow. |
| `#E9EDF5` | `ink` | Primary text. |
| `#A7B0C3` | `ink-dim` | Body / secondary text. |
| `#6C7789` | `ink-mute` | System labels, mono readouts. |
| `#3DDC97` | `ok` | Healthy / online. Heartbeat dot, availability pill. |
| `#FF5D5D` | `critical` | Error / degraded. Rare. |

**Rule:** motion never introduces a colour not on this list. Glow = the element's own
colour at 60–80% alpha via `color-mix()`. No new gradients invented for animation.

---

## 2. Typography in motion

| Family | Role | Motion treatment |
|---|---|---|
| **Space Grotesk** | Display / headlines | Split-run reveals, mask-up wipes. Never per-character bounce. |
| **Source Sans 3** | Body | Fade + 22px rise only. Never scramble the body copy. |
| **JetBrains Mono** | System labels, telemetry, readouts | **The decode/type-on register.** Mono is where "machine" motion lives. |

Type sizes are unchanged from `@theme` — motion must not rescale type. Reveal offsets
are always **transform translate**, never `font-size`/`line-height` (layout thrash).

Label register: mono, uppercase, `letter-spacing: 0.14em`, `ink-mute`.

---

## 3. Timing — how things come in, hold, leave

| Name | Duration | Use |
|---|---|---|
| `instant` | 120ms | Press / tap feedback, focus ring, toggle. |
| `quick` | 200ms | Hover colour, chip state, small fades. |
| `base` | 380ms | Card lift, border/glow transitions (existing `.card-hover`). |
| `reveal` | 650ms | Standard content reveal (existing `<Reveal>`). |
| `slow` | 900ms | Section entrances, panel assembly. |
| `cinematic` | 1400ms | Hero / boot sequence / signature moments. |

**Hold:** readouts and status text hold until the underlying state changes — no timed
auto-flicker. **Leave:** exits run at **0.7× the entrance duration** (things leave quicker
than they arrive) and never reverse the exact entrance path — they desaturate + fade in
place or slide out on the axis of travel.

**Stagger:** 60–90ms per item. Total stagger for any group is **capped at 600ms** — a
12-item grid does not take 1.2s to appear.

---

## 4. How things move — fps, easing, and the handmade cue

- **Frame rate target: 60fps.** Any effect that drops below ~50fps on a mid laptop is
  cut or moved to a lower-cost variant. Mobile: bloom/post-processing OFF by default.
- **Animate only `transform` and `opacity`.** Also permitted: `colour` / `background-color` /
  `border-color`, `clip-path`, `filter`, `background-position`, and SVG `stroke-dashoffset`
  (these are paint-only and cheap). **Never** animate `width`, `height`, `top`, `left`,
  `margin`, `font-size` — layout properties cause reflow.

**Easing set — this is the whole vocabulary:**

| Easing | Value | Use |
|---|---|---|
| Enter (default) | `cubic-bezier(0.16, 1, 0.3, 1)` — `--ease-out-expo` | Almost everything that arrives. |
| Exit | `cubic-bezier(0.4, 0, 1, 1)` | Leaving. |
| In-out | `cubic-bezier(0.65, 0, 0.35, 1)` | Morphs, position swaps. |
| Linear | `linear` | Continuous streams only: marquee, directive particles, scanlines. |

**Banned easings:** `bounce`, `elastic`, `back`/overshoot. This brand is an engineered
system, not a toy.

**The handmade cue:** the site must not look metronomic. Two deliberate imperfections:
1. **Layer desync** — HUD/telemetry layers run on a **40ms offset** from the DOM reveal
   layer, so the system feels multi-threaded, not choreographed.
2. **Stream jitter** — particle/directive streams carry a ±8% speed variance per stream.
   Perfectly uniform loops read as fake.

**Ownership rule (who animates what):**
- **Framer Motion** — React component enter/exit, layout/state transitions, gestures.
- **GSAP + ScrollTrigger** — scroll timelines, the 3D camera rig, anything keyframed.
- **CSS** — ambient loops (marquee, pulse, blink, dash-flow) and hovers. Prefer CSS when
  a loop is constant.
- **R3F `useFrame`** — only per-frame 3D reads from `scroll-store.ts` (zero React
  re-renders per frame — non-negotiable).

---

## 5. Texture and finish

- **Grain:** faint 3–5% monochrome noise over the base only. Never over text panels.
- **Glow:** signal and commander elements carry a soft `box-shadow`/bloom equal to their
  own colour. Glow is a *state indicator*, not decoration.
- **Grids:** the `bg-node-grid` (44px signal 6%) is the systemic backdrop. Parallax it
  1.1–1.3× scroll max — beyond that it becomes noise.
- **Scanlines / vignette:** permitted only inside the HUD frame and cinematic
  transitions, at ≤8% opacity.
- **Blur:** `backdrop-blur-sm` on chrome only. Never blur primary content.

---

## 6. Five things motion here must NEVER do

1. **Never animate layout properties.** `width/height/top/left/margin` — banned. Transform,
   opacity, colour, `clip-path`, `filter` and `background-position` only.
2. **Never use bounce / elastic / overshoot easings.** It reads as a template, not a system.
3. **Never loop motion that competes with reading.** Ambient loops sit at the periphery and
   ≤10% visual weight; nothing spins or pulses beside body copy. No infinite motion in the
   reader's focal zone.
4. **Never ship motion without a `prefers-reduced-motion` path.** Reduced motion renders the
   final state — not a faster animation. (The 3D canvas already falls back to the static SVG
   diagram; every new effect must do the same.)
5. **Never let decoration delay content.** LCP text is legible without any animation. No
   blocking intro longer than **1.2s**; the boot sequence must be skippable and must not gate
   first paint.

Plus a sixth, brand-specific: **never put amber anywhere the Commander isn't.**

---

## 7. One example, shot by shot — the cold-boot hero (done right)

**Trigger:** first paint, once per session (`sessionStorage`). Skipped under reduced motion
and on repeat visits.

| t | Shot |
|---|---|
| 0.0s | Base `#0B0D10`. Node-grid backdrop at 6% signal, still. HUD frame corners fade in over 380ms. |
| 0.2s | A single signal-blue node draws at centre (12px, scale 0→1, 380ms, out-expo). |
| 0.3–0.9s | Six child nodes spawn on staggered 80ms beats and connect to the centre with SVG lines drawn via `stroke-dashoffset` (280ms linear each). Centre node stays the only bright point. |
| 0.9s | Directives ignite: instanced particles begin travelling the curves (linear, ±8% jitter). This is the first ambient loop and it lives in the periphery. |
| 1.0s | **One** amber node blooms in — `commander-500` — with a 600ms glow ramp. It is now unmistakably the apex. Nothing else is amber. |
| 1.1–1.6s | Headline enters via mono decode → display mask-up: system label types character-by-character over 400ms, headline wipes up from a clip-path mask over 650ms, out-expo. |
| 1.6s | Sub-copy fades +22px rise (650ms). CTAs fade last (delay 240ms) with a single 380ms glow settle. |
| 2.0s | HUD readout goes live: "agents online", latency, uptime — mono, updating on the 40ms desync beat. |
| after | Steady state. The only motion is peripheral: marquee, directive stream, heartbeat dot (2.6s pulse), scroll-linked camera. |

**Why it's right:** every element arrives in causal order (node → wiring → command →
content), the hierarchy is legible at a glance because amber appears exactly once and last,
nothing loops inside the reading zone, total time-to-content is 1.6s, and under reduced
motion the whole thing renders as the finished frame at t=2.0s with zero animation.
