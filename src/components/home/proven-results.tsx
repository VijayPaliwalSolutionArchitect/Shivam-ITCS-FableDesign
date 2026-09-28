import { provenResults } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";
import { CountUp, SpotlightCard } from "@/components/fx";

/* Map stat labels to numeric values for the count-up */
const NUMERIC: Record<string, { value: number; prefix?: string; suffix?: string }> = {
  "AI Cost Reduction": { value: 70, prefix: "40–", suffix: "%" },
  "Years Experience": { value: 18, suffix: "+" },
  "Product Domains": { value: 9 },
  "US Companies Served": { value: 2 },
};

export function ProvenResults() {
  return (
    <>
      <Section className="py-16 sm:py-24" labelledBy="results-title">
        <SectionHeader id="results-title" eyebrow={provenResults.eyebrow} title={<span className="text-gradient">{provenResults.title}</span>} />

        <div className="glass grad-border mt-12 grid gap-8 rounded-3xl p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {provenResults.stats.map((s, i) => {
            const n = NUMERIC[s.label];
            return (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="relative">
                  <p className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                    {n ? (
                      <>
                        {n.prefix}
                        <CountUp value={n.value} className="tabular-nums" />
                        {n.suffix}
                      </>
                    ) : (
                      s.value
                    )}
                    {s.unit && !n && <span className="text-signal-400">{s.unit}</span>}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-ink-dim">{s.label}</p>
                  <span aria-hidden="true" className="mt-4 block h-px w-12 bg-gradient-to-r from-signal-500 to-transparent" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Trust & track record */}
      <Section className="py-16 sm:py-24" labelledBy="trust-title">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{provenResults.trust.eyebrow}</p>
            <h2 id="trust-title" className="font-display mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {provenResults.trust.title}
            </h2>
            {provenResults.trust.paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="mt-5 leading-relaxed text-ink-dim">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="glass grad-border bg-node-grid-fine relative h-full overflow-hidden rounded-3xl p-7">
              <div aria-hidden="true" className="scanline" />
              <p className="text-system-label relative">Verification checklist</p>
              <ul className="relative mt-5 space-y-3.5">
                {provenResults.trust.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink-dim">
                    <span aria-hidden="true" className="mt-0.5 font-mono text-ok drop-shadow-[0_0_6px_color-mix(in_srgb,var(--color-ok)_60%,transparent)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Why partner with us */}
      <Section className="py-16 sm:py-24" labelledBy="why-title">
        <h2 id="why-title" className="font-display eyebrow !text-lg !tracking-[0.06em] sm:!text-xl">
          {provenResults.why.eyebrow}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {provenResults.why.cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07}>
              <SpotlightCard className="h-full !p-6">
                <span aria-hidden="true" className="text-2xl">{c.icon}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{c.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
