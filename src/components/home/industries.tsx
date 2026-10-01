import { industries } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";

export function Industries() {
  const rowA = industries.items.slice(0, 4);
  const rowB = industries.items.slice(4);
  return (
    <Section className="py-16 sm:py-24" labelledBy="industries-title">
      <SectionHeader eyebrow={industries.eyebrow} title={industries.title} id="industries-title" />

      <Reveal delay={0.1}>
        <div className="marquee-mask mt-12 space-y-4 overflow-hidden">
          {/* row A: leftward */}
          <div className="overflow-hidden">
            <ul className="marquee-track gap-4 pr-4" aria-label="Industries we serve">
              {[...rowA, ...rowA, ...rowA].map((ind, i) => (
                <li key={ind.id + i} className="panel card-hover w-72 shrink-0 p-5">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong bg-surface-2 text-xl">
                      {ind.icon}
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink">{ind.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">{ind.body}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* row B: rightward (reverse direction) */}
          <div className="overflow-hidden">
            <ul className="marquee-track gap-4 pr-4" aria-label="More industries" style={{ animationDirection: "reverse", animationDuration: "48s" }}>
              {[...rowB, ...rowB, ...rowB].map((ind, i) => (
                <li key={ind.id + i} className="panel card-hover w-72 shrink-0 p-5">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong bg-surface-2 text-xl">
                      {ind.icon}
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink">{ind.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">{ind.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <p className="readout mt-6 text-center">
        + FinTech · Events — <span className="text-signal-300">9 domains, one studio</span>
      </p>
    </Section>
  );
}
