import Link from "next/link";
import { thickAgents } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader } from "@/components/ui";

export function ThickAgents() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="thick-agents-title">
      <SectionHeader
        id="thick-agents-title"
        eyebrow={thickAgents.eyebrow}
        title={
          <>
            Thick Clients <span aria-hidden="true" className="text-ink-mute">→</span>{" "}
            <span className="text-signal-400">Thick Agents.</span>
          </>
        }
        body={thickAgents.body}
      />

      {/* Before / Now system diagram */}
      <Reveal delay={0.1}>
        <div className="panel panel-ticks mt-12 overflow-hidden">
          <div className="grid divide-line md:grid-cols-[1fr_auto_1fr] md:divide-x">
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
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="var(--color-signal-800)" strokeWidth="1.5" />
                <path d="M14 13l8 7-8 7" stroke="var(--color-signal-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="max-md:rotate-90 max-md:origin-center" />
              </svg>
            </div>
            <div className="border-t border-line bg-signal-900/10 p-7 md:border-t-0 md:border-l">
              <p className="text-system-label !text-signal-300">⚡ {thickAgents.nowLabel}</p>
              <p className="font-mono mt-3 text-sm text-signal-200">{thickAgents.now}</p>
              {thickAgents.rows.map((r) => (
                <p key={r.now} className="font-mono mt-2.5 text-sm text-signal-200">
                  {r.now}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Three paths */}
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {thickAgents.paths.map((p, i) => (
          <Reveal key={p.title} delay={0.1 + i * 0.08}>
            <Card className="flex h-full flex-col">
              <span aria-hidden="true" className="text-2xl">{p.icon}</span>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2.5 flex-1 leading-relaxed text-ink-dim">{p.body}</p>
              <Link
                href={p.cta.href}
                className="font-mono mt-5 inline-flex items-center gap-2 text-sm text-signal-300 transition-colors hover:text-signal-200"
              >
                {p.cta.label} <span aria-hidden="true">→</span>
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
