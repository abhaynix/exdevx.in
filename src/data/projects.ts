export interface ProjectCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client?: string;

  summary: string;
  challenge: string;
  solution: string;
  architecture: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: ProjectCaseStudy[] = [
  {
    slug: "kisanpool",
    title: "KisanPool",
    subtitle: "Decentralized Agricultural Produce Pooling & Price Discovery Platform",
    category: "Web & Mobile Logistics",
    year: "2024",

    summary: "A platform for farming collectives to aggregate harvests and coordinate bulk sales.",
    challenge: "Small farming collectives can face challenges coordinating transport and sales across multiple markets.",
    solution: "Built a produce pooling platform with collection hubs, weight records, SMS notifications and market bidding.",
    architecture: [
      "Vite React PWA with offline caching for rural edge networks",
      "Node.js Express microservices orchestrating regional batch pooling",
      "PostgreSQL with PostGIS extensions for spatial hub optimization",
      "Automated WhatsApp notification pipeline via Twilio/Meta API"
    ],

    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis"],
    liveUrl: "https://kisanpool.in"
  },
  {
    slug: "ssnlc-law-college",
    title: "ssnlc.in Law College Platform",
    subtitle: "High-Traffic Institutional Academic Management & Admissions System",
    category: "Institutional Platform",
    year: "2023 - 2024",
    client: "Shri Shivaji New Law College",

    summary: "An institutional website for syllabus information, online applications, notices and faculty resources.",
    challenge: "The institution needed a way to present academic information and manage online applications and notices.",
    solution: "Designed and deployed an institutional platform with PDF hall ticket generation, application review, and a notice feed.",
    architecture: [
      "Static site generation with incremental ISR revalidation for page delivery",
      "Role-based administrative portal for faculty notices and exam grade submissions",
      "Automated cloud document verification pipeline with watermarking",
      "Responsive layouts for mobile and desktop"
    ],

    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "AWS S3"],
    liveUrl: "https://ssnlc.in"
  },
  {
    slug: "sumit-ubale-portfolio",
    title: "Sumit Ubale Portfolio",
    subtitle: "Fluid Editorial Portfolio & Design Engineering Showcase",
    category: "Design Engineering",
    year: "2024",
    client: "Sumit Ubale (Lead Product Designer)",

    summary: "A portfolio website presenting a product designer’s work and profile.",
    challenge: "The project focused on presenting design work through an editorial layout and responsive interactions.",
    solution: "Built with responsive layouts, motion, self-hosted fonts and SVG graphics.",
    architecture: [
      "Reserved image proportions to reduce layout shifts",
      "Self-hosted typography loaded parallel to first paint without FOIT",
      "Kinetic pointer physics disabled gracefully under prefers-reduced-motion",
      "Clean semantic markup with rich Open Graph preview cards"
    ],

    stack: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vite"],
    liveUrl: "https://sumitubale.com"
  },
  {
    slug: "perpwise-ai",
    title: "PerpWise AI",
    subtitle: "Autonomous Financial Intelligence & Multi-Agent Market Hedging Bot",
    category: "AI & Distributed Systems",
    year: "2024",

    summary: "A quantitative monitoring application that brings together market data and alerts.",
    challenge: "The project combines exchange data feeds with analysis and alerts in one application.",
    solution: "Built a Python FastAPI streaming engine paired with Google Gemini API reasoning agents, Redis time-series caches, and a reactive dashboard updating via WebSockets.",
    architecture: [
      "Gemini API structured JSON schema reasoning for contextual risk reports",
      "Redis Pub/Sub ingestion pipe for exchange order books",
      "Automated alert dispatcher routing critical liquidation warnings to Telegram",
      "Risk filters for mathematical assertions"
    ],

    stack: ["Python", "FastAPI", "Gemini API", "TypeScript", "React", "Redis", "Docker"],
    liveUrl: "https://perpwise.ai"
  }
];
