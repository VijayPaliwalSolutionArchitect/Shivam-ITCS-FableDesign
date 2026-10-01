"use client";

/**
 * Hero — the main landing hero for shivamitcs.in.
 *
 * Positions the offer around the AI / Agentic / Gen-AI expertise stack and the
 * Commander Architecture with a cost-aware model-fallback system, then the IT
 * delivery stack (.NET Core 8/10 WebAPIs · Next.js · PostgreSQL).
 *
 * Motion follows MOTION.md:
 *  - transform / opacity / clip-path / background-position + colour only
 *  - Framer Motion for enter/state, CSS for ambient loops
 *  - every effect has a prefers-reduced-motion path that renders the FINAL state
 *  - amber (commander) appears exactly once, at the apex of the hierarchy
 */

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content/home";
import { Reveal, Tag } from "@/components/ui";
import { cn } from "@/lib/utils";

/** cubic-bezier(0.16, 1, 0.3, 1) — MOTION.md "Enter" */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Mono decode / type-on ─────────────────────────────────── */
function DecodeText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>=+*#%$";
    let raf = 0;
    let frame = 0;
    const total = Math.max(16, text.length * 2);
    const startAt = Date.now() + delay * 1000;

    const tick = () => {
      if (Date.now() < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const revealed = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) =>
            ch === " "
              ? " "
              : i < revealed
                ? ch
                : glyphs[Math.floor(Math.random() * glyphs.length)]
          )
          .join("")
      );
      if (revealed < text.length) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, reduced, delay]);

  return (
    <span className="relative inline-block">
      <span className="sr-only-text">{text}</span>
      <span aria-hidden="true" className={className}>
        {out}
      </span>
    </span>
  );
}

/* ── Mask-up line reveal (clip via overflow, transform only) ─ */
function MaskUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: "112%" }}
        animate={reduced ? undefined : { y: 0 }}
        transition={{ duration: 0.65, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ── Count-up stat value (text only, no layout animation) ──── */
function StatValue({ value }: { value: string }) {
  const reduced = useReducedMotion();
  const nums = value.match(/\d+/g);
  const single = nums && nums.length === 1 ? nums[0] : null;
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !single) return;
    const target = parseInt(single, 10);
    let raf = 0;
    const dur = 900;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [single, reduced]);

  if (!single || n === null) return <>{value}</>;
  return <>{value.replace(single, String(n))}</>;
}

/* ── The Commander stack (layered architecture + flow bus) ─── */
type Tone = "commander" | "signal" | "mute";

const STACK: { id: string; name: string; detail: string; tone: Tone }[] = [
  { id: "L0", name: "Strategy Commander", detail: "Claude · reasoning · orchestration", tone: "commander" },
  { id: "L1", name: "Cost-Aware Model Router", detail: "cheap-first routing · automatic fallback", tone: "signal" },
  { id: "L2", name: "Model Fleet", detail: "OpenAI · Claude · ChatGPT · GLM · Qwen (local)", tone: "signal" },
  { id: "L3", name: "Agent Team", detail: "tool-use · memory · MCP · governance", tone: "signal" },
  { id: "L4", name: "Automation Layer", detail: "Python jobs · RPA · data pipelines", tone: "signal" },
  { id: "L5", name: "Delivery", detail: ".NET Core 8/10 WebAPIs · Next.js · PostgreSQL", tone: "mute" },
];

function dotFill(tone: Tone) {
  return tone === "commander" ? "bg-commander-500" : tone === "signal" ? "bg-signal-500" : "bg-ink-mute";
}

function dotGlow(tone: Tone) {
  if (tone === "commander")
    return { boxShadow: "0 0 12px color-mix(in srgb, var(--color-commander-500) 70%, transparent)" };
  if (tone === "signal")
    return { boxShadow: "0 0 9px color-mix(in srgb, var(--color-signal-500) 60%, transparent)" };
  return undefined;
}

