import { fullStackFirst } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader } from "@/components/ui";

export function FullStackFirst() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="full-stack-title">
      <SectionHeader
        id="full-stack-title"
        eyebrow={fullStackFirst.eyebrow}
        title={fullStackFirst.title}
        body={fullStackFirst.body}
      />
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-dim">{fullStackFirst.body2}</p>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {fullStackFirst.cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <Card className="h-full">
              <span aria-hidden="true" className="text-2xl">{c.icon}</span>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-dim">{c.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
