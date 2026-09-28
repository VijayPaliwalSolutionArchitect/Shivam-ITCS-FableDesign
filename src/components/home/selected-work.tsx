import { selectedWork } from "@/lib/content/home";
import { Reveal, Section } from "@/components/ui";
import { SpotlightCard } from "@/components/fx";
import { Tag } from "@/components/ui";
import { ShowcaseSlider } from "@/components/home/showcase-slider";

export function SelectedWork() {
  return (
    <div id="section-work">
      <ShowcaseSlider />

      {/* The full shipped list — compact spotlight cards */}
      <Section className="pb-16 pt-2 sm:pb-24" labelledBy="work-title">
        <p className="eyebrow">{selectedWork.eyebrow}</p>
        <h2 id="work-title" className="font-display mt-4 text-2xl font-semibold text-ink sm:text-3xl">
          {selectedWork.title}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {selectedWork.items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.07}>
              <SpotlightCard className="group h-full !p-6">
                <div id={p.id} className="scroll-mt-24" />
                <div className="flex items-start justify-between gap-4">
                  <span aria-hidden="true" className="text-2xl">{p.icon}</span>
                  <span className="font-mono text-right text-[0.6rem] uppercase tracking-[0.16em] text-ink-mute">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-display mt-3.5 text-lg font-semibold leading-snug text-ink group-hover:text-signal-200">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-dim">{p.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                  {p.tags.slice(0, 5).map((t) => (
                    <li key={t}>
                      <Tag tone="mute">{t}</Tag>
                    </li>
                  ))}
                  {p.tags.length > 5 && (
                    <li>
                      <Tag tone="mute">+{p.tags.length - 5}</Tag>
                    </li>
                  )}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
