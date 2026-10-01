import { capabilityMap } from "@/lib/content/home";
import { NodeGlyph, Reveal, Section, SectionHeader } from "@/components/ui";
import { SpotlightCard } from "@/components/fx";

export function CapabilityMap() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="capability-title">
      <SectionHeader
        id="capability-title"
        eyebrow={capabilityMap.eyebrow}
        title={capabilityMap.title}
        body={capabilityMap.body}
      />

      {/* Spotlight grid over the node-grid backdrop — the motif at 2D scale */}
      <div className="bg-node-grid-fine mt-12 grid gap-4 rounded-2xl p-4 md:grid-cols-2">
        {capabilityMap.cards.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <SpotlightCard className="h-full !p-6">
              <div className="flex items-start justify-between gap-4">
                <span aria-hidden="true" className="text-2xl">{c.icon}</span>
                <NodeGlyph className="card-node shrink-0 opacity-40" size={38} />
              </div>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-dim">{c.body}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
