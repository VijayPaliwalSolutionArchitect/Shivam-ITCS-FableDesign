import { provenResults } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader, Stat } from "@/components/ui";

export function ProvenResults() {
  return (
    <>
      <Section className="py-16 sm:py-24" labelledBy="results-title">
        <SectionHeader id="results-title" eyebrow={provenResults.eyebrow} title={provenResults.title} />

        <div className="panel panel-ticks mt-12 grid gap-8 p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {provenResults.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <Stat value={s.value} unit={s.unit} label={s.label} />
            </Reveal>
          ))}
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
            <div className="panel panel-ticks bg-node-grid-fine h-full p-7">
              <p className="text-system-label">Verification checklist</p>
              <ul className="mt-5 space-y-3.5">
                {provenResults.trust.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink-dim">
                    <span aria-hidden="true" className="mt-0.5 font-mono text-ok">✓</span>
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
        <h2 id="why-title" className="eyebrow font-display !text-lg !tracking-[0.06em] sm:!text-xl">
          {provenResults.why.eyebrow}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {provenResults.why.cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07}>
              <Card className="h-full">
                <span aria-hidden="true" className="text-2xl">{c.icon}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{c.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
