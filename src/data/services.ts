export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  techStack: string[];
  metrics: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-applications",
    title: "Web Applications",
    shortDescription: "Editorial-grade, blazing-fast web platforms engineered with React, Next.js, and strict TypeScript.",
    fullDescription: "From dynamic SaaS dashboards to high-converting public platforms, we build web solutions focused on sub-second load times, flawless responsive behaviors, and structured SEO architecture. Zero bloat, maximal conversion.",
    deliverables: [
      "Custom Full-Stack Web Applications",
      "SaaS Multi-Tenant Dashboards & Billing",
      "Headless CMS & Content Infrastructures",
      "Core Web Vitals & Lighthouse 95+ Tuning",
      "SSR / SSG Hybrid Render Pipelines"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
    metrics: "Sub-100ms TTFB & 98+ Core Web Vitals"
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps (React Native)",
    shortDescription: "High-performance iOS and Android mobile experiences from a single, resilient codebase.",
    fullDescription: "Native 60fps animations, offline-first syncing, secure biometrics, and unified push notification architectures. We deploy production apps to the Apple App Store and Google Play without fragmentation.",
    deliverables: [
      "Cross-Platform iOS & Android Apps",
      "Offline SQLite / WatermelonDB Data Sync",
      "Push Notifications & Deep Linking",
      "In-App Purchases & Payment Gateways",
      "Automated Fastlane Deployment Pipelines"
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "SQLite", "Fastlane"],
    metrics: "60 FPS native rendering & offline resilient"
  },
  {
    id: "automation-systems",
    title: "Automation Systems",
    shortDescription: "Resilient background worker pipelines and event-driven automations replacing manual friction.",
    fullDescription: "We engineer autonomous serverless worker queues, automated reporting bots, Webhook synthesizers, and data scraping pipelines that run 24/7 with self-healing retries and zero human intervention.",
    deliverables: [
      "Event-Driven Microservices & Webhook Relays",
      "Scheduled Cron Job Queues (BullMQ / Redis)",
      "Automated CRM & Payment Reconciliation",
      "Custom WhatsApp & Telegram Notification Bots",
      "ETL Pipelines & Automated Document Generation"
    ],
    techStack: ["Python", "FastAPI", "Node.js", "BullMQ", "Redis", "Docker", "PostgreSQL"],
    metrics: "99.98% pipeline uptime with automatic recovery"
  },
  {
    id: "ai-integrations",
    title: "AI Integrations",
    shortDescription: "Practical generative AI, autonomous agent workflows, and multimodal pipelines using Gemini & LLMs.",
    fullDescription: "We implement practical AI that solves business bottlenecks: structured retrieval-augmented generation (RAG), multimodal document processing, automated customer engagement, and autonomous multi-agent reasoning.",
    deliverables: [
      "Gemini API & LLM Agent System Architectures",
      "Enterprise RAG with Vector Search (pgvector)",
      "Autonomous Decision-Making Agent Workflows",
      "Multimodal Document Parsing & OCR Extraction",
      "Private Model Fine-Tuning & Self-Hosted Ollama"
    ],
    techStack: ["Gemini API", "Python", "FastAPI", "LangChain", "pgvector", "Ollama", "TypeScript"],
    metrics: "Deterministic output schemas & under 2s latency"
  }
];
