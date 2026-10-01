import { marketMoment } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";
import { SpotlightCard } from "@/components/fx";

export function MarketMoment() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="market-moment-title">
      <div className="horizon pb-14">
        <SectionHeader
          id="market-moment-title"
          eyebrow={marketMoment.eyebrow}
          title={<span className="text-gradient">{marketMoment.title}</span>}
          body={marketMoment.body}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {marketMoment.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <SpotlightCard className="h-full !p-6">
              <span aria-hidden="true" className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-mute">
                0{i + 1}
              </span>
              <p className="font-display mt-2 bg-gradient-to-br from-signal-200 to-signal-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
                {s.value}
              </p>
              <p className="mt-2 font-medium text-ink">{s.label}</p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-mute">{s.note}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <figure className="glass grad-border relative mt-6 overflow-hidden rounded-2xl border-l-2 !border-l-signal-500 p-7">
          <div aria-hidden="true" className="scanline" />
          <blockquote className="font-display relative max-w-3xl text-xl font-medium leading-snug text-ink sm:text-2xl">
            “{marketMoment.quote}”
          </blockquote>
          <figcaption className="font-mono relative mt-3 text-[0.72rem] uppercase tracking-[0.16em] text-signal-300">
            {marketMoment.quoteSource}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
