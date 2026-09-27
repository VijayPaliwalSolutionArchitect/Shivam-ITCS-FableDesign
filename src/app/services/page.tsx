import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@/lib/content/home";
import { Card, NodeGlyph, Reveal, Section, SectionHeader, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services — AI Systems, SaaS, HealthTech, EduTech",
  description:
    "9 domains, one studio: AI infrastructure & LLM ops, multi-tenant SaaS, HealthTech, EduTech, inventory SaaS, legacy modernization, mobile, DevSecOps, and agentic SaaS.",
  alternates: { canonical: "/services" },
};

const serviceBodies: Record<string, { body: string; learnMore: string }> = {
  "ai-infrastructure": {
    body: "Hybrid LLM routing, Commander Architecture, RAG pipelines, local Ollama inference. 40–70% AI cost reduction — structural, not cosmetic.",
    learnMore: "Explore the Architecture",
  },
  "saas-platforms": {
    body: "End-to-end SaaS product development — tenant isolation, billing, RBAC, white-label support, scalable microservice backends.",
    learnMore: "See SaaS case studies",
  },
  healthtech: {
    body: "HIPAA-compliant Hospital OS, Clinic CRM, patient management, appointment systems, and AI-assisted diagnostics dashboards.",
    learnMore: "Explore the solution",
  },
  edutech: {
    body: "School OS for institutional management, AI-powered IELTS prep, adaptive learning engines, and student performance analytics.",
    learnMore: "Explore the solution",
  },
  inventory: {
    body: "Real-time inventory management, warehouse ops, supply chain visibility, RFID integration, AI-driven demand forecasting.",
    learnMore: "See WMS case studies",
  },
  legacy: {
    body: "Transform thick-client .NET enterprise apps into cloud-native, AI-augmented agentic systems. Zero-disruption migration.",
    learnMore: "How we modernize",
  },
  mobile: {
    body: "Cross-platform React Native and Flutter apps with real-time features, offline-first architecture, and native performance.",
    learnMore: "See mobile case studies",
  },
  devsecops: {
    body: "AI-native DevSecOps pipelines, autonomous vulnerability analysis, post-quantum cryptography planning, agentic CI/CD.",
    learnMore: "Explore the architecture",
  },
  "agentic-saas": {
    body: "Design and ship agent-native SaaS from scratch — MCP-enabled, multi-agent, with enterprise memory and governance layers.",
    learnMore: "Explore the architecture",
  },
};

const serviceCtaHref: Record<string, string> = {
  "ai-infrastructure": "/architecture",
  devsecops: "/architecture",
  "agentic-saas": "/architecture",
  healthtech: "/solutions#healthcare",
  edutech: "/solutions#education",
  "saas-platforms": "/work",
  inventory: "/work",
  mobile: "/work",
  legacy: "/services#legacy",
};

export default function ServicesPage() {
  return (
    <div className="relative z-10">
      <Section className="pb-8 pt-32">
        <SectionHeader eyebrow={domains.eyebrow} title={domains.title} body={domains.body} id="services-title" />
        <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-base/70 px-4 py-1.5 backdrop-blur-sm">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok animate-node-pulse" />
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-dim">
            SYSTEM_ARCHITECTURE_V2.4 · NODE_SECURE
          </span>
        </p>
      </Section>

      <Section className="py-12">
        <div className="bg-node-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {domains.items.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.07}>
              <Card className="flex h-full flex-col">
                <div id={d.id} className="scroll-mt-24" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="text-2xl">{d.icon}</span>
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink-mute">
                      {d.num}
                    </span>
                  </div>
                  <NodeGlyph className="card-node shrink-0" size={34} />
                </div>
                <h2 className="font-display mt-4 text-xl font-semibold text-ink">{d.title}</h2>
                <p className="mt-2.5 flex-1 leading-relaxed text-ink-dim">
                  {serviceBodies[d.id]?.body ?? d.body}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {d.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
                <Link
                  href={serviceCtaHref[d.id] ?? "/work"}
                  className="font-mono mt-5 inline-flex items-center gap-2 text-sm text-signal-300 transition-colors hover:text-signal-200"
                >
                  {serviceBodies[d.id]?.learnMore ?? "Learn more"} <span aria-hidden="true">→</span>
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="panel panel-ticks mt-12 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-lg text-ink-dim">Not sure which service fits? Let&rsquo;s talk.</p>
            <Link
              href="/#contact"
              className="font-display rounded-lg bg-signal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-signal-400"
            >
              🚀 Start a Free Consultation
            </Link>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
