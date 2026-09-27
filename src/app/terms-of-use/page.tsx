import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for shivamitcs.in.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: true, follow: true },
};

export default function TermsOfUse() {
  return (
    <Section className="relative z-10 pb-24 pt-32">
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Terms of Use</h1>
      <div className="mt-8 max-w-3xl space-y-5 leading-relaxed text-ink-dim">
        <p>
          By using shivamitcs.in you agree to these terms. The site content — including descriptions
          of the Sovereign Commander Architecture and case study material — is provided for
          informational purposes and reflects real, shipped work.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Intellectual property</h2>
        <p>
          Site content, branding, and described proprietary architectures remain the property of
          SHIVAM ITCS unless covered by a separate client agreement.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">No warranty</h2>
        <p>
          Information on this site is provided &ldquo;as is&rdquo;. Engagements are governed by their
          own signed agreements, which take precedence over any statement made here.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
        <p>
          <a href="mailto:contact@shivamitcs.in" className="text-signal-300 hover:text-signal-200">contact@shivamitcs.in</a> · Nathdwara, Rajasthan, India.
        </p>
      </div>
    </Section>
  );
}
