import { selectedWork } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader, Tag } from "@/components/ui";

export function SelectedWork() {
  return (
    <Section id="section-work" className="py-16 sm:py-24" labelledBy="work-title">
      <SectionHeader id="work-title" eyebrow={selectedWork.eyebrow} title={selectedWork.title} />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {selectedWork.items.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08}>
            <Card className="group h-full" >
              <div id={p.id} className="scroll-mt-24" />
              <div className="flex items-start justify-between gap-4">
                <span aria-hidden="true" className="text-2xl">{p.icon}</span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-mute">
                  {p.badge}
                </span>
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-ink">
                {p.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-dim">{p.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                {p.tags.map((t) => (
                  <li key={t}>
                    <Tag tone="mute">{t}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
