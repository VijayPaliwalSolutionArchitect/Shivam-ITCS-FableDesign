export const aboutPage = {
  meta: "Est. 2011 · Nathdwara, India · Global Delivery",
  title1: "Intelligence",
  title2: "That Ships.",
  intro:
    "For over 18 years, SHIVAM ITCS has designed, built, and deployed enterprise systems that real companies run their businesses on — from legacy .NET platforms to multi-agent AI infrastructure. We do not sell PowerPoints. We ship production code.",
  stats: [
    { value: "2011", label: "Year Founded" },
    { value: "18+", label: "Years in Production" },
    { value: "21+", label: "Countries Served" },
    { value: "50+", label: "Technologies Shipped" },
  ],
  founders: [
    {
      initials: "VP",
      name: "Vijay Paliwal",
      role: "Founder & CEO · Lead AI Architect",
      badges: ["Employee of the Quarter — HiveGPT Inc., USA", "Employee of the Quarter — Social27, Seattle"],
      headline: "The engineer who bridges 20-year-old .NET monoliths with Claude, Qwen, and multi-agent AI — and makes both sides work.",
      bio1: "Vijay is not a consultant who talks about AI. He is an architect who has designed and shipped AI systems at production scale — from the generative AI marketing platform at HiveGPT (USA) to the AI-powered global event infrastructure at Social27 (Seattle), serving enterprise clients across 21+ countries.",
      bio2: "His signature contribution is hybrid LLM architecture: orchestrating Claude Opus as a \"Supreme Commander\" while routing high-volume tasks to locally-run Qwen models via Ollama. This architecture has demonstrated up to 90% reduction in AI API costs without compromising output quality.",
      credentials: ["University Topper", "MCA + Double Masters", "18+ Yrs Production", "Microsoft Certified"],
    },
    {
      initials: "AP",
      name: "Ajay Paliwal",
      role: "CTO · Principal Engineer",
      badges: ["15-20+ Platforms Modernised end-to-end", "SaaS Architect — Social27, HiveGPT, Clearly"],
      headline: "The architect who turns complex business workflows into production-grade SaaS platforms.",
      bio1: "Ajay Paliwal is a Principal Engineer and Solution Architect with 17+ years of delivery across healthcare, logistics, FinTech, and AI-driven SaaS. At Social27 (USA), he architected a multi-tenant B2B platform supporting global events. At HiveGPT (USA), he built the LLM orchestration, RAG pipeline, and vector DB infrastructure.",
      bio2: "His technical depth spans the full stack: .NET Core 6–10, FastAPI, Next.js, Angular 10–20, React 19, React Native, Azure, AWS, PostgreSQL, MongoDB, and Kubernetes. He is known specifically for zero-disruption legacy modernization—converting legacy monoliths into cloud-native microservices without downtime.",
      credentials: ["MCA + BSc Honours", "17+ Yrs Delivery", "Microsoft Certified", "Angular Expert v10-20"],
    },
  ],
  whoWeAre: {
    heading: "Who We Are",
    paragraphs: [
      "SHIVAM ITCS is a full-stack software engineering and AI consultancy headquartered in Nathdwara, Rajasthan, India — and operating globally across the US, UK, and Australia since 2011.",
      "We are not a generalist outsourcing firm. We are a specialist engineering studio built around two principals with a combined 34+ years of production-grade enterprise experience: Vijay Paliwal (Founder, AI Architecture Lead) and Ajay Paliwal (Principal Engineer & Solution Architect).",
      "Everything we build — from a React Native mobile app to an autonomous multi-agent AI pipeline — is designed by engineers who have solved that exact problem before, at production scale, for real clients.",
    ],
  },
  storySections: [
    {
      heading: "Where We Come From",
      title: "A decade of learning how enterprise software actually fails.",
      paragraphs: [
        "Before AI became a buzzword, we built our foundation on rescue missions. We know what code looks like when it runs under enterprise load.",
        "We started in 2011 as a .NET and web development consultancy serving enterprise clients across India. Over the next decade, we worked across every major category of business software: hospital management systems, school ERP platforms, inventory and warehouse SaaS, multi-tenant CRMs, e-commerce platforms, and government-facing tools.",
        "That decade taught us how enterprise software actually fails — not in the code, but in the architecture decisions made early that nobody dares revisit later. Slow stored procedures no one wants to touch. Database schemas that made sense in 2010 but are now choking under load. Monolithic ASP.NET Web Forms applications that every new dev is scared to open.",
        "We became the team that fixes those problems. Not by rewriting everything from scratch, but by modernizing carefully — preserving data integrity, migrating incrementally, and leaving teams with a codebase they can actually work in.",
      ],
    },
    {
      heading: "What Expanded Our World",
      paragraphs: [
        "Between 2018 and 2024, both Vijay and Ajay took on senior engineering roles at US-based technology companies — Social27 (Seattle), HiveGPT Inc. (USA), and Clearly Inventory (USA). These weren't advisory roles. We were the principal architects and engineers responsible for platform architecture, production deployments, and team leadership.",
        "At Social27, Ajay architected a multi-tenant B2B SaaS platform supporting large-scale virtual and hybrid events with thousands of concurrent global attendees — built on .NET Core, Angular, Azure MSSQL, and PostgreSQL, with real-time data pipelines, AI-powered matchmaking, and full CI/CD. He led the modernization of legacy modules into cloud-native microservices on Azure and AWS.",
        "At HiveGPT, both Vijay and Ajay worked on AI-augmented SaaS infrastructure: LLM orchestration, RAG pipelines, vector databases, multi-tenant architecture, and React/Next.js dashboards for enterprise AI workloads.",
        "These experiences gave us something most India-based consultancies don't have: deep, first-hand knowledge of what it takes to engineer software that US enterprise clients actually run their businesses on.",
      ],
    },
    {
      heading: "What We Do Now",
      paragraphs: [
        "In 2025–2026, we brought everything back under SHIVAM ITCS — combining our enterprise engineering depth with modern AI infrastructure to offer something the market is genuinely missing: a full-stack studio that can handle the entire journey from legacy rescue to AI-native product.",
        "We work across nine domains: AI infrastructure, multi-tenant SaaS, HealthTech (HIPAA-compliant), EduTech, inventory/warehouse platforms, legacy modernization, mobile apps (React Native/MAUI), DevSecOps, and enterprise agentic SaaS.",
        "Our flagship innovation — the Commander Architecture — is an autonomous multi-agent pipeline where Claude Opus acts as a Supreme Commander over locally-running Qwen models, achieving 40–70% AI cost reduction versus pure cloud inference. It's the clearest expression of our core belief: intelligent architecture saves money and AI should serve your business, not drain it.",
      ],
    },
  ],
  domainsShipped: {
    heading: "9 Domains Shipped",
    items: [
      "AI Infrastructure",
      "Multi-Tenant SaaS",
      "HealthTech (HIPAA)",
      "EduTech Platforms",
      "Inventory & WMS",
      "Legacy Rescue",
      "Mobile Applications",
      "DevSecOps",
      "Agentic SaaS",
    ],
  },
  differentiators: {
    heading: "Why We're Different",
    items: [
      { title: "We have the scar tissue", body: "We've inherited bad codebases, rescued failed projects, and migrated live databases without losing a single record. That experience is in our hands before we write the first line of your project." },
      { title: "We own the full stack", body: "One team. PostgreSQL schema to Next.js 15 frontend to React Native mobile app to AI agent pipeline. No coordination overhead between backend, frontend, mobile, and AI teams — because it's all the same team." },
      { title: "We understand both markets", body: "We've shipped enterprise SaaS for US companies (Social27, HiveGPT, Clearly Inventory), built India-first platforms (Hospital OS), and served clients in Australia. We know how to scope, price, communicate, and deliver for different expectations." },
      { title: "We're not AI-first, we're quality-first", body: "AI is a tool, not a personality. When it cuts your costs and automates your workflows, we use it. When a well-designed PostgreSQL schema and a clean .NET Core API is what the job needs, that's what we build. We don't add AI to sound current. We add it when it makes your product better." },
      { title: "We're available, and we're serious", body: "SHIVAM ITCS is available for new projects — whether that's a long-term product build, a rescue engagement, an AI infrastructure audit, or a mobile app from scratch. When you engage us, you work directly with Vijay and Ajay, not with a project manager passing instructions to a junior team." },
    ],
  },
  numbers: {
    heading: "The Numbers That Matter",
    items: [
      { value: "18+", label: "Years Experience", note: "Vijay's engineering" },
      { value: "16+", label: "Years Experience", note: "Ajay's engineering" },
      { value: "15-20+", label: "Platforms Rescue", note: "Legacy platforms modernized" },
      { value: "9", label: "Domains Shipped", note: "Production verticals" },
      { value: "34", label: "Combined Years", note: "Of engineering experience" },
    ],
  },
  philosophy: {
    heading: "Our Tech Philosophy in Three Lines",
    line: "Design the database right the first time. Build APIs that won't need rewriting. Add AI where it creates structural advantage — not where it creates demo appeal.",
  },
  timeline: {
    heading: "Our Story",
    title: "Built from the ground up. Literally.",
    intro:
      "SHIVAM ITCS was founded in Nathdwara, Rajasthan in 2011 — not in a startup hub, not with venture funding, not with an existing client base. It was founded with one founder, one conviction, and 18 years of accumulated technical hunger.",
    intro2: "Vijay Paliwal had spent years building production systems for US companies, learning that the gap between good engineers and great ones is the ability to see the business problem behind the technical problem. That insight became our founding principle: technology is never the deliverable. Results are.",
    eras: [
      {
        period: "2008–2011",
        title: "Foundation Years",
        body: "Vijay Paliwal builds enterprise-grade .NET and web systems for US-based clients. University topper, MCA, double Masters.",
        sub: [{ title: "SHIVAM ITCS Founded", body: "Registered in Nathdwara, Rajasthan. Initial focus: custom enterprise software for Indian and international SMEs." }],
      },
      {
        period: "2012–2018",
        title: "Enterprise Growth",
        body: "Delivery partnerships with Clearly Inventory (USA) and Design Com Technologies (Australia). Ajay Paliwal joins as CTO. 15–20 legacy platforms modernized.",
        sub: [],
      },
      {
        period: "2018–2022",
        title: "US Enterprise",
        body: "HiveGPT Inc. (USA) — Lead AI Architect. Social27 (Seattle, USA) — Sr. Architect. Multiple 'Employee of the Quarter' awards.",
        sub: [],
      },
      {
        period: "2023–Present",
        title: "AI-Native Era",
        body: "Commander Architecture, VectorLess RAG, hybrid LLM cost optimisation (90% API cost reduction). Repositioned as an AI Infrastructure firm.",
        sub: [],
      },
    ],
    quote: "We do not add AI to your product. We rebuild the infrastructure so AI becomes the product.",
    quoteSource: "— Vijay Paliwal, Founder",
  },
  principles: {
    heading: "Proof Over Promise",
    items: [
      { icon: "🎯", title: "Proof Over Promise", body: "Every claim we make is backed by a named client, a shipped system, or a measurable outcome. Our proof is in production." },
      { icon: "⚙️", title: "Architecture First", body: "Before a single line of code is written, the architecture is questioned. We prevent projects from failing due to wrong foundational decisions." },
      { icon: "🔬", title: "Brutal Honesty", body: "We tell clients what will not work as clearly as what will. It is the minimum standard for serious engineering." },
    ],
  },
  namedProof: {
    items: [
      {
        org: "Social27, Inc · Seattle, USA",
        title: "AI-Powered Global Event Platform",
        body: "Multi-tenant SaaS for global events. Real-time networking, AI matchmaking, ChatGPT event bot. Used across 21+ countries.",
        metrics: [{ value: "21+", label: "Countries" }, { value: "EotQ", label: "Award" }],
      },
      {
        org: "HiveGPT, Inc · USA",
        title: "Generative AI Marketing Platform",
        body: "Lead AI Architect. Multi-agent campaign automation. Content creation, landing pages, lead scoring, and event management.",
        metrics: [{ value: "90%", label: "API Cost Cut" }],
      },
      {
        org: "Clearly Inventory, Inc · USA",
        title: "Warehouse Intelligence Platform",
        body: "Cloud-native SaaS for multi-location inventory. Real-time stock sync, barcode workflows, ElasticSearch lookup.",
        metrics: [{ value: "<1s", label: "Response" }, { value: "6yr", label: "Partnership" }],
      },
      {
        org: "SHIVAM ITCS · Own IP",
        title: "Hospital OS — HIPAA Compliant",
        body: "Multi-role hospital management. Patient records, pharmacy, AI Clinical Copilot. Built to HIPAA and FHIR standards.",
        metrics: [{ value: "HIPAA", label: "Compliant" }, { value: "AI", label: "Copilot" }],
      },
    ],
    own: [
      { title: "VectorLess RAG Intelligence", body: "Deterministic retrieval via TOC parsing. Zero hallucinations. Exact citation mapping. Faster than standard vector RAG.", metrics: [{ value: "0", label: "Hallucinations" }, { value: "RAG+", label: "Proprietary" }] },
      { title: "Commander Architecture", body: "Hybrid LLM cost optimisation. Claude Opus (Commander) + Qwen (Local via Ollama). 90% cost reduction demonstrated.", metrics: [{ value: "Cost Cut", label: "Multi" }, { value: "Agent", label: "" }] },
    ],
    ownIp: {
      heading: "Own IP Products",
      items: [
        { icon: "🏥", title: "Hospital OS", body: "Full-stack hospital platform. Multi-role. AI Copilot, pharmacy, labs, billing. Built for global hospitals.", badge: "Live Product" },
        { icon: "🎓", title: "School OS + IELTS Prep", body: "Full school LMS with AI-powered IELTS preparation module. Multi-tenant, scalable for international markets.", badge: "In Development" },
        { icon: "🛒", title: "AI E-Commerce", body: "Multi-tenant storefront with voice/chat/image search, intelligent recommendations, real-time analytics.", badge: "" },
        { icon: "🧠", title: "SHIVAM ITCS Hub", body: "VectorLess RAG document intelligence. Zero hallucinations, exact citations, enterprise-grade reliability.", badge: "" },
        { icon: "🎬", title: "AI Video Factory", body: "Autonomous AI video production pipeline. Idea generation, script expansion, video/audio generation.", badge: "" },
      ],
    },
  },
  whyShivam: {
    heading: "Why SHIVAM ITCS",
    title: "Talk to the architect",
    intro: "The person on the discovery call is the person who designs the system. Vijay and Ajay personally engage every client.",
    items: [
      { icon: "💰", title: "AI Cost Optimisation", body: "Our hybrid LLM architecture has delivered up to 90% AI API cost reduction in production." },
      { icon: "🔄", title: "Zero-disruption modernization", body: "We've modernized 15–20+ legacy platforms to cloud-native microservices without losing data or requiring full rewrites." },
      { icon: "🛡", title: "Regulated industry experience", body: "Healthcare (HIPAA, FHIR), FinTech, and government systems. Compliance is designed in from day one." },
      { icon: "📍", title: "Globally-calibrated", body: "Working with US/Australian companies since 2008. International delivery standards, time-zone discipline." },
      { icon: "🚀", title: "We ship.", body: "'Intelligence That Ships' isn't just marketing. Both founders have Employee of the Quarter awards from US companies." },
    ],
  },
  cta: {
    heading: "Ready to Build Together?",
    body: "Senior engineers, not account managers. Your project gets the same attention as our own products.",
    cta: { label: "Start a Conversation", href: "mailto:contact@shivamitcs.in" },
    contact: "contact@shivamitcs.in",
  },
};

