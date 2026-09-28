import Link from "next/link";
import { hero } from "@/lib/content/home";
import { GlowButton } from "@/components/fx";
import { Reveal } from "@/components/ui";

export function Hero() {
  return (
    <section id="section-hero" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* ambient layer: aurora + grain + halo (decorative only) */}
      <div aria-hidden="true" className="aurora" />
      <div aria-hidden="true" className="noise absolute inset-0" />

      <div className="relative mx-auto flex min-h-[calc(100svh-60px)] w-full max-w-7xl flex-col justify-center px-5 pb-10 pt-28 lg:px-8">
        <Reveal>
          <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ok shadow-[0_0_10px_var(--color-ok)] animate-node-pulse" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-dim">
              {hero.availability}
            </span>
          </p>
        </Reveal>

        <div className="relative">
          <div aria-hidden="true" className="headline-halo" />
          <Reveal delay={0.08}>
            <h1
              id="hero-title"
              className="font-display relative mt-7 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.6rem]"
            >
              {hero.titleLine1}
              <br />
              <span className="text-gradient-signal drop-shadow-[0_0_28px_color-mix(in_srgb,var(--color-signal-500)_45%,transparent)]">
                {hero.titleLine2}
              </span>
            </h1>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <GlowButton href={hero.ctaPrimary.href}>🚀 {hero.ctaPrimary.label}</GlowButton>
            <GlowButton href={hero.ctaSecondary.href} variant="ghost">
              {hero.ctaSecondary.label} <span aria-hidden="true">→</span>
            </GlowButton>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="glass grad-border mt-14 grid grid-cols-2 divide-line rounded-2xl sm:grid-cols-4 lg:grid-cols-7">
            {hero.stats.map((s, i) => (
              <div
                key={s.label}
                className={
                  i > 0
                    ? "border-t border-line/60 px-4 py-4 sm:border-l sm:border-t-0"
                    : "px-4 py-4"
                }
              >
                <dt className="sr-only-text">{s.label}</dt>
                <dd>
                  <span className="font-display block bg-gradient-to-r from-signal-200 to-signal-400 bg-clip-text text-xl font-semibold text-transparent">
                    {s.value}
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-mute">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Tech marquee — the stack ticker */}
      <div className="marquee-mask relative border-y border-line bg-base/70 py-3 backdrop-blur-sm">
        <div className="overflow-hidden">
          <ul className="marquee-track items-center gap-8 pr-8" aria-label="Technology stack highlights">
            {[...hero.marquee, ...hero.marquee].map((item, i) => (
              <li key={i} className="flex shrink-0 items-center gap-8 whitespace-nowrap">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-mute">
                  {item}
                </span>
                <span aria-hidden="true" className="text-signal-600">✦</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
