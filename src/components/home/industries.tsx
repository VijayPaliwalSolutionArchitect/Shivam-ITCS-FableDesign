import { industries } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";

export function Industries() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="industries-title">
      <SectionHeader eyebrow={industries.eyebrow} title={industries.title} id="industries-title" />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {industries.items.map((ind, i) => (
          <Reveal key={ind.id} delay={(i % 4) * 0.06}>
            <div className="panel card-hover group h-full p-5" id={`industry-${ind.id}`}>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong bg-surface-2 text-xl">
                  {ind.icon}
                </span>
                <h3 className="font-display text-base font-semibold text-ink">{ind.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{ind.body}</p>
            </div>
          </Reveal>
        ))}

        {/* filler cell keeps the grid rhythm at 8 slots */}
        <Reveal delay={0.24}>
          <div className="panel flex h-full items-center justify-center border-dashed p-5">
            <p className="font-mono text-center text-[0.7rem] uppercase tracking-[0.16em] text-ink-mute">
              + FinTech · Events
              <br />
              <span className="text-signal-400">9 domains, one studio</span>
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
