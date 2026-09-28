import { fullStackFirst } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";
import { SpotlightCard } from "@/components/fx";

export function FullStackFirst() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="full-stack-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            id="full-stack-title"
            eyebrow={fullStackFirst.eyebrow}
            title={<span className="text-gradient">{fullStackFirst.title}</span>}
            body={fullStackFirst.body}
          />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">{fullStackFirst.body2}</p>
        </div>

        {/* bento stack */}
        <div className="bento">
          {fullStackFirst.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className={i === 0 ? "bento-6" : "bento-3"}>
              <SpotlightCard className={i === 0 ? "h-full !p-7" : "h-full !p-6"}>
                <div className="flex items-start justify-between gap-4">
                  <span aria-hidden="true" className={i === 0 ? "text-3xl" : "text-2xl"}>{c.icon}</span>
                  <span aria-hidden="true" className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-mute">
                    0{i + 1}
                  </span>
                </div>
                <h3 className={cnTitle(i)}>
                  {c.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-dim">{c.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function cnTitle(i: number) {
  return i === 0
    ? "font-display mt-4 text-2xl font-semibold text-ink"
    : "font-display mt-3 text-lg font-semibold text-ink";
}
