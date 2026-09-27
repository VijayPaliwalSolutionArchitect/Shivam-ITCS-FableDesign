import type { Metadata } from "next";
import Link from "next/link";
import { aboutPage } from "@/lib/content/about";
import { techStack } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader, Stat, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — Vijay & Ajay Paliwal",
  description:
    "18+ years of production enterprise engineering from Nathdwara, India. Founders Vijay and Ajay Paliwal — HiveGPT, Social27, Clearly Inventory alumni — shipping AI infrastructure since 2011.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const a = aboutPage;
  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-5 pt-32 lg:px-8">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-signal-300">
          {a.meta}
        </p>
        <h1 className="font-display mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {a.title1} <span className="text-signal-400">{a.title2}</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-dim">{a.intro}</p>

        <div className="panel panel-ticks mt-10 grid grid-cols-2 gap-6 p-7 sm:grid-cols-4">
          {a.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold text-signal-300">{s.value}</p>
              <p className="readout mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <Section className="py-16" labelledBy="team-title">
        <p className="eyebrow" id="team-title">The Team</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {a.founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <Card className="h-full !p-0" hover={false}>
                <div className="flex flex-wrap items-center gap-5 border-b border-line bg-surface-1/70 p-6">
                  <span
                    aria-hidden="true"
                    className="font-display grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-signal-700/60 bg-signal-900/30 text-xl font-bold text-signal-300"
                  >
                    {f.initials}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">{f.name}</h2>
                    <p className="readout mt-1 !text-signal-300">{f.role}</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {f.credentials.map((c) => (
                        <li key={c}>
                          <Tag>{c}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {f.badges.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-ink-dim">
                        <span aria-hidden="true">🏆</span> {b}
                      </li>
                    ))}
                  </ul>
                  <p className="font-display mt-4 border-l-2 border-commander-500/70 pl-4 text-[1.05rem] font-medium leading-snug text-ink">
                    {f.headline}
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-dim">{f.bio1}</p>
                  <p className="mt-3 leading-relaxed text-ink-dim">{f.bio2}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Who we are / story sections */}
      <Section className="py-14" labelledBy="who-title">
        <h2 id="who-title" className="font-display text-3xl font-semibold text-ink">
          {a.whoWeAre.heading}
        </h2>
        {a.whoWeAre.paragraphs.map((p, i) => (
          <p key={i} className="mt-5 max-w-4xl leading-relaxed text-ink-dim">
            {p}
          </p>
        ))}

        <div className="mt-14 space-y-14">
          {a.storySections.map((sec) => (
            <div key={sec.heading}>
              <h3 className="font-display text-xl font-semibold text-signal-300">{sec.heading}</h3>
              {sec.title && (
                <p className="font-display mt-2 text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  {sec.title}
                </p>
              )}
              {sec.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 max-w-4xl leading-relaxed text-ink-dim">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* 9 domains shipped */}
      <Section className="py-14" labelledBy="domains-shipped-title">
        <h2 id="domains-shipped-title" className="font-display text-2xl font-semibold text-ink">
          {a.domainsShipped.heading}
        </h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-3">
          {a.domainsShipped.items.map((d) => (
            <li key={d} className="panel card-hover flex items-center gap-3 px-4 py-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal-500" />
              <span className="text-sm text-ink-dim">{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Why we're different */}
      <Section className="py-14" labelledBy="different-title">
        <h2 id="different-title" className="font-display text-3xl font-semibold text-ink">
          {a.differentiators.heading}
        </h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {a.differentiators.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.08}>
              <Card hover={false} className="h-full !p-6">
                <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-ink">
                  <span aria-hidden="true" className="text-signal-400">⚡</span> {item.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-ink-dim">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Numbers */}
      <Section className="py-14" labelledBy="numbers-title">
        <h2 id="numbers-title" className="font-display text-2xl font-semibold text-ink">
          {a.numbers.heading}
        </h2>
        <div className="panel panel-ticks mt-8 grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-5">
          {a.numbers.items.map((n) => (
            <div key={n.note}>
              <Stat value={n.value} label={n.label} />
              <p className="readout mt-1.5 text-ink-mute">{n.note}</p>
            </div>
          ))}
        </div>

        <blockquote className="panel panel-ticks mt-10 border-l-2 !border-l-signal-500 p-7">
          <p className="font-display max-w-3xl text-xl font-medium leading-snug text-ink">
            “{a.philosophy.line}”
          </p>
        </blockquote>
      </Section>

      {/* Timeline */}
      <Section className="py-14" labelledBy="story-title">
        <SectionHeader eyebrow={a.timeline.heading} title={a.timeline.title} id="story-title" />
        <p className="mt-5 max-w-4xl leading-relaxed text-ink-dim">{a.timeline.intro}</p>
        <p className="mt-4 max-w-4xl leading-relaxed text-ink-dim">{a.timeline.intro2}</p>

        <ol className="mt-12 space-y-0">
          {a.timeline.eras.map((era, i) => (
            <li key={era.period} className="relative pl-10 sm:pl-14">
              {/* timeline rail */}
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-8 bottom-0 w-px bg-line-strong sm:left-[9px]"
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 top-2 h-4 w-4 rounded-full border-2 sm:h-5 sm:w-5 ${
                  i === a.timeline.eras.length - 1
                    ? "border-commander-500 bg-commander-900/60"
                    : "border-signal-500 bg-base"
                }`}
              />
              <div className="pb-10">
                <p className="font-mono text-[0.72rem] tracking-[0.18em] text-signal-300">
                  {era.period}
                </p>
                <h3 className="font-display mt-1.5 text-xl font-semibold text-ink">{era.title}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-ink-dim">{era.body}</p>
                {era.sub.map((sub) => (
                  <div key={sub.title} className="mt-4 rounded-lg border border-line bg-surface-1/60 p-4">
                    <p className="font-display text-sm font-semibold text-ok">⚑ {sub.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{sub.body}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <blockquote className="panel panel-ticks mt-4 border-l-2 !border-l-commander-500 bg-commander-900/10 p-7">
          <p className="font-display max-w-3xl text-xl font-medium leading-snug text-ink">
            “{a.timeline.quote}” {a.timeline.quoteSource}
          </p>
        </blockquote>
      </Section>

      {/* Principles + named proof */}
      <Section className="py-14" labelledBy="proof-title">
        <h2 id="proof-title" className="eyebrow font-display !text-lg !tracking-[0.06em]">
          {a.principles.heading}
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {a.principles.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <Card className="h-full">
                <span aria-hidden="true" className="text-2xl">{p.icon}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{p.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Named proof */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {a.namedProof.items.map((proof, i) => (
            <Reveal key={proof.org} delay={(i % 2) * 0.08}>
              <div className="panel card-hover h-full p-6">
                <p className="font-mono flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-signal-300">
                  <span aria-hidden="true" className="text-signal-400">◆</span> {proof.org}
                </p>
                <h3 className="font-display mt-2.5 text-xl font-semibold text-ink">{proof.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-dim">{proof.body}</p>
                <dl className="mt-4 flex gap-6">
                  {proof.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only-text">{m.label}</dt>
                      <dd className="font-display text-2xl font-semibold text-commander-400">
                        {m.value}
                      </dd>
                      <dd className="readout !text-ink-mute">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}

          {a.namedProof.own.map((proof, i) => (
            <Reveal key={proof.title} delay={(i % 2) * 0.08}>
              <div className="panel card-hover h-full border-commander-700/40 p-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-commander-300">
                  Own IP · Proprietary
                </p>
                <h3 className="font-display mt-2.5 text-xl font-semibold text-ink">{proof.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-dim">{proof.body}</p>
                <dl className="mt-4 flex gap-6">
                  {proof.metrics.map((m) => (
                    <div key={m.label + m.value}>
                      <dt className="sr-only-text">{m.label}</dt>
                      <dd className="font-display text-2xl font-semibold text-signal-300">{m.value}</dd>
                      <dd className="readout !text-ink-mute">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Own IP products */}
        <h3 className="font-display mt-14 text-2xl font-semibold text-ink">
          {a.namedProof.ownIp.heading}
        </h3>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.namedProof.ownIp.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="panel card-hover h-full p-5">
                <div className="flex items-start justify-between gap-3">
                  <span aria-hidden="true" className="text-2xl">{item.icon}</span>
                  {item.badge && (
                    <span className="font-mono rounded border border-ok/40 bg-ok/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-ok">
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

      {/* Tech stack */}
      <Section className="py-14" labelledBy="about-stack-title">
        <SectionHeader eyebrow="Tech Stack" title="The Full Toolbox" id="about-stack-title" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {techStack.groups.map((g) => (
            <div key={g.name} className="panel panel-ticks p-6">
              <h3 className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink">
                {g.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono rounded-md border border-line-strong bg-surface-2 px-3 py-1.5 text-[0.78rem] text-ink-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Why SHIVAM ITCS */}
      <Section className="py-14" labelledBy="why-title">
        <h2 id="why-title" className="font-display text-3xl font-semibold text-ink">
          {a.whyShivam.title}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-dim">{a.whyShivam.intro}</p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {a.whyShivam.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.07}>
              <Card className="h-full">
                <span aria-hidden="true" className="text-2xl">{item.icon}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <div className="panel panel-ticks bg-node-grid-fine p-8 text-center sm:p-12">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {a.cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-dim">{a.cta.body}</p>
          <Link
            href={a.cta.cta.href}
            className="font-display mt-7 inline-block rounded-lg bg-signal-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-signal-900/40 transition-colors hover:bg-signal-400"
          >
            🚀 {a.cta.cta.label}
          </Link>
          <p className="readout mt-6">📧 {a.cta.contact} | 🌐 shivamitcs.in | 🏢 shivamitconsultancy.com</p>
        </div>
      </Section>
    </div>
  );
}
