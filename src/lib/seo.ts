import { SITE_URL } from "./utils";

/**
 * Structured data — preserved from the indexed production site
 * (shivamitcs.in) so search equity is not broken by the rebuild.
 */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "SHIVAM ITCS",
    alternateName: ["Shivam IT Consulting Services", "shivamitconsultancy.com"],
    url: SITE_URL,
    sameAs: ["https://shivamitconsultancy.com"],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    description:
      "We build autonomous multi-agent AI systems, AI-native SaaS products, and modernize legacy .NET enterprise systems. India-based, world-class.",
    foundingDate: "2011",
    founder: {
      "@type": "Person",
      name: "Vijay Paliwal",
      jobTitle: "Founder & AI Architecture Lead",
      alumniOf: ["MCA", "DBMS Masters"],
      knowsAbout: ["AI Infrastructure", "Multi-Agent Systems", "Next.js", ".NET Core", "LLM Optimization"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nathdwara",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    areaServed: ["IN", "US", "GB", "AU"],
    email: "support@shivamitcs.in",
    knowsAbout: [
      "Agentic AI Systems",
      "Multi-Agent Orchestration",
      "Commander Architecture",
      "LLM Cost Optimization",
      "Legacy .NET Modernization",
      "HealthTech Software",
      "EduTech Platforms",
      "React Native Mobile Development",
      "Next.js SaaS Development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI & Software Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Infrastructure & LLM Ops",
            description:
              "Hybrid LLM routing, Commander Architecture, RAG pipelines, local Ollama inference. 40–70% AI cost reduction.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Multi-Tenant SaaS Platforms",
            description: "End-to-end SaaS product development — tenant isolation, billing, RBAC, white-label support.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HealthTech Products",
            description: "HIPAA-compliant Hospital OS, Clinic CRM, patient management, AI-assisted diagnostics.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy Modernization",
            description: "Transform thick-client .NET enterprise apps into cloud-native, AI-augmented agentic systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise Agentic SaaS",
            description: "MCP-enabled, multi-agent SaaS with enterprise memory and governance layers built in.",
          },
        },
      ],
    },
  };
}

export function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "SHIVAM ITCS",
    description:
      "We build autonomous multi-agent AI systems, AI-native SaaS products, and modernize legacy .NET enterprise systems. India-based, world-class.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
