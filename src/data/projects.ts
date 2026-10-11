export interface ProjectCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  oneLineOutcome: string;
  summary: string;
  challenge: string;
  solution: string;
  architecture: string[];
  metrics: Array<{ label: string; value: string }>;
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
    client: "Agricultural Cooperative Alliance",
    oneLineOutcome: "Aggregated 12,000+ quintals of produce, saving farmers 22% on transport freight costs.",
    summary: "A digital pooling engine enabling smallholder farming collectives across Maharashtra to aggregate harvest volumes, negotiate institutional bulk rates, and eliminate middleman price manipulation.",
    challenge: "Individual smallholders face prohibitive freight costs when hauling small harvests to urban mandis, leaving them vulnerable to local cartel buyers offering below-market rates.",
    solution: "Engineered a low-latency pooling platform with geo-fenced collection hubs, automated weight escrow logging, SMS notifications for low-connectivity zones, and live market auction bidding.",
    architecture: [
      "Vite React PWA with offline caching for rural edge networks",
      "Node.js Express microservices orchestrating regional batch pooling",
      "PostgreSQL with PostGIS extensions for spatial hub optimization",
      "Automated WhatsApp notification pipeline via Twilio/Meta API"
    ],
    metrics: [
      { label: "Produce Pooled", value: "12,000+ Q" },
      { label: "Freight Cost Saved", value: "22%" },
      { label: "Active Farmers", value: "3,400+" },
      { label: "Avg Dispatch Latency", value: "< 4 hrs" }
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
    oneLineOutcome: "Digitized 100% of admission workflows and slashed server downtime to zero during exam rushes.",
    summary: "Complete digital transformation for one of Maharashtra's premier legal education institutions, managing syllabus catalogs, online application verification, notices, and faculty archives.",
    challenge: "The institution's legacy static portal routinely crashed during annual admission cycles and exam hall ticket distribution, generating hundreds of support calls and paper bottlenecks.",
    solution: "Designed and deployed an edge-cached institutional platform with automated PDF hall ticket generation, multi-stage application review, and a sub-50ms static notice broadcast feed.",
    architecture: [
      "Static site generation with incremental ISR revalidation for instant page loads",
      "Role-based administrative portal for faculty notices and exam grade submissions",
      "Automated cloud document verification pipeline with watermarking",
      "Lighthouse 99 performance score across mobile and desktop devices"
    ],
    metrics: [
      { label: "Admission Workflows", value: "100% Digital" },
      { label: "Downtime During Peaks", value: "0 mins" },
      { label: "Lighthouse Score", value: "99 / 100" },
      { label: "Student Inquiries Served", value: "25,000+" }
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
    oneLineOutcome: "Featured in creative developer digests; achieved 100/100 Lighthouse performance score.",
    summary: "A high-fidelity bespoke design engineer portfolio highlighting interactive micro-interactions, responsive typography math, and strict typographic rhythm without frame drops.",
    challenge: "Achieving complex editorial physics and smooth kinetic reveals without inflating the JS bundle size or introducing layout shifts on low-power mobile devices.",
    solution: "Implemented CSS hardware-accelerated transforms, minimal lightweight motion controllers, self-hosted web fonts with swap strategies, and optimized SVG vector rendering.",
    architecture: [
      "Zero-runtime layout shift (CLS: 0.000) through aspect-ratio reservations",
      "Self-hosted typography loaded parallel to first paint without FOIT",
      "Kinetic pointer physics disabled gracefully under prefers-reduced-motion",
      "Clean semantic markup with rich Open Graph preview cards"
    ],
    metrics: [
      { label: "Lighthouse Score", value: "100 / 100" },
      { label: "Cumulative Layout Shift", value: "0.000" },
      { label: "First Contentful Paint", value: "0.4s" },
      { label: "Total Bundle Size", value: "< 45 KB" }
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
    client: "Quantitative Trading Syndicate",
    oneLineOutcome: "Processed 850,000+ data ticks daily with sub-800ms agent inference and risk alerts.",
    summary: "An autonomous multi-agent quantitative monitoring application synthesizing order book liquidity, derivatives funding rates, and macroeconomic announcements to recommend hedging thresholds.",
    challenge: "Consuming erratic WebSocket feeds from disparate exchanges while executing complex multi-factor reasoning models without memory leaks or latency spikes.",
    solution: "Built a Python FastAPI streaming engine paired with Google Gemini API reasoning agents, Redis time-series caches, and a reactive dashboard updating via WebSockets.",
    architecture: [
      "Gemini API structured JSON schema reasoning for contextual risk reports",
      "Redis Pub/Sub ingestion pipe normalizing 50+ exchange order books",
      "Automated alert dispatcher routing critical liquidation warnings to Telegram",
      "Zero hallucination risk filters enforcing deterministic mathematical assertions"
    ],
    metrics: [
      { label: "Daily Data Ticks", value: "850K+" },
      { label: "Agent Inference Latency", value: "< 800ms" },
      { label: "Alert Accuracy", value: "99.4%" },
      { label: "Uptime Record", value: "99.99%" }
    ],
    stack: ["Python", "FastAPI", "Gemini API", "TypeScript", "React", "Redis", "Docker"],
    liveUrl: "https://perpwise.ai"
  }
];
