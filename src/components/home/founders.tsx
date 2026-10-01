import Image from "next/image";
import { founders } from "@/lib/content/home";
import { Reveal, Section, SectionHeader, Tag } from "@/components/ui";
import { TiltCard } from "@/components/fx";

const AVATARS: Record<string, { src: string; tone: string }> = {
  VP: { src: "/team/vp.jpg", tone: "commander" },
  AP: { src: "/team/ap.jpg", tone: "signal" },
};

export function Founders() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="founders-title">
      <SectionHeader id="founders-title" eyebrow={founders.eyebrow} title={founders.title} />
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-dim">{founders.subtitle}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {founders.people.map((person, i) => {
          const av = AVATARS[person.initials];
          return (
            <Reveal key={person.name} delay={i * 0.1}>
              <TiltCard max={4}>
                <div className="glass grad-border h-full overflow-hidden rounded-3xl">
                  {/* header: avatar plate + role */}
                  <div className="relative flex items-center gap-5 border-b border-line/70 bg-surface-1/60 p-6">
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full blur-3xl ${
                        av.tone === "commander" ? "bg-commander-500/15" : "bg-signal-500/15"
                      }`}
                    />
                    <span className="relative shrink-0">
                      <Image
                        src={av.src}
                        alt=""
                        width={72}
                        height={72}
                        className="h-[72px] w-[72px] rounded-2xl border border-line-strong object-cover"
                      />
                      <span
                        className={`font-display absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-lg border text-[0.65rem] font-bold ${
                          av.tone === "commander"
                            ? "border-commander-500/60 bg-commander-900/80 text-commander-300"
                            : "border-signal-600/60 bg-signal-900/80 text-signal-300"
                        }`}
                      >
                        {person.initials}
                      </span>
                    </span>
                    <div className="relative">
                      <h3 className="font-display text-2xl font-semibold text-ink">{person.name}</h3>
                      <p className={`font-mono mt-1 text-[0.72rem] uppercase tracking-[0.14em] ${av.tone === "commander" ? "text-commander-300" : "text-signal-300"}`}>
                        {person.role}
                      </p>
                      <p className="readout mt-0.5">{person.credentials}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="leading-relaxed text-ink-dim">{person.bio1}</p>
                    <p className="mt-4 leading-relaxed text-ink-dim">{person.bio2}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Specializations">
                      {person.tags.map((t) => (
                        <li key={t}>
                          <Tag tone={av.tone === "commander" && t.includes("Commander") ? "commander" : "mute"}>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      {/* credentials strip */}
      <Reveal delay={0.2}>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Career highlights">
          {founders.credentialsStrip.map((c) => (
            <li key={c} className="glass card-hover flex items-center gap-3 rounded-xl p-4">
              <span aria-hidden="true" className="font-mono text-signal-400">◆</span>
              <span className="text-sm text-ink-dim">{c}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
