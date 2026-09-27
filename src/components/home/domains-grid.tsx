import { domains } from "@/lib/content/home";
import { Card, NodeGlyph, Reveal, Section, SectionHeader, Tag } from "@/components/ui";

export function DomainsGrid() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="domains-title">
      <SectionHeader
        id="domains-title"
        eyebrow={domains.eyebrow}
        title={domains.title}
        body={domains.body}
      />

      {/* 9-domain grid — the node-graph motif recurs at card scale */}
      <div className="bg-node-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {domains.items.map((d, i) => (
          <Reveal key={d.id} delay={(i % 3) * 0.07}>
            <Card className="flex h-full flex-col" >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-2xl">{d.icon}</span>
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink-mute">
                    {d.num} —
                  </span>
                </div>
                <NodeGlyph className="card-node shrink-0" size={34} />
              </div>
              <h3 id={`domain-${d.id}`} className="font-display mt-4 text-lg font-semibold leading-snug text-ink">
                {d.title}
              </h3>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-dim">{d.body}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {d.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
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
