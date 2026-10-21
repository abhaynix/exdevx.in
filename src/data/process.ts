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
    name: "Discover",
    tagline: "Understand the problem before the product",
    description: "We get clear on your goals, users, requirements and constraints before choosing a direction.",
    deliverables: ["Project scope", "User needs", "Technical constraints"]
  },
  {
    step: "02",
    name: "Design",
    tagline: "Shape the experience and the system",
    description: "We map the product experience and define an architecture that fits the work and can be maintained.",
    deliverables: ["Experience direction", "Interface designs", "System plan"]
  },
  {
    step: "03",
    name: "Build",
    tagline: "Implement, test and integrate",
    description: "We build the product in focused increments, connect its services and validate the details as we go.",
    deliverables: ["Product implementation", "Connected services", "Reviewable previews"]
  },
  {
    step: "04",
    name: "Launch",
    tagline: "Deploy, validate and support",
    description: "We prepare the release, check the live product and provide a clear handover for what comes next.",
    deliverables: ["Production deployment", "Launch checks", "Documentation and handover"]
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
