export interface ProcessStep {
  step: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    name: "Define",
    tagline: "Scrutinize goals & eliminate ambiguity",
    description: "We audit your product constraints, user journeys, and technical feasibility before touching code. No speculative features or runaway scope.",
    deliverables: ["Product Specification", "Data Schema Models", "Technical Feasibility Memo"]
  },
  {
    step: "02",
    name: "Architect",
    tagline: "Blueprint systems for velocity & longevity",
    description: "Selecting minimal, resilient stacks. We design database schemas, API contracts, infrastructure boundaries, and security policies.",
    deliverables: ["System Architecture Diagram", "API Contract Spec (OpenAPI)", "Database Entity Diagrams"]
  },
  {
    step: "03",
    name: "Build",
    tagline: "Type-safe engineering with zero shortcuts",
    description: "Production implementation in clean, modular TypeScript. Component-driven interfaces, strict testing, and continuous deployment branches.",
    deliverables: ["Modular React/Native Codebase", "Sub-second API Endpoints", "Staging Preview Environment"]
  },
  {
    step: "04",
    name: "Automate",
    tagline: "Engineer autonomous background loops",
    description: "Connecting webhook triggers, background workers, automated backups, and AI-assisted workflows so operations scale without friction.",
    deliverables: ["Self-Healing Worker Queues", "Webhook Event Relays", "Monitoring & Error Alerts"]
  },
  {
    step: "05",
    name: "Optimize",
    tagline: "Lighthouse 95+, SEO audit, and telemetry",
    description: "Rigorous performance audits, bundle tree-shaking, server-side caching, and schema markup injection ensuring instant indexability.",
    deliverables: ["Lighthouse 95+ Audit Signoff", "Structured Schema Markup", "Documentation & Runbooks"]
  }
];

export const techStackList = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Full-Stack" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "AI & Data" },
  { name: "FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Gemini API", category: "Intelligence" },
  { name: "Tailwind CSS", category: "Styling" }
];
