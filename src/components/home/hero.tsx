import Link from "next/link";
import { hero } from "@/lib/content/home";
import { Reveal } from "@/components/ui";

export function Hero() {
  return (
    <section id="section-hero" aria-labelledby="hero-title" className="relative">
      {/* min-h reserves layout space before any late-mounting layer — zero CLS */}
      <div className="mx-auto flex min-h-[calc(100svh-60px)] w-full max-w-7xl flex-col justify-center px-5 pb-10 pt-28 lg:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-base/70 px-4 py-1.5 backdrop-blur-sm">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ok animate-node-pulse" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-dim">
              {hero.availability}
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            id="hero-title"
            className="font-display mt-7 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.6rem]"
          >
            {hero.titleLine1}
            <br />
            <span className="text-signal-400">{hero.titleLine2}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="font-display rounded-lg bg-signal-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-signal-900/40 transition-colors hover:bg-signal-400"
            >
              🚀 {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="font-display rounded-lg border border-line-strong bg-base/60 px-6 py-3.5 text-base font-semibold text-ink backdrop-blur-sm transition-colors hover:border-signal-600 hover:text-signal-300"
            >
              {hero.ctaSecondary.label} →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="panel panel-ticks mt-14 grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x lg:grid-cols-7">
            {hero.stats.map((s, i) => (
              <div key={s.label} className={i > 0 ? "border-t border-line px-4 py-4 sm:border-t-0 sm:border-l sm:first:border-l-0" : "px-4 py-4"}>
                <dt className="sr-only-text">{s.label}</dt>
                <dd>
                  <span className="font-display block text-xl font-semibold text-signal-300">{s.value}</span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-mute">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Tech marquee — the stack ticker */}
      <div className="marquee-mask border-y border-line bg-base/70 py-3 backdrop-blur-sm">
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
