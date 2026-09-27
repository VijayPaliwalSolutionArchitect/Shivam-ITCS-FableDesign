import { saasOverpay } from "@/lib/content/home";
import { Reveal, Section, SectionHeader } from "@/components/ui";

export function SaasOverpay() {
  return (
    <Section className="py-16 sm:py-24" labelledBy="overpay-title">
      <SectionHeader id="overpay-title" eyebrow={saasOverpay.eyebrow} title={saasOverpay.title} />

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {/* Problems */}
        <Reveal>
          <div className="panel panel-ticks h-full border-l-2 !border-l-critical/70 p-7">
            <p className="text-system-label !text-critical">
              <span aria-hidden="true">❌</span> The problem
            </p>
            <ul className="mt-5 space-y-4">
              {saasOverpay.problems.map((p) => (
                <li key={p.slice(0, 30)} className="flex gap-3 leading-relaxed text-ink-dim">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-critical/70" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Solutions */}
        <Reveal delay={0.1}>
          <div className="panel panel-ticks h-full border-l-2 !border-l-ok/70 p-7">
            <p className="text-system-label !text-ok">
              <span aria-hidden="true">✅</span> The architecture answer
            </p>
            <ul className="mt-5 space-y-4">
              {saasOverpay.solutions.map((s) => (
                <li key={s.title}>
                  <p className="font-display font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 leading-relaxed text-ink-dim">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="panel panel-ticks mt-8 bg-gradient-to-r from-signal-900/25 via-surface-1 to-commander-900/15 p-7 sm:p-9">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {saasOverpay.guarantee.title}
          </h3>
          <p className="mt-3 max-w-4xl leading-relaxed text-ink-dim">{saasOverpay.guarantee.body}</p>
        </div>
      </Reveal>
    </Section>
  );
}
