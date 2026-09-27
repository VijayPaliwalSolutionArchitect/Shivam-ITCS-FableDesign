import { techStack } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";

export function TechStack() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="stack-title">
      <SectionHeader
        id="stack-title"
        eyebrow={techStack.eyebrow}
        title={techStack.title}
        body={techStack.body}
      />

      {/* Stack rendered as system buses — the node motif at 2D scale */}
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {techStack.groups.map((g, gi) => (
          <Reveal key={g.name} delay={(gi % 2) * 0.08}>
            <div className="panel panel-ticks h-full p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${g.accent === "commander" ? "bg-commander-500 shadow-[0_0_12px_var(--color-commander-500)]" : "bg-signal-500 shadow-[0_0_12px_var(--color-signal-500)]"}`}
                />
                <h3 className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink">
                  {g.name}
                </h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className={`font-mono rounded-md border px-3 py-1.5 text-[0.78rem] transition-colors ${
                      g.accent === "commander"
                        ? "border-commander-700/40 bg-commander-900/15 text-commander-200 hover:border-commander-500/60"
                        : "border-line-strong bg-surface-2 text-ink-dim hover:border-signal-600/60 hover:text-signal-300"
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
