import Link from "next/link";
import { thickAgents } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";
import { GlowButton, SpotlightCard } from "@/components/fx";

export function ThickAgents() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="thick-agents-title">
      <SectionHeader
        id="thick-agents-title"
        eyebrow={thickAgents.eyebrow}
        title={
          <>
            Thick Clients <span aria-hidden="true" className="text-ink-mute">→</span>{" "}
            <span className="text-gradient-signal">Thick Agents.</span>
          </>
        }
        body={thickAgents.body}
      />

      {/* Before / Now system diagram */}
      <Reveal delay={0.1}>
        <div className="glass grad-border mt-12 grid overflow-hidden rounded-2xl divide-line md:grid-cols-[1fr_auto_1fr] md:divide-x">
          <div className="p-7">
            <p className="text-system-label">🏗 {thickAgents.beforeLabel}</p>
            <p className="font-mono mt-3 text-sm text-ink-mute line-through decoration-critical/60">
              {thickAgents.before}
            </p>
            {thickAgents.rows.map((r) => (
              <p key={r.before} className="font-mono mt-2.5 text-sm text-ink-mute line-through decoration-critical/50">
                {r.before}
              </p>
            ))}
          </div>
          <div className="grid place-items-center p-4 md:p-0" aria-hidden="true">
            <span className="relative grid h-14 w-14 place-items-center rounded-full border border-signal-800/70 bg-signal-900/30">
              <span aria-hidden="true" className="absolute inset-0 rounded-full border border-signal-500/30 animate-node-pulse" />
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l7 6-7 6" stroke="var(--color-signal-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="max-md:rotate-90" />
              </svg>
            </span>
          </div>
          <div className="relative border-t border-line bg-signal-900/10 p-7 md:border-l md:border-t-0">
            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-signal-500/15 blur-3xl" />
            <p className="text-system-label relative !text-signal-300">⚡ {thickAgents.nowLabel}</p>
            <p className="font-mono relative mt-3 text-sm text-signal-200">{thickAgents.now}</p>
            {thickAgents.rows.map((r) => (
              <p key={r.now} className="font-mono relative mt-2.5 text-sm text-signal-200">
                {r.now}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Three paths */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {thickAgents.paths.map((p, i) => (
          <Reveal key={p.title} delay={0.1 + i * 0.08}>
            <SpotlightCard className="flex h-full flex-col !p-6">
              <span aria-hidden="true" className="text-2xl">{p.icon}</span>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2.5 flex-1 leading-relaxed text-ink-dim">{p.body}</p>
              <Link
                href={p.cta.href}
                className="font-mono group mt-5 inline-flex items-center gap-2 text-sm text-signal-300 transition-colors hover:text-signal-200"
              >
                {p.cta.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
