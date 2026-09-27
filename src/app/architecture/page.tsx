import type { Metadata } from "next";
import Link from "next/link";
import { architecturePage } from "@/lib/content/architecture";
import { commander } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader, Tag } from "@/components/ui";
import { CommanderDiagramStatic } from "@/components/three/commander-diagram-static";

export const metadata: Metadata = {
  title: "Sovereign Architecture (SCA) & Commander AI",
  description:
    "The 7-layer Sovereign Computing Architecture (SCA) and our Commander multi-agent AI pipeline. Enterprise governance meets autonomous intelligence.",
  keywords: [
    "Sovereign Architecture",
    "SCA",
    "Commander Architecture",
    "Multi-Agent AI",
    "IronDome Governance",
    "Enterprise Platform",
    "SHIVAM ITCS",
    "Vijay Paliwal",
    "AI India",
    "shivamitcs.in",
  ],
  alternates: { canonical: "/architecture" },
};

export default function ArchitecturePage() {
  const a = architecturePage;
  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-8 pt-32 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {a.badges.map((b) => (
            <span
              key={b}
              className="font-mono rounded-full border border-line-strong bg-base/70 px-3.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-ink-dim backdrop-blur-sm"
            >
              {b}
            </span>
          ))}
        </div>
        <h1 className="font-display mt-6 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {a.title1} <span className="text-signal-400">{a.title2}</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-dim">{a.body}</p>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {a.toc.map((t) => (
            <li key={t} className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute">
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Domain packs → inputs → SCA → outputs */}
      <Section className="py-14" labelledBy="packs-title">
        <h2 id="packs-title" className="font-display text-center text-xl font-semibold text-ink">
          {a.domainPacks.heading}
        </h2>

        <Reveal>
          <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.2fr]">
            {/* Domain packs */}
            <div className="panel panel-ticks p-5">
              <ul className="flex flex-wrap gap-2.5">
                {a.domainPacks.packs.map((p) => (
                  <li
                    key={p}
                    className="rounded-lg border border-line-strong bg-surface-2 px-3.5 py-2 text-sm text-ink-dim"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* flow arrows */}
            <div className="grid place-items-center px-2" aria-hidden="true">
              <p className="font-mono rotate-0 text-[0.7rem] tracking-[0.2em] text-signal-400 lg:rotate-90">
                ↓ ↓ ↓ ↓
              </p>
            </div>

            {/* Any inputs */}
            <div className="panel panel-ticks p-5">
              <p className="text-system-label">{a.domainPacks.inputsHeading}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {a.domainPacks.inputs.map((input) => (
                  <li key={input.label} className="flex items-start gap-2.5">
                    <span aria-hidden="true">{input.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-ink">{input.label}</p>
                      <p className="readout">{input.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="font-mono mt-4 text-right text-[0.7rem] tracking-[0.14em] text-signal-400">
                {a.domainPacks.runtimeLabel}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* The 10-layer stack, L9 (Commander) at top */}
      <Section className="py-14" labelledBy="layers-title">
        <h2 id="layers-title" className="sr-only-text">
          SCA layer stack, from the Sovereign Kernel at L0 to Commander intelligence at L9
        </h2>
        <div className="mx-auto max-w-4xl space-y-3">
          {a.layers.map((layer, i) => (
            <Reveal key={layer.id} delay={Math.min(i * 0.04, 0.2)}>
              <div
                className={`panel card-hover relative p-5 sm:p-6 ${
                  layer.commander
                    ? "border-commander-500/50 bg-commander-900/10"
                    : layer.critical
                      ? "border-critical/40 bg-surface-1"
                      : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className={`font-display grid h-11 w-11 shrink-0 place-items-center rounded-xl border text-lg ${
                        layer.commander
                          ? "border-commander-500/60 bg-commander-500/15 text-commander-300"
                          : "border-line-strong bg-surface-2 text-ink-dim"
                      }`}
                    >
                      {layer.icon}
                    </span>
                    <div>
                      <p className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-mono text-[0.68rem] tracking-[0.18em] text-ink-mute">
                          {layer.id}
                        </span>
                        <span
                          className={`font-display text-lg font-bold tracking-wide ${
                            layer.commander ? "text-commander-300" : "text-ink"
                          }`}
                        >
                          {layer.name}
                        </span>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-mute">
                          {layer.role}
                        </span>
                      </p>
                      <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink-dim">
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-mono shrink-0 rounded border px-2.5 py-1.5 text-[0.68rem] ${
                      layer.commander
                        ? "border-commander-600/50 text-commander-300"
                        : "border-line-strong text-ink-mute"
                    }`}
                  >
                    {layer.footer}
                  </p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {layer.modules.map((m) => (
                    <li key={m}>
                      <Tag tone={layer.commander ? "commander" : "mute"}>{m}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Intelligent outputs */}
      <Section className="py-14" labelledBy="outputs-title">
        <h2 id="outputs-title" className="font-display text-2xl font-semibold text-ink">
          {a.outputsHeading}
        </h2>
        <Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.outputs.map((o) => (
              <div key={o.label} className="panel card-hover p-5">
                <span aria-hidden="true" className="text-xl">{o.icon}</span>
                <p className="font-display mt-2 text-base font-semibold text-ink">{o.label}</p>
                <p className="readout mt-1">{o.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="font-mono mt-6 text-center text-[0.72rem] tracking-[0.18em] text-signal-400">
          {a.outputsFooter}
        </p>
      </Section>

      {/* Commander pipeline (static diagram — full fidelity, not faded) */}
      <Section className="py-14" labelledBy="commander-pipeline-title">
        <SectionHeader
          id="commander-pipeline-title"
          eyebrow={commander.eyebrow}
          title={<span className="text-commander-400">Commander Pipeline</span>}
          body={commander.subtitle}
          commander
        />
        <Reveal delay={0.1}>
          <div className="panel panel-ticks mt-10 p-4 sm:p-8">
            <CommanderDiagramStatic className="mx-auto w-full max-w-3xl" />
          </div>
        </Reveal>
        <p className="mt-6 text-center font-mono text-sm text-ok">{commander.resultLine}</p>
      </Section>

      {/* Replaces list */}
      <Section className="py-14" labelledBy="replaces-title">
        <h2 id="replaces-title" className="font-display max-w-2xl text-2xl font-semibold text-ink">
          {a.replacesHeading}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {a.replaces.map((r) => (
            <li
              key={r}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface-1/60 px-4 py-3 text-sm text-ink-dim"
            >
              <span aria-hidden="true" className="font-mono text-critical">✕</span>
              {r}
            </li>
          ))}
        </ul>
      </Section>

      {/* Stats + CTA */}
      <Section className="py-14">
        <div className="panel panel-ticks grid grid-cols-2 gap-6 p-8 sm:grid-cols-4 lg:grid-cols-7">
          {a.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold text-signal-300">{s.value}</p>
              <p className="readout mt-1.5 !text-ink-mute">{s.label}</p>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <p className="text-lg text-ink-dim">{a.cta}</p>
            <Link
              href="/#contact"
              className="font-display mt-5 inline-block rounded-lg bg-commander-500 px-7 py-3.5 text-base font-semibold text-base-raised shadow-lg shadow-commander-900/40 transition-colors hover:bg-commander-400"
            >
              {a.ctaButton}
            </Link>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
