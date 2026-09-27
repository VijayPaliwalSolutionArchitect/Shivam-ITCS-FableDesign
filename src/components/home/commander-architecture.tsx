"use client";

import { useEffect, useRef, useState } from "react";
import { commander } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader } from "@/components/ui";
import { scrollState } from "@/components/three/scroll-store";
import { cn } from "@/lib/utils";

/**
 * The flagship section. As the user scrolls, the fixed 3D camera dives
 * through the system (driven by archProgress in the scroll store) while
 * this DOM mirror highlights the stage the camera has reached — the
 * diagram reconfigures in place, never replaced.
 */
function stageFor(p: number): number {
  if (p < 0.14) return 0;
  if (p < 0.34) return 1;
  if (p < 0.55) return 2;
  if (p < 0.72) return 3;
  if (p < 0.9) return 4;
  return 5;
}

function PipelineMirror() {
  const [active, setActive] = useState(1);
  const rafRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      setActive(stageFor(scrollState.archProgress));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="panel panel-ticks overflow-hidden">
      {/* header strip */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-mute">
          sca · commander pipeline · live mirror
        </p>
        <p className="font-mono flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-ok">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok animate-node-pulse" />
          active
        </p>
      </div>

      <ol className="p-4">
        {commander.pipeline.map((stage, i) => {
          const isActive = i === active;
          const isCommander = stage.commander === true;
          const isLocal = stage.zone === "local";
          return (
            <li key={stage.id} className="relative">
              {/* connector */}
              {i < commander.pipeline.length - 1 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[1.35rem] top-11 h-6 w-px",
                    i < active ? "bg-signal-500/70" : "bg-line-strong"
                  )}
                />
              )}
              <div
                className={cn(
                  "flex items-start gap-4 rounded-xl border p-3.5 transition-colors duration-500",
                  isActive
                    ? isCommander
                      ? "border-commander-500/60 bg-commander-900/20"
                      : "border-signal-500/60 bg-signal-900/25"
                    : "border-line bg-surface-1/60"
                )}
              >
                {/* node dot */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border",
                    isCommander
                      ? "border-commander-500/70 bg-commander-500/15 text-commander-300"
                      : "border-signal-600/70 bg-signal-500/10 text-signal-300"
                  )}
                >
                  {isActive && (
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full border animate-node-pulse",
                        isCommander ? "border-commander-400/50" : "border-signal-400/40"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      isCommander ? "bg-commander-500" : "bg-signal-500"
                    )}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p
                      className={cn(
                        "font-display text-[0.95rem] font-semibold",
                        isCommander ? "text-commander-200" : isActive ? "text-ink" : "text-ink-dim"
                      )}
                    >
                      {stage.label}
                    </p>
                    <span
                      className={cn(
                        "font-mono text-[0.6rem] uppercase tracking-[0.14em]",
                        isLocal ? "text-signal-400" : "text-ink-mute"
                      )}
                    >
                      {isLocal ? "⟨ local · ₹0 ⟩" : "⟨ cloud ⟩"}
                    </span>
                  </div>
                  <p className="readout mt-1">{stage.detail}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="border-t border-line bg-surface-1/50 px-4 py-3 font-mono text-[0.75rem] text-ok">
        {commander.resultLine}
      </p>
    </div>
  );
}

export function CommanderArchitecture() {
  return (
    <section
      id="section-architecture"
      aria-labelledby="commander-title"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:py-32 lg:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Narrative — sticky while the camera dives */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="commander-title"
            eyebrow={commander.eyebrow}
            title={<span className="text-commander-400">{commander.title}</span>}
            body={commander.subtitle}
            commander
          />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">{commander.body}</p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {commander.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <Card hover={false} className="h-full !p-5">
                  <span aria-hidden="true" className="text-xl">{f.icon}</span>
                  <h3 className="font-display mt-2.5 text-[0.95rem] font-semibold leading-snug text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{f.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Live pipeline mirror */}
        <div className="lg:pt-6">
          <Reveal delay={0.1}>
            <PipelineMirror />
          </Reveal>

          <Reveal delay={0.18}>
            <div className="panel panel-ticks mt-5 overflow-hidden">
              <p className="border-b border-line px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-mute">
                directives.json · generated by commander
              </p>
              <pre className="overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed text-ink-dim">
{`{
  "directive_id": "dir_2026_09_27_0413",
  "source": "market_intelligence",
  "signals": { "trend": "agentic-ai-governance", "momentum": 0.87 },
  "route": {
    "script_agent":  { "model": "qwen3:32b",  "exec": "local",   "cost": 0 },
    "video_agent":   { "model": "qwen3.5:27b","exec": "local",   "cost": 0 },
    "high_stakes":   { "model": "claude-opus","exec": "cloud",   "cache": "90%" }
  },
  "prompt_rewrite": true,
  "budget_guard": { "max_usd_per_directive": 0.003 }
}`}
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
