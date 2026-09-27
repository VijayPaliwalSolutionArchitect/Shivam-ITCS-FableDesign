export const site = {
  name: "SHIVAM ITCS",
  tagline: "Intelligence That Ships",
  description:
    "We cut AI & cloud costs by 40–70% using Commander Architecture — autonomous multi-agent systems built for enterprise. 18+ years. India & Global.",
  url: "https://shivamitcs.in",
  altUrl: "https://shivamitconsultancy.com",
  email: "contact@shivamitcs.in",
  supportEmail: "support@shivamitcs.in",
  founded: "2011",
  location: "Nathdwara, Rajasthan, India",
  copyright: "© 2026 SHIVAM ITCS · Vijay Paliwal · Nathdwara, Rajasthan, India",
  availability: "Available for new projects",
} as const;

export type NavChild = { label: string; href: string; hint?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Automation", href: "/services#ai-automation", hint: "Commander · n8n · RPA" },
      { label: "AI Infrastructure & LLM Ops", href: "/services#ai-infrastructure", hint: "Hybrid routing · RAG" },
      { label: "Multi-Tenant SaaS", href: "/services#saas-platforms", hint: "Next.js · .NET · Stripe" },
      { label: "HealthTech Products", href: "/services#healthtech", hint: "HIPAA · Hospital OS" },
      { label: "EduTech Platforms", href: "/services#edutech", hint: "School OS · IELTS AI" },
      { label: "Inventory & Warehouse SaaS", href: "/services#inventory", hint: "RFID · Forecasting" },
      { label: "Legacy Modernization", href: "/services#legacy", hint: ".NET → Cloud · Semantic Kernel" },
      { label: "Mobile Applications", href: "/services#mobile", hint: "React Native · Flutter" },
      { label: "Agentic Security & DevOps", href: "/services#devsecops", hint: "DevSecOps · AgentOps" },
      { label: "Enterprise Agentic SaaS", href: "/services#agentic-saas", hint: "MCP · Governance" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Healthcare", href: "/solutions#healthcare", hint: "HIPAA-compliant systems" },
      { label: "Education", href: "/solutions#education", hint: "School OS · IELTS AI" },
      { label: "Enterprise SaaS", href: "/solutions#enterprise", hint: "Legacy → Agentic" },
      { label: "Startups", href: "/solutions#startups", hint: "AI-native MVP" },
      { label: "E-Commerce", href: "/solutions#ecommerce", hint: "Voice commerce AI" },
    ],
  },
  {
    label: "Architecture Flagship",
    href: "/architecture",
    children: [
      { label: "Sovereign Architecture (SCA)", href: "/architecture", hint: "7-layer governance stack" },
      { label: "Commander Architecture", href: "/architecture#commander", hint: "Multi-agent AI pipeline" },
    ],
  },
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Commander Architecture", href: "/work#commander-architecture", hint: "Autonomous pipeline" },
      { label: "Content Automation Studio", href: "/work#content-automation", hint: "RPA & AI publishing" },
      { label: "HelpingHand Enterprise", href: "/work#helpinghand", hint: "3D service marketplace" },
      { label: "Hospital OS", href: "/work#hospital-os", hint: "HIPAA healthtech" },
      { label: "School OS", href: "/work#school-os", hint: "Adaptive EduTech" },
      { label: "HiveGPT", href: "/work#hivegpt", hint: "AI campaign intelligence" },
      { label: "Social27", href: "/work#social27", hint: "Enterprise events SaaS" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const footer = {
  blurb: "AI Infrastructure & Agentic Systems. India-based. World-class.",
  domains: ["shivamitcs.in", "shivamitconsultancy.com"],
  columns: [
    {
      heading: "Services",
      links: [
        { label: "AI Automation", href: "/services#ai-automation" },
        { label: "AI Infrastructure & LLM Ops", href: "/services#ai-infrastructure" },
        { label: "Multi-Tenant SaaS", href: "/services#saas-platforms" },
        { label: "HealthTech Products", href: "/services#healthtech" },
        { label: "EduTech Platforms", href: "/services#edutech" },
        { label: "Inventory & Warehouse SaaS", href: "/services#inventory" },
        { label: "Legacy Modernization", href: "/services#legacy" },
        { label: "Mobile Applications", href: "/services#mobile" },
        { label: "Agentic Security & DevOps", href: "/services#devsecops" },
        { label: "Enterprise Agentic SaaS", href: "/services#agentic-saas" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Healthcare", href: "/solutions#healthcare" },
        { label: "Education", href: "/solutions#education" },
        { label: "Enterprise SaaS", href: "/solutions#enterprise" },
        { label: "Startups", href: "/solutions#startups" },
        { label: "E-Commerce", href: "/solutions#ecommerce" },
      ],
    },
    {
      heading: "Work",
      links: [
        { label: "Commander Architecture", href: "/work#commander-architecture" },
        { label: "Content Automation Studio", href: "/work#content-automation" },
        { label: "HelpingHand Enterprise", href: "/work#helpinghand" },
        { label: "Hospital OS", href: "/work#hospital-os" },
        { label: "School OS", href: "/work#school-os" },
        { label: "HiveGPT", href: "/work#hivegpt" },
        { label: "Social27", href: "/work#social27" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Work", href: "/work" },
        { label: "Contact", href: "/#contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Use", href: "/terms-of-use" },
      ],
    },
  ],
} as const;
