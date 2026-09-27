import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/content/about";
import { Reveal, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog — Agentic AI, LLM Infrastructure & Enterprise Engineering",
  description:
    "Engineering notes from SHIVAM ITCS: Commander Architecture, LLM cost optimization, RAG pipelines, legacy .NET modernization, and enterprise AI governance.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="relative z-10">
      <Section className="pb-8 pt-32">
        <SectionHeader
          eyebrow="Blog"
          title="The Next Enterprise Gold Rush Is Not AI Models — It Is AI Governance"
          id="blog-title"
        />
      </Section>

      <Section className="py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.title} delay={(i % 3) * 0.06}>
              <Link
                href={post.href}
                className="panel card-hover group flex h-full flex-col p-6"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal-300">
                  {post.category}
                </p>
                <h2 className="font-display mt-3 flex-1 text-lg font-semibold leading-snug text-ink group-hover:text-signal-200">
                  {post.title}
                </h2>
                <p className="font-mono mt-4 text-[0.7rem] tracking-[0.1em] text-ink-mute">
                  Read article <span aria-hidden="true">→</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="panel panel-ticks mt-12 p-8">
            <h2 className="font-display text-xl font-semibold text-ink">Frequently Asked Questions.</h2>
            <dl className="mt-6 grid gap-6 lg:grid-cols-2">
              {[
                ["How is SHIVAM ITCS different from a traditional software development agency?", "We're architects-first: two principals with 34 combined years who personally design every system, backed by the Sovereign Commander Architecture for AI workloads."],
                ["What is the Commander Architecture?", "An autonomous multi-agent pipeline where Claude Opus acts as Supreme Commander over locally-run Qwen models via Ollama — achieving 40–70% AI cost reduction."],
                ["How does local caching optimize prompt usage?", "System prompts are cached across thousands of calls, targeting ~90% input cost reduction with prompt cache hit rates."],
                ["What technology stack do you specialize in?", ".NET Core 8/10, Next.js 15, React 19, React Native, PostgreSQL, Azure/AWS, plus Claude, Qwen, Semantic Kernel, and n8n for the AI layer."],
                ["How do you ensure HIPAA compliance and data security in AI systems?", "Compliance is designed in from day one — Iron Dome governance intercepts every request with PII redaction, RBAC, and tenant isolation."],
                ["Can you modernize legacy enterprise .NET applications to cloud-native stacks?", "Yes — 15–20+ zero-disruption migrations from Classic ASP and Web Forms to .NET Core microservices, with zero data loss."],
              ].map(([q, a]) => (
                <div key={q}>
                  <dt className="font-display text-[0.95rem] font-semibold text-ink">{q}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-dim">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
