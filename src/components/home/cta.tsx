import { cta } from "@/lib/content/home";
import { Reveal, Section } from "@/components/ui";
import { GlowButton } from "@/components/fx";

export function CtaSection() {
  return (
    <Section id="contact" className="pb-24 pt-8 sm:pb-32" labelledBy="cta-title">
      <Reveal>
        <div className="grad-border-flow glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-16">
          <div aria-hidden="true" className="aurora" />
          <div aria-hidden="true" className="noise absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-44 w-[38rem] -translate-x-1/2 rounded-full bg-signal-500/20 blur-3xl"
          />
          <div className="relative">
            <p className="eyebrow justify-center">{cta.eyebrow}</p>
            <h2
              id="cta-title"
              className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold leading-[1.05] sm:text-5xl"
            >
              <span className="text-gradient">{cta.title}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">{cta.body}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <GlowButton href={cta.primary.href}>🚀 {cta.primary.label}</GlowButton>
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
