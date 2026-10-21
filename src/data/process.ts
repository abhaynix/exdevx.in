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
    tagline: "Build and refine the product",
    description: "Production implementation in clean, modular TypeScript. Component-driven interfaces, strict testing, and continuous deployment branches.",
    deliverables: ["Application code", "API integrations", "Preview environment"]
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
    tagline: "Review and maintain",
    description: "We review the finished work, address issues and prepare documentation for handover.",
    deliverables: ["Quality review", "Documentation", "Handover"]
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
