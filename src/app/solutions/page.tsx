import type { Metadata } from "next";
import Link from "next/link";
import { solutionsPage } from "@/lib/content/about";
import { Reveal, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Industry Solutions — Healthcare, EduTech, Enterprise, Startups",
  description:
    "Industry-specific AI solutions: HIPAA-compliant healthcare, EduTech platforms, enterprise SaaS modernization, AI-native startups, and multi-vendor e-commerce.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  const s = solutionsPage;
  return (
    <div className="relative z-10">
      <Section className="pb-8 pt-32">
        <SectionHeader eyebrow={s.eyebrow} title={<>{s.title1}<br /><span className="text-signal-400">{s.title2}</span></>} body={s.body} id="solutions-title" />
      </Section>

      <Section className="py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.07}>
              <div id={item.id} className="panel card-hover group flex h-full scroll-mt-24 flex-col p-6">
                <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-surface-2 text-2xl">
                  {item.icon}
                </span>
                <h2 className="font-display mt-4 text-xl font-semibold text-ink">{item.name}</h2>
                <p className="mt-2.5 flex-1 leading-relaxed text-ink-dim">{item.body}</p>
                <Link
                  href="/#contact"
                  className="font-mono mt-5 inline-flex items-center gap-2 text-sm text-signal-300 transition-colors hover:text-signal-200"
                >
                  {item.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          ))}

          {/* sixth cell keeps grid rhythm + carries the footer line */}
          <Reveal delay={0.28}>
            <div className="panel flex h-full flex-col items-center justify-center gap-4 border-dashed p-6 text-center">
              <p className="leading-relaxed text-ink-dim">{s.footer}</p>
              <Link
                href={s.footerCta.href}
                className="font-display rounded-lg border border-signal-600/60 px-5 py-2.5 text-sm font-semibold text-signal-300 transition-colors hover:bg-signal-900/30"
              >
                🚀 {s.footerCta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
