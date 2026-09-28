"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal, Section } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Client proof slider. Every quote/metric/attribution below is carried
 * over from the production sites (shivamitcs.in / shivamitconsultancy.com)
 * — no new marketing copy. Layout + motion is the new layer.
 */

type Testimonial = {
  org: string;
  context: string;
  quote?: string;
  metric?: { value: string; label: string };
  body?: string;
  tone: "signal" | "commander";
};

const TESTIMONIALS: Testimonial[] = [
  {
    org: "HiveGPT, Inc · USA",
    context: "Generative AI marketing platform · Employee of the Quarter",
    quote:
      "We do not add AI to your product. We rebuild the infrastructure so AI becomes the product.",
    body: "Lead AI Architect. Multi-agent campaign automation — content creation, landing pages, lead scoring, and event management.",
    metric: { value: "90%", label: "API Cost Cut" },
    tone: "commander",
  },
  {
    org: "Social27, Inc · Seattle, USA",
    context: "Enterprise virtual events platform · Employee of the Quarter",
    quote: "Multi-tenant SaaS for global events — used across 21+ countries.",
    body: "Real-time networking, AI matchmaking, and an event bot at the scale of thousands of concurrent global attendees.",
    metric: { value: "21+", label: "Countries" },
    tone: "signal",
  },
  {
    org: "Clearly Inventory, Inc · USA",
    context: "Warehouse intelligence platform · 6-year partnership",
    body: "Cloud-native SaaS for multi-location inventory. Real-time stock sync, barcode workflows, ElasticSearch lookup.",
    metric: { value: "<1s", label: "Response" },
    tone: "signal",
  },
  {
    org: "SHIVAM ITCS · Own IP",
    context: "Hospital OS — built to HIPAA and FHIR standards",
    body: "Multi-role hospital management: patient records, pharmacy, labs, billing — with an AI Clinical Copilot.",
    metric: { value: "HIPAA", label: "Compliant" },
    tone: "signal",
  },
  {
    org: "Commander Architecture",
    context: "Own IP · Hybrid LLM cost optimisation",
    quote: "Intelligent architecture saves money — AI should serve your business, not drain it.",
    body: "Claude Opus as Commander + Qwen local via Ollama. 90% cost reduction demonstrated in production.",
    metric: { value: "90%", label: "Cost Cut" },
    tone: "commander",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, reduced, go]);

  const active = TESTIMONIALS[index];

  return (
    <Section className="py-16 sm:py-24" labelledBy="testimonials-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Client Impact &amp; Success</p>
          <h2 id="testimonials-title" className="font-display mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            Proof in Production.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="slider-nav-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="slider-nav-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={regionRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client impact stories"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative mt-10"
        >
          <div className="grad-border glass relative min-h-[19rem] overflow-hidden rounded-3xl sm:min-h-[16rem]">
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl",
                active.tone === "commander" ? "bg-commander-500/20" : "bg-signal-500/20"
              )}
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={reduced ? false : { opacity: 0, x: 34 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -34 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.18em]", active.tone === "commander" ? "text-commander-300" : "text-signal-300")}>
                    {active.org} — {active.context}
                  </p>
                  {active.quote && (
                    <blockquote className="font-display mt-4 max-w-3xl text-xl font-medium leading-snug text-ink sm:text-2xl">
                      “{active.quote}”
                    </blockquote>
                  )}
                  {active.body && (
                    <figcaption className="mt-3 max-w-2xl leading-relaxed text-ink-dim">
                      {active.body}
                    </figcaption>
                  )}
                </div>
                {active.metric && (
                  <div className="shrink0 lg:text-right">
                    <p className={cn("font-display text-5xl font-bold tracking-tight sm:text-6xl", active.tone === "commander" ? "text-commander-400" : "text-signal-300")}>
                      {active.metric.value}
                    </p>
                    <p className="font-mono mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute">
                      {active.metric.label}
                    </p>
                  </div>
                )}
              </motion.figure>
            </AnimatePresence>

            {/* dots */}
            <div className="absolute bottom-5 left-7 flex items-center gap-2 sm:left-10" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.org + i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${t.org}`}
                  data-active={i === index}
                  onClick={() => setIndex(i)}
                  className="slider-dot"
                />
              ))}
            </div>
          </div>

          {/* live region announces the slide for AT */}
          <p className="sr-only-text" aria-live="polite">
            Slide {index + 1} of {count}: {active.org} — {active.context}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