export const solutionsPage = {
  eyebrow: "Solutions",
  title1: "Industry-Specific",
  title2: "AI Solutions",
  body: "We don't build generic software. Every solution is designed around the specific workflows, compliance requirements, and user realities of your industry.",
  items: [
    { icon: "🏥", id: "healthcare", name: "Healthcare", body: "HIPAA-compliant Hospital OS, Clinic CRM, AI clinical workflows.", cta: "Explore Solution" },
    { icon: "🎓", id: "education", name: "Education", body: "School OS, IELTS AI prep, adaptive learning, exam platforms.", cta: "Explore Solution" },
    { icon: "🏢", id: "enterprise", name: "Enterprise SaaS", body: "Legacy .NET modernization, agentic AI augmentation, cost reduction.", cta: "Explore Solution" },
    { icon: "🚀", id: "startups", name: "Startups", body: "MVP to production, AI-native from day one, fractional senior team.", cta: "Explore Solution" },
    { icon: "🛒", id: "ecommerce", name: "E-Commerce", body: "Multi-vendor, voice commerce AI, Level 4 autonomous support agents.", cta: "Explore Solution" },
  ],
  footer: "Don't see your industry? We've likely built for it — or can.",
  footerCta: { label: "Discuss Your Industry", href: "mailto:contact@shivamitcs.in" },
};

