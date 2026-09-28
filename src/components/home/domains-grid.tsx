import { domains } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";
import { SpotlightCard } from "@/components/fx";
import { Tag } from "@/components/ui";

export function DomainsGrid() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="domains-title">
      <SectionHeader
        id="domains-title"
        eyebrow={domains.eyebrow}
        title={<span className="text-gradient">{domains.title}</span>}
        body={domains.body}
      />

      {/* 9-domain bento over the node-grid — the systemic motif at card scale */}
      <div className="bg-node-grid mt-12 rounded-2xl p-4">
        <div className="bento">
          {domains.items.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.06} className={i === 0 ? "bento-4" : "bento-2"}>
              <SpotlightCard className="flex h-full flex-col !p-6">
                <div id={d.id} className="scroll-mt-24" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong bg-surface-2 text-xl">
                      {d.icon}
                    </span>
                    <span className="font-mono text-[0.66rem] tracking-[0.2em] text-ink-mute">
                      {d.num} —
                    </span>
                  </div>
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold leading-snug text-ink">
                  {d.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-dim">{d.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {d.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
