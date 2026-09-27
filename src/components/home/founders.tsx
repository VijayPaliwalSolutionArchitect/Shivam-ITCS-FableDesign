import { founders } from "@/lib/content/home";
import { Card, Reveal, Section, SectionHeader, Tag } from "@/components/ui";

export function Founders() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="founders-title">
      <SectionHeader id="founders-title" eyebrow={founders.eyebrow} title={founders.title} />
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-dim">{founders.subtitle}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {founders.people.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.1}>
            <Card className="h-full overflow-hidden !p-0">
              {/* header: initials node + role */}
              <div className="flex items-center gap-5 border-b border-line bg-surface-1/70 p-6">
                <span
                  aria-hidden="true"
                  className="font-display relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-signal-700/60 bg-signal-900/30 text-xl font-bold text-signal-300"
                >
                  {person.initials}
                  <span className="absolute inset-0 rounded-2xl border border-signal-500/25" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink">{person.name}</h3>
                  <p className="readout mt-1 !text-signal-300">{person.role}</p>
                  <p className="readout mt-0.5">{person.credentials}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="leading-relaxed text-ink-dim">{person.bio1}</p>
                <p className="mt-4 leading-relaxed text-ink-dim">{person.bio2}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Specializations">
                  {person.tags.map((t) => (
                    <li key={t}>
                      <Tag tone={i === 0 && t.includes("Commander") ? "commander" : "mute"}>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* credentials strip */}
      <Reveal delay={0.2}>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Career highlights">
          {founders.credentialsStrip.map((c) => (
            <li key={c} className="panel card-hover flex items-center gap-3 p-4">
              <span aria-hidden="true" className="font-mono text-signal-400">◆</span>
              <span className="text-sm text-ink-dim">{c}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
