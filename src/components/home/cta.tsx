import { cta } from "@/lib/content/home";
import { Reveal, Section } from "@/components/ui";

export function CtaSection() {
  return (
    <Section id="contact" className="py-20 sm:py-28" labelledBy="cta-title">
      <Reveal>
        <div className="panel panel-ticks relative overflow-hidden p-8 text-center sm:p-16">
          {/* node-grid glow — the systemic motif closes the page */}
          <div aria-hidden="true" className="bg-node-grid absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-40 w-[36rem] -translate-x-1/2 rounded-full bg-signal-500/15 blur-3xl"
          />
          <div className="relative">
            <p className="eyebrow justify-center">{cta.eyebrow}</p>
            <h2
              id="cta-title"
              className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold leading-[1.05] text-ink sm:text-5xl"
            >
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">{cta.body}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={cta.primary.href}
                className="font-display rounded-lg bg-signal-500 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-signal-900/40 transition-colors hover:bg-signal-400"
              >
                🚀 {cta.primary.label}
              </a>
            </div>

            <p className="readout mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {cta.links.map((l, i) => (
                <span key={l.label} className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden="true" className="text-ink-mute">·</span>}
                  <a href={l.href} className="text-signal-300 transition-colors hover:text-signal-200">
                    {l.label}
                  </a>
                </span>
              ))}
              <span aria-hidden="true" className="text-ink-mute">·</span>
              <a href="mailto:contact@shivamitcs.in" className="text-signal-300 transition-colors hover:text-signal-200">
                contact@shivamitcs.in
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
