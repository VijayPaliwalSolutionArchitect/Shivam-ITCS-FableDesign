"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, workPage, type Project } from "@/lib/content/work";
import { Card, Section, SectionHeader, Tag } from "@/components/ui";
import { cn } from "@/lib/utils";

export function WorkGrid() {
  const [filter, setFilter] = useState(workPage.filters[0]);
  const reduced = useReducedMotion();

  const visible: Project[] =
    filter === workPage.filters[0]
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

  return (
    <Section className="py-12">
      <SectionHeader eyebrow={workPage.eyebrow} title={workPage.title} body={workPage.body} id="work-title" />

      {/* Filter bar — radio-group semantics for keyboard + AT */}
      <div
        role="radiogroup"
        aria-label="Filter projects by category"
        className="mt-10 flex flex-wrap gap-2.5"
      >
        {workPage.filters.map((f) => (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "font-mono rounded-lg border px-4 py-2 text-[0.75rem] uppercase tracking-[0.1em] transition-colors",
              filter === f
                ? "border-signal-500/70 bg-signal-900/40 text-signal-200"
                : "border-line-strong bg-surface-1 text-ink-mute hover:border-signal-700/60 hover:text-ink-dim"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.div
              key={p.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="flex h-full flex-col">
                <div id={p.id} className="scroll-mt-24" />
                <div className="flex items-start justify-between gap-4">
                  <span aria-hidden="true" className="text-2xl">{p.icon}</span>
                  <div className="text-right">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-mute">
                      {p.badge}
                    </p>
                    {p.year && (
                      <p className="font-mono mt-1 text-[0.62rem] tracking-[0.12em] text-signal-400">
                        {p.year}
                      </p>
                    )}
                  </div>
                </div>
                <h2 className="font-display mt-4 text-xl font-semibold leading-snug text-ink">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-ink-dim">{p.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Tag tone="mute">{t}</Tag>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
