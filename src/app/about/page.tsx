import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutPage } from "@/lib/content/about";
import { techStack } from "@/lib/content/home";
import { Reveal, Section, SectionHeader, Tag } from "@/components/ui";
import { CountUp, GlowButton, SpotlightCard, TiltCard } from "@/components/fx";
import { CommanderDiagramStatic } from "@/components/three/commander-diagram-static";

export const metadata: Metadata = {
  title: "About — Vijay & Ajay Paliwal",
  description:
    "18+ years of production enterprise engineering from Nathdwara, India. Founders Vijay and Ajay Paliwal — HiveGPT, Social27, Clearly Inventory alumni — shipping AI infrastructure since 2011.",
  alternates: { canonical: "/about" },
};

const SECTION_COUNT = 10; // target

export default function AboutPage() {
  const a = aboutPage;
  return (
    <div className="relative z-10">
      {/* ===== 1. HERO ===== */}
      <section aria-labelledby="about-hero-title" className="relative mx-auto w-full max-w-7xl overflow-hidden px-5 pt-32 lg:px-8">
        <div aria-hidden="true" className="aurora" />
        <div aria-hidden="true" className="noise absolute inset-0" />
        <div className="relative">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-signal-300">
            {a.meta}
          </p>
          <h1 id="about-hero-title" className="font-display mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {a.title1} <span className="text-gradient-signal drop-shadow-[0_0_28px_color-mix(in_srgb,var(--color-signal-500)_45%,transparent)]">{a.title2}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-dim">{a.intro}</p>
          <div className="glass grad-border mt-10 grid grid-cols-2 gap-6 rounded-3xl p-7 backdrop-blur-md sm:grid-cols-4">
            {a.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display bg-gradient-to-br from-signal-200 to-signal-500 bg-clip-text text-3xl font-semibold text-transparent">{s.value}</p>
                <p className="font-mono mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-ink-mute">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. FOUNDERS — tilt + avatar ===== */}
      <Section className="py-16" labelledBy="team-title">
        <p className="eyebrow" id="team-title">The Team</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {a.founders.map((f, i) => {
            const init = f.initials.toLowerCase();
            return (
              <Reveal key={f.name} delay={i * 0.1}>
                <TiltCard max={4}>
                  <div className="glass grad-border h-full overflow-hidden rounded-3xl">
                    <div className="relative flex flex-wrap items-center gap-5 border-b border-line/70 bg-surface-1/60 p-6">
                      <div className={`pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full blur-3xl ${i === 0 ? "bg-commander-500/15" : "bg-signal-500/15"}`} />
                      <Image
                        src={`/team/${init}.jpg`}
                        alt=""
                        width={80}
                        height={80}
                        className="relative h-20 w-20 shrink-0 rounded-2xl border border-line-strong object-cover"
                      />
                      <div className="relative">
                        <h2 className="font-display text-2xl font-semibold text-ink">{f.name}</h2>
                        <p className={`font-mono mt-1 text-[0.72rem] uppercase tracking-[0.14em] ${i === 0 ? "text-commander-300" : "text-signal-300"}`}>
                          {f.role}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {f.credentials.map((c) => (<li key={c}><Tag>{c}</Tag></li>))}
                        </ul>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-2">
                        {f.badges.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-sm text-ink-dim">
                            <span aria-hidden="true" className="text-ok drop-shadow-[0_0_6px_color-mix(in_srgb,var(--color-ok)_60%,transparent)]">🏆</span> {b}
                          </li>
                        ))}
                      </ul>
                      <p className="font-display mt-4 border-l-2 border-commander-500/70 pl-4 text-[1.05rem] font-medium leading-snug text-ink">
                        {f.headline}
                      </p>
                      <p className="mt-4 leading-relaxed text-ink-dim">{f.bio1}</p>
                      <p className="mt-3 leading-relaxed text-ink-dim">{f.bio2}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ===== 3. WHO WE ARE ===== */}
      <Section className="py-14" labelledBy="who-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="who-title" className="font-display text-3xl font-semibold text-ink">{a.whoWeAre.heading}</h2>
            {a.whoWeAre.paragraphs.map((p, i) => (<p key={i} className="mt-5 leading-relaxed text-ink-dim">{p}</p>))}
          </div>
          <Reveal delay={0.1}>
            <div className="glass grad-border overflow-hidden rounded-3xl p-7">
              <CommanderDiagramStatic className="w-full opacity-90" title="Commander Architecture" />
              <p className="font-mono mt-4 text-center text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute">
                The architecture that drives everything
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ===== 4. STORY SECTIONS ===== */}
      <Section className="py-14">
        <div className="space-y-16">
          {a.storySections.map((sec) => (
            <div key={sec.heading}>
              <h3 className="font-display text-xl font-semibold text-signal-300">{sec.heading}</h3>
              {sec.title && (
                <p className="font-display mt-2 text-2xl font-semibold leading-snug text-gradient sm:text-3xl">
                  {sec.title}
                </p>
              )}
              {sec.paragraphs.map((p, i) => (<p key={i} className="mt-4 max-w-4xl leading-relaxed text-ink-dim">{p}</p>))}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 5. 9 DOMAINS SHIPPED ===== */}
      <Section className="py-14" labelledBy="domains-shipped-title">
        <h2 id="domains-shipped-title" className="font-display text-2xl font-semibold text-ink">{a.domainsShipped.heading}</h2>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {a.domainsShipped.items.map((d) => (
            <div key={d} className="glass card-hover flex items-center gap-3 rounded-xl px-5 py-3.5">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal-500 shadow-[0_0_10px_var(--color-signal-500)]" />
              <span className="text-sm text-ink-dim">{d}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 6. WHY WE'RE DIFFERENT ===== */}
      <Section className="py-14" labelledBy="different-title">
        <h2 id="different-title" className="font-display text-3xl font-semibold text-ink">{a.differentiators.heading}</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {a.differentiators.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.08}>
              <SpotlightCard className="h-full !p-6">
                <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-ink">
                  <span aria-hidden="true" className="text-signal-400 drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-signal-500)_50%,transparent)]">⚡</span> {item.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-dim">{item.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== 7. NUMBERS + PHILOSOPHY ===== */}
      <Section className="py-14" labelledBy="numbers-title">
        <h2 id="numbers-title" className="font-display text-2xl font-semibold text-ink">{a.numbers.heading}</h2>
        <div className="glass grad-border mt-8 grid gap-8 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-5">
          {a.numbers.items.map((n) => (
            <div key={n.note}>
              <p className="font-display bg-gradient-to-br from-signal-200 to-signal-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
                {n.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink-dim">{n.label}</p>
              <p className="font-mono mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-ink-mute">{n.note}</p>
            </div>
          ))}
        </div>
        <blockquote className="glass relative mt-8 overflow-hidden rounded-2xl border-l-2 !border-l-signal-500 p-7">
          <div aria-hidden="true" className="scanline" />
          <p className="font-display relative max-w-3xl text-xl font-medium leading-snug text-ink">
            “{a.philosophy.line}”
          </p>
        </blockquote>
      </Section>

      {/* ===== 8. TIMELINE ===== */}
      <Section className="py-14" labelledBy="story-title">
        <SectionHeader eyebrow={a.timeline.heading} title={a.timeline.title} id="story-title" />
        <p className="mt-5 max-w-4xl leading-relaxed text-ink-dim">{a.timeline.intro}</p>
        <p className="mt-4 max-w-4xl leading-relaxed text-ink-dim">{a.timeline.intro2}</p>
        <ol className="mt-12 space-y-0">
          {a.timeline.eras.map((era, i) => (
            <li key={era.period} className="relative pl-10 sm:pl-14">
              <span aria-hidden="true" className="absolute left-[7px] top-8 bottom-0 w-px bg-gradient-to-b from-signal-500/50 to-transparent sm:left-[9px]" />
              <span aria-hidden="true" className={`absolute left-0 top-2 h-4 w-4 rounded-full border-2 sm:h-5 sm:w-5 ${i === a.timeline.eras.length - 1 ? "border-commander-500 bg-commander-900/70 shadow-[0_0_14px_var(--color-commander-500)]" : "border-signal-500 bg-base shadow-[0_0_10px_var(--color-signal-500)]"}`} />
              <div className="pb-10">
                <p className="font-mono text-[0.72rem] tracking-[0.18em] text-signal-300">{era.period}</p>
                <h3 className="font-display mt-1.5 text-xl font-semibold text-ink">{era.title}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-ink-dim">{era.body}</p>
                {era.sub.map((sub) => (
                  <div key={sub.title} className="glass grad-border mt-4 rounded-xl p-5">
                    <p className="font-display text-sm font-semibold text-ok">⚑ {sub.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{sub.body}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <blockquote className="glass relative mt-4 overflow-hidden rounded-2xl border-l-2 !border-l-commander-500 bg-commander-900/10 p-7">
          <p className="font-display relative max-w-3xl text-xl font-medium leading-snug text-ink">
            “{a.timeline.quote}” {a.timeline.quoteSource}
          </p>
        </blockquote>
      </Section>

      {/* ===== 9. NAMED PROOF + PRINCIPLES ===== */}
      <Section className="py-14" labelledBy="proof-title">
        <h2 id="proof-title" className="font-display eyebrow !text-lg !tracking-[0.06em]">{a.principles.heading}</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {a.principles.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <SpotlightCard className="h-full !p-6">
                <span aria-hidden="true" className="text-2xl">{p.icon}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{p.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* proof cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {a.namedProof.items.map((proof, i) => (
            <Reveal key={proof.org} delay={(i % 2) * 0.08}>
              <SpotlightCard className="h-full !p-6">
                <p className="font-mono flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-signal-300">
                  <span aria-hidden="true">◆</span> {proof.org}
                </p>
                <h3 className="font-display mt-2.5 text-xl font-semibold text-ink">{proof.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-dim">{proof.body}</p>
                <dl className="mt-4 flex gap-6">
                  {proof.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only-text">{m.label}</dt>
                      <dd className="font-display text-2xl font-semibold text-commander-400">{m.value}</dd>
                      <dd className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-mute">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <h3 className="font-display mt-14 text-2xl font-semibold text-ink">{a.namedProof.ownIp.heading}</h3>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.namedProof.ownIp.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="glass card-hover h-full rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <span aria-hidden="true" className="text-2xl">{item.icon}</span>
                  {item.badge && (
                    <span className="font-mono rounded border border-ok/50 bg-ok/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-ok">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-display mt-3 text-lg font-semibold text-ink">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== 10. WHY SHIVAM + CTA ===== */}
      <Section className="py-16">
        <div className="grad-border-flow glass noise relative overflow-hidden rounded-3xl bg-gradient-to-r from-signal-900/20 via-surface-1/40 to-commander-900/15 p-8 text-center sm:p-14">
          <div aria-hidden="true" className="aurora" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              {a.cta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-dim">{a.cta.body}</p>
            <div className="mt-7">
              <GlowButton href={a.cta.cta.href}>🚀 {a.cta.cta.label}</GlowButton>
            </div>
            <p className="font-mono mt-6 text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute">
              📧 {a.cta.contact} &nbsp;·&nbsp; 🌐 shivamitcs.in &nbsp;·&nbsp; 🏢 shivamitconsultancy.com
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}