export const blogPosts = [
  { title: "Commander Architecture: How We Cut AI Costs by 70% in Production", category: "Commander Architecture", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "Native AOT in .NET 10: Reducing Server Cold Starts and Memory Footprint for AI G", category: "Microsoft .NET", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "Cost-Optimized LLM Routing: Intelligently Dispatching Tasks Between Local and Cloud", category: "AI Infrastructure", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "The CIO's Guide to AI Agent Governance", category: "Platform Governance", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "Modernize Legacy .NET Applications with Agentic AI: Zero-Rewrite", category: "Enterprise Architecture", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "RAG with pgVector: Beyond LLM Hallucinations", category: "AI Engineering", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "Local LLM Inference with Ollama and Qwen: An Enterprise Deployment Guide", category: "Cloud AI", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "6 Stages of Agentic Execution for Enterprise AI", category: "Agentic AI", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "Semantic Kernel vs LangChain: Which Framework Wins for Enterprise .NET Teams", category: "AI Engineering", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "FinOps for AI: Master LLM Infrastructure Cost Optimization", category: "FinOps & Platforms", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "How to Build HIPAA-Compliant AI Agents: A Governance Checklist for Healthcare CTOs", category: "HealthTech", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "The 5 Patterns of Multi-Agent Orchestration: Sequential, Parallel, Hierarchical", category: "Multi-Agent", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "GEO vs SEO: Why Your Brand Needs Generative Engine Optimization in 2026", category: "Enterprise AI", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "MCP Protocol Explained: Building the Agent Internet for Enterprise", category: "Agentic AI", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
  { title: "How to Reduce OpenAI API Costs by 70% Without Downgrading Your Models", category: "AI APIs", href: "/blog/building-hipaa-compliant-ai-agents-a-governance-checklist-for-ctos" },
];
