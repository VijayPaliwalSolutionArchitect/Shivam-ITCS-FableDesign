import { techStack } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";

export function TechStack() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="stack-title">
      <SectionHeader
        id="stack-title"
        eyebrow={techStack.eyebrow}
        title={<span className="text-gradient">{techStack.title}</span>}
        body={techStack.body}
      />

      {/* Stack as glowing system buses */}
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {techStack.groups.map((g, gi) => (
          <Reveal key={g.name} delay={(gi % 2) * 0.08}>
            <div className="glass grad-border relative h-full overflow-hidden rounded-2xl p-6">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl ${
                  g.accent === "commander" ? "bg-commander-500/15" : "bg-signal-500/15"
                }`}
              />
              <div className="relative flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${
                    g.accent === "commander"
                      ? "bg-commander-500 shadow-[0_0_14px_var(--color-commander-500)]"
                      : "bg-signal-500 shadow-[0_0_14px_var(--color-signal-500)]"
                  } animate-node-pulse`}
                />
                <h3 className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink">
                  {g.name}
                </h3>
                <span aria-hidden="true" className="ml-2 h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
              </div>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className={`font-mono rounded-md border px-3 py-1.5 text-[0.78rem] transition-all duration-300 ${
                      g.accent === "commander"
                        ? "border-commander-700/40 bg-commander-900/15 text-commander-200 hover:border-commander-500/70 hover:shadow-[0_0_16px_-4px_var(--color-commander-500)]"
                        : "border-line-strong bg-surface-2/80 text-ink-dim hover:border-signal-600/70 hover:text-signal-300 hover:shadow-[0_0_16px_-4px_var(--color-signal-500)]"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
