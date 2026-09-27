import { capabilityMap } from "@/lib/content/home";
import { Card, NodeGlyph, Reveal, Section, SectionHeader } from "@/components/ui";

export function CapabilityMap() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="capability-title">
      <SectionHeader
        id="capability-title"
        eyebrow={capabilityMap.eyebrow}
        title={capabilityMap.title}
        body={capabilityMap.body}
      />

      {/* The node-grid backdrop carries the systemic 3D motif into 2D */}
      <div className="bg-node-grid-fine mt-12 grid gap-5 md:grid-cols-2">
        {capabilityMap.cards.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <Card className="h-full">
              <div className="flex items-start justify-between gap-4">
                <span aria-hidden="true" className="text-2xl">{c.icon}</span>
                <NodeGlyph className="card-node shrink-0 opacity-40" size={38} />
              </div>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-dim">{c.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
