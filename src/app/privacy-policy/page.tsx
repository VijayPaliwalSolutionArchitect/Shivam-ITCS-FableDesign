import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for shivamitcs.in — how SHIVAM ITCS handles data.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <Section className="relative z-10 pb-24 pt-32">
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Privacy Policy</h1>
      <div className="mt-8 max-w-3xl space-y-5 leading-relaxed text-ink-dim">
        <p>
          SHIVAM ITCS (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates shivamitcs.in. This policy explains
          what information we collect when you use this site and how we use it.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Information we collect</h2>
        <p>
          We collect contact details (name, email) only when you voluntarily reach out through email
          or a project inquiry. This site uses privacy-respecting analytics to understand aggregate
          traffic; no individual profiles are built or sold.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">How we use it</h2>
        <p>
          Contact information is used solely to respond to your inquiry and discuss potential
          engagements. We never share or sell your information to third parties.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Client data during engagements</h2>
        <p>
          For client work, data handling is governed by the specific agreements and compliance
          frameworks of each engagement (including HIPAA where applicable). Systems we build treat
          governance, PII redaction, and tenant isolation as architectural requirements.
        </p>
        <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
        <p>
          Questions about this policy: <a href="mailto:contact@shivamitcs.in" className="text-signal-300 hover:text-signal-200">contact@shivamitcs.in</a>.
        </p>
      </div>
    </Section>
  );
}