function CommanderStack() {
  const reduced = useReducedMotion();
  return (
    <div className="panel panel-ticks bg-node-grid p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="eyebrow">Commander Architecture</p>
        <span className="readout text-ink-mute">
          <DecodeText text="6 LAYERS · ARMOURED" delay={0.6} />
        </span>
      </div>

      <div className="relative">
        {/* static spine */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[17px] top-2 w-px bg-gradient-to-b from-commander-500/60 via-signal-700/40 to-transparent"
        />
        {/* flow bus — animates background-position (cheap, layout-safe) */}
        {!reduced &&
          [0, 1.7].map((d) => (
            <motion.span
              key={d}
              aria-hidden="true"
              className="absolute bottom-2 left-[17px] top-2 w-px"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, transparent 0%, var(--color-signal-400) 45%, transparent 90%)",
                backgroundSize: "100% 260%",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ backgroundPositionY: "0%" }}
              animate={{ backgroundPositionY: ["0%", "100%"] }}
              transition={{ duration: 3.4, delay: d, repeat: Infinity, ease: "linear" }}
            />
          ))}

        <ul className="space-y-2.5">
          {STACK.map((l, i) => (
            <motion.li
              key={l.id}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
              className={cn(
                "relative flex items-center gap-3 rounded-lg border px-3 py-2",
                l.tone === "commander"
                  ? "border-commander-700/60 bg-surface-2"
                  : l.tone === "mute"
                    ? "border-line bg-surface-1"
                    : "border-line bg-surface-2"
              )}
            >
              <span
                aria-hidden="true"
                style={dotGlow(l.tone)}
                className={cn("h-2.5 w-2.5 shrink-0 rounded-full", dotFill(l.tone))}
              />
              <span
                className={cn(
                  "font-mono text-[0.66rem] tracking-widest",
                  l.tone === "commander" ? "text-commander-300" : "text-ink-mute"
                )}
              >
                {l.id}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "font-display block truncate text-[0.92rem] font-semibold",
                    l.tone === "commander" ? "text-commander-200" : "text-ink"
                  )}
                >
                  {l.name}
                </span>
                <span className="readout block truncate text-[0.72rem] text-ink-mute">{l.detail}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Cost-aware model fallback (cycling, peripheral) ───────── */
const FLEET: { name: string; role: string; cost: string; tone: Tone }[] = [
  { name: "Claude", role: "reasoning · premium", cost: "$$$", tone: "commander" },
  { name: "OpenAI GPT", role: "multimodal · premium", cost: "$$$", tone: "signal" },
  { name: "GLM", role: "high-volume · cheap", cost: "$", tone: "signal" },
  { name: "Qwen 3 · local", role: "zero-cost fallback", cost: "free", tone: "mute" },
];

function ModelFallback() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % FLEET.length), 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="panel bg-base-raised/70 p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="readout text-ink-dim">MODEL FALLBACK</p>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ok">
          {reduced ? "armed" : "routing…"}
        </span>
      </div>
      <ul className="space-y-1.5">
        {FLEET.map((m, i) => {
          const on = i === active && !reduced;
          return (
            <li
              key={m.name}
              className={cn(
                "flex items-center gap-3 rounded-md border px-3 py-2 transition-colors duration-200",
                on ? "border-signal-700/60 bg-signal-900/20" : "border-line bg-surface-1"
              )}
            >
              <span
                aria-hidden="true"
                style={
                  on
                    ? { boxShadow: "0 0 8px color-mix(in srgb, var(--color-signal-400) 70%, transparent)" }
                    : undefined
                }
                className={cn("h-1.5 w-1.5 shrink-0 rounded-full", on ? "bg-signal-400" : "bg-line-strong")}
              />
              <span className="font-mono text-[0.76rem] text-ink">{m.name}</span>
              <span className="readout ml-auto truncate text-[0.68rem] text-ink-mute">{m.role}</span>
              <span
                className={cn(
                  "font-mono text-[0.68rem]",
                  m.tone === "commander" ? "text-commander-300" : "text-ink-dim"
                )}
              >
                {m.cost}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="readout mt-3 text-ink-mute">
        Cheap-first routing — escalates only when a task needs it.
      </p>
    </div>
  );
}

/* ── Expertise rails ───────────────────────────────────────── */
const AI_STACK = [
  "Agentic AI",
  "AI Agents",
  "Multi-Agent Systems",
  "Gen AI",
  "Commander Architecture",
  "Cost-Effective Model Fallback",
  "RAG · Vector Search",
  "MCP Protocol",
  "Prompt & Eval Engineering",
  "RPA",
  "Python Automation",
  "OpenAI",
  "Claude",
  "ChatGPT",
  "GLM",
  "Qwen · Local LLMs",
  "Semantic Kernel",
  "Ollama",
];

const IT_STACK = [
  ".NET Core 8 / 10 WebAPIs",
  "C#",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "pgVector",
  "SQL Server",
  "REST · gRPC",
  "Docker",
  "Azure",
  "CI/CD",
  "Legacy Modernization",
  "React Native",
];

function ExpertRail({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "signal" | "commander";
}) {
  return (
    <div>
      <p className={cn("eyebrow mb-3", tone === "commander" && "eyebrow-commander")}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <motion.span
            key={it}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.025, 0.5), ease: EASE }}
          >
            <Tag tone={tone === "commander" ? "commander" : "signal"}>{it}</Tag>
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="section-hero" aria-labelledby="hero-title" className="relative">
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-24 lg:px-8 lg:pt-28">
        {/* system HUD strip */}
        <Reveal>
          <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-base/70 px-3.5 py-1.5 backdrop-blur-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ok animate-node-pulse" />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-dim">
                {hero.availability}
              </span>
            </span>
            <span className="readout hidden sm:inline">
              <DecodeText text="SYSTEM ONLINE · COMMANDER: CLAUDE · FALLBACK: ARMED" delay={0.4} />
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — proposition */}
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <p className="eyebrow">Agentic AI · Gen AI · Commander Architecture</p>
            </Reveal>

            <h1
              id="hero-title"
              className="font-display mt-5 text-[2.5rem] font-bold leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]"
            >
              <MaskUp delay={0.1}>{hero.titleLine1}</MaskUp>
              <MaskUp delay={0.22} className="text-signal-400">
                {hero.titleLine2}
              </MaskUp>
            </h1>

            <Reveal delay={0.3}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={hero.ctaPrimary.href}
                  className="font-display rounded-lg bg-signal-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-signal-900/40 transition-colors duration-200 hover:bg-signal-400"
                >
                  {hero.ctaPrimary.label}
                </Link>
                <Link
                  href={hero.ctaSecondary.href}
                  className="font-display rounded-lg border border-line-strong bg-base/60 px-6 py-3.5 text-base font-semibold text-ink backdrop-blur-sm transition-colors duration-200 hover:border-signal-600 hover:text-signal-300"
                >
                  {hero.ctaSecondary.label} →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.46}>
              <dl className="panel panel-ticks mt-11 grid grid-cols-2 sm:grid-cols-4">
                {hero.stats.slice(0, 4).map((s, i) => (
                  <div
                    key={s.label}
                    className={cn("px-4 py-4", i > 0 && "border-t border-line sm:border-t-0 sm:border-l")}
                  >
                    <dt className="sr-only-text">{s.label}</dt>
                    <dd>
                      <span className="font-display block text-xl font-semibold text-signal-300">
                        <StatValue value={s.value} />
                      </span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-mute">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right — the architecture + fallback system */}
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <CommanderStack />
            </Reveal>
            <Reveal delay={0.42}>
              <div className="mt-4">
                <ModelFallback />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Expertise rails */}
        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-8 lg:grid-cols-2 lg:gap-12">
          <ExpertRail label="AI · Agentic · Gen AI" items={AI_STACK} tone="signal" />
          <ExpertRail label="IT · Platform · Delivery" items={IT_STACK} tone="commander" />
        </div>
      </div>

      {/* Tech marquee */}
      <div className="marquee-mask border-y border-line bg-base/70 py-3 backdrop-blur-sm">
        <div className="overflow-hidden">
          <ul className="marquee-track items-center gap-8 pr-8" aria-label="Technology stack highlights">
            {[...hero.marquee, ...hero.marquee].map((item, i) => (
              <li key={i} className="flex shrink-0 items-center gap-8 whitespace-nowrap">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-mute">
                  {item}
                </span>
                <span aria-hidden="true" className="text-signal-600">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
