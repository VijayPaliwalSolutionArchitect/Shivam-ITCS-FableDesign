import { marketMoment } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader } from "@/components/ui";

export function MarketMoment() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="market-moment-title">
      <SectionHeader
        id="market-moment-title"
        eyebrow={marketMoment.eyebrow}
        title={marketMoment.title}
        body={marketMoment.body}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {marketMoment.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <Card className="h-full">
              <p className="font-display text-4xl font-semibold tracking-tight text-signal-300">{s.value}</p>
              <p className="mt-2 font-medium text-ink">{s.label}</p>
              <p className="readout mt-1.5 text-ink-mute">{s.note}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <figure className="panel panel-ticks mt-8 border-l-2 !border-l-signal-500 p-7">
          <blockquote className="font-display max-w-3xl text-xl font-medium leading-snug text-ink sm:text-2xl">
            “{marketMoment.quote}”
          </blockquote>
          <figcaption className="readout mt-3 text-signal-300">{marketMoment.quoteSource}</figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
