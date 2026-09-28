"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal, Section } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Selected-work image showcase. Dummy abstract assets in /public/work
 * (owner will replace). Copy comes from the existing project list.
 */

type Slide = {
  id: string;
  src: string;
  badge: string;
  title: string;
  body: string;
  tags: string[];
  metric: { value: string; label: string };
  tone: "signal" | "commander";
};

const SLIDES: Slide[] = [
  {
    id: "commander-architecture",
    src: "/work/commander-architecture.jpg",
    badge: "AI · Multi-Agent · Proprietary",
    title: "Commander Architecture — Autonomous Video Factory",
    body: "5-agent pipeline: Claude Opus reads market signals and generates directives.json; local Qwen agents execute script, video and publishing — zero human intervention.",
    tags: ["Claude Opus", "Qwen 3:32B", "Ollama", "n8n"],
    metric: { value: "~90%", label: "Prompt cache savings" },
    tone: "commander",
  },
  {
    id: "multi-t-ecomm",
    src: "/work/multi-t-ecomm.jpg",
    badge: "E-Commerce · AI · SaaS",
    title: "Multi-T-Ecomm — AI Multi-Tenant E-Commerce",
    body: "Intelligent shopping assistant with voice, chat, and automated product discovery using LLM reasoning, RAG, and real-time API tools.",
    tags: ["Next.js", "FastAPI", "LangChain", "Whisper"],
    metric: { value: "Voice", label: "+ chat commerce" },
    tone: "signal",
  },
  {
    id: "content-automation",
    src: "/work/content-automation.jpg",
    badge: "RPA · AI · Multi-Channel",
    title: "Content Automation Studio",
    body: "AI-agent orchestration pipeline that generates, translates, and distributes localized content — validated with Playwright screenshot verification.",
    tags: ["Gemini API", "Playwright", "RPA", "Next.js"],
    metric: { value: "24/7", label: "Autonomous publishing" },
    tone: "signal",
  },
  {
    id: "helpinghand",
    src: "/work/helpinghand.jpg",
    badge: "SaaS · 3D Canvas · Real-time",
    title: "HelpingHand Enterprise",
    body: "On-demand service ecosystem with an interactive 3D frontend, real-time WebSockets tracking, and an AI-driven clean-architecture backend.",
    tags: ["React Three Fiber", ".NET Core", "SignalR", "Redis"],
    metric: { value: "3D", label: "Interactive frontend" },
    tone: "signal",
  },
  {
    id: "hivegpt",
    src: "/work/hivegpt.jpg",
    badge: "SaaS · AI Campaigns · USA",
    title: "HiveGPT — AI Campaign Intelligence",
    body: "Enterprise AI platform for automated marketing campaign generation, performance prediction, and creative optimization at global, multi-tenant scale.",
    tags: [".NET Core", "OpenAI", "React", "Azure"],
    metric: { value: "90%", label: "API cost cut" },
    tone: "commander",
  },
  {
    id: "social27",
    src: "/work/social27.jpg",
    badge: "Enterprise · Events · Seattle",
    title: "Social27 — Virtual Events SaaS",
    body: "Thousands of concurrent attendees, AI-powered networking, and sponsor analytics on an enterprise events platform.",
    tags: ["Angular", ".NET", "Azure", "SignalR"],
    metric: { value: "21+", label: "Countries served" },
    tone: "signal",
  },
];

export function ShowcaseSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = SLIDES.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, reduced, go]);

  const slide = SLIDES[index];

  return (
    <Section className="py-16 sm:py-24" labelledBy="showcase-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Product Gallery</p>
          <h2 id="showcase-title" className="font-display mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            Shipped, Running, Measurable.
          </h2>
        </div>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-mute">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>

      <Reveal delay={0.1}>
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Product gallery"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="grad-border glass relative mt-10 overflow-hidden rounded-3xl"
        >
          {/* image stage */}
          <div className="relative aspect-[16/9] max-h-[540px] w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.src}
                  alt={`Abstract visual for ${slide.title} (placeholder asset)`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>
            {/* legibility scrims */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-base via-base/25 to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-base/70 via-transparent to-transparent" />

            {/* badge top-left */}
            <p className={cn(
              "font-mono absolute left-5 top-5 rounded-full border px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] backdrop-blur-md sm:left-8 sm:top-8",
              slide.tone === "commander"
                ? "border-commander-600/50 bg-commander-900/30 text-commander-300"
                : "border-signal-600/50 bg-signal-900/40 text-signal-300"
            )}>
              {slide.badge}
            </p>

            {/* prev/next */}
            <div className="absolute right-5 top-5 flex gap-2 sm:right-8 sm:top-8">
              <button type="button" aria-label="Previous project" onClick={() => go(-1)} className="slider-nav-btn">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" aria-label="Next project" onClick={() => go(1)} className="slider-nav-btn">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* caption block */}
            <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slide.id}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end"
                >
                  <div className="max-w-2xl">
                    <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                      {slide.title}
                    </h3>
                    <p className="mt-2 hidden text-sm leading-relaxed text-ink-dim sm:block">
                      {slide.body}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
                      {slide.tags.map((t) => (
                        <li key={t} className="font-mono rounded border border-line-strong bg-base/60 px-2 py-0.5 text-[0.62rem] tracking-wide text-ink-dim backdrop-blur-sm">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:text-right">
                    <p className={cn("font-display text-4xl font-bold tracking-tight sm:text-5xl", slide.tone === "commander" ? "text-commander-400" : "text-signal-300")}>
                      {slide.metric.value}
                    </p>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-mute">
                      {slide.metric.label}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* dot rail */}
          <div className="flex items-center justify-center gap-2 border-t border-line/60 py-4" role="tablist" aria-label="Choose project">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${s.title}`}
                data-active={i === index}
                onClick={() => setIndex(i)}
                className="slider-dot"
              />
            ))}
          </div>
        </div>
      </Reveal>

      <p className="sr-only-text" aria-live="polite">
        Slide {index + 1} of {count}: {slide.title}
      </p>
    </Section>
  );
}
