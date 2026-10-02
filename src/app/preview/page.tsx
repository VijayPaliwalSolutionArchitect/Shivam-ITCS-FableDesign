"use client";

/**
 * /preview — the review surface for the new motion "system" layer.
 *
 * WHY THIS ROUTE EXISTS
 * ---------------------
 * Six components (AgentCanvas, BootLog, ScrollProgress, Spotlight, WordCycler,
 * Ambient) were authored for the motion revamp but were never mounted anywhere —
 * they sat in the tree unreferenced, so nothing could actually be reviewed.
 *
 * Rather than wire them straight into the flagship home page (which would put a
 * client-facing page in flux mid-review), this route mounts all six in isolation.
 * Version A = `/`. Version B = `/preview`. Compare them side by side, then the
 * wiring decision is made with both in front of you.
 *
 * Every component here carries its own prefers-reduced-motion path, so the page is
 * honest under the reduced-motion setting too — that is a review gate, not a nicety.
 */

import { BootLog } from "@/components/system/boot-log";
import { AgentCanvas } from "@/components/system/agent-canvas";
import { Ambient } from "@/components/system/ambient";
import { ScrollProgress } from "@/components/system/scroll-progress";
import { Spotlight } from "@/components/system/spotlight";
import { WordCycler } from "@/components/system/word-cycler";

const CAPABILITIES = [
  {
    title: "Agentic Systems",
    body: "Multi-agent orchestration with a governed command layer — no unaccountable autonomy.",
    commander: true,
  },
  {
    title: "Enterprise .NET",
    body: ".NET Core 8/10 WebAPIs, vertical-slice architecture, SQL Server and PostgreSQL at scale.",
    commander: false,
  },
  {
    title: "Legacy Modernisation",
    body: "Framework monoliths to cloud-native services, without a rewrite-from-zero bet.",
    commander: false,
  },
];

export default function PreviewPage() {
  return (
    <main className="relative min-h-screen bg-surface-950 text-ink-50">
      <Ambient />
      <ScrollProgress />

      <div className="relative z-10 mx-auto max-w-5xl space-y-24 px-6 py-24">
        <header className="space-y-6">
          <p className="readout">motion system · review build</p>
          <h1 className="font-display text-5xl leading-tight tracking-tight md:text-7xl">
            Intelligence that{" "}
            <WordCycler
              words={["ships", "scales", "compounds", "answers"]}
              className="text-signal-400"
            />
          </h1>
          <p className="max-w-2xl text-lg text-ink-300">
            Version B — the six system components mounted in isolation. No
            production routing has been touched to build this page.
          </p>
        </header>

        {/* S1 — hero visual: the live agent graph */}
        <section className="space-y-4">
          <p className="readout">01 · agent canvas</p>
          <div className="spotlight-commander relative h-[320px] overflow-hidden rounded-xl border border-white/10 bg-surface-900">
            <AgentCanvas />
            <div className="pointer-events-none absolute bottom-4 left-4">
              <BootLog className="text-xs" />
            </div>
          </div>
          <p className="text-sm text-ink-400">
            34 drifting nodes · proximity edges · amber links reach back to the pointer.
            Pauses off-screen; single static frame under reduced motion.
          </p>
        </section>

        {/* S3 — pointer-aware cards */}
        <section className="space-y-4">
          <p className="readout">02 · spotlight cards</p>
          <div className="grid gap-5 md:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <Spotlight
                key={c.title}
                commander={c.commander}
                className="panel panel-ticks card-hover rounded-xl p-6"
              >
                <h2 className="font-display text-xl">{c.title}</h2>
                <p className="mt-2 text-sm text-ink-300">{c.body}</p>
              </Spotlight>
            ))}
          </div>
          <p className="text-sm text-ink-400">
            Glow tracks the cursor via --mx/--my. The amber card is the Commander —
            amber appears exactly once, at the apex of the hierarchy.
          </p>
        </section>

        {/* Verification panel — the review gates, stated on the page itself */}
        <section className="space-y-4">
          <p className="readout">03 · review gates</p>
          <Spotlight className="panel panel-ticks rounded-xl p-6">
            <ul className="space-y-2 text-sm text-ink-300">
              <li>▸ <strong className="text-ink-100">Reduced motion</strong> — every effect renders its final state; nothing animates.</li>
              <li>▸ <strong className="text-ink-100">Off-screen pause</strong> — the canvas rAF stops when scrolled away.</li>
              <li>▸ <strong className="text-ink-100">DPR capped at 2</strong> — a 4K display cannot quadruple the fill cost.</li>
              <li>▸ <strong className="text-ink-100">Transform-only</strong> — scroll progress uses scaleX, never width.</li>
              <li>▸ <strong className="text-ink-100">Zero new deps</strong> — all six use React + framer-motion + canvas already in the tree.</li>
            </ul>
          </Spotlight>
        </section>

        <footer className="readout border-t border-white/10 pt-6">
          version b · unmounted system layer · shivam itcs
        </footer>
      </div>
    </main>
  );
}
