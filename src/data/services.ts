export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  techStack: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-applications",
    title: "Web Applications",
    shortDescription: "Web platforms and applications built with React, Next.js and TypeScript.",
    fullDescription: "From SaaS dashboards to public websites, we build web products around your requirements and workflows.",
    deliverables: [
      "Custom Full-Stack Web Applications",
      "SaaS Multi-Tenant Dashboards & Billing",
      "Headless CMS & Content Infrastructures",
      "SSR / SSG Hybrid Render Pipelines"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps (React Native)",
    shortDescription: "Cross-platform iOS and Android apps built with React Native.",
    fullDescription: "We build mobile applications with shared code, connecting app interfaces to the services and data they need.",
    deliverables: [
      "Cross-Platform iOS & Android Apps",
      "Offline SQLite / WatermelonDB Data Sync",
      "Push Notifications & Deep Linking",
      "In-App Purchases & Payment Gateways",
      "Automated Fastlane Deployment Pipelines"
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "SQLite", "Fastlane"],
  },
  {
    id: "automation-systems",
    title: "Automation Systems",
    shortDescription: "Background jobs and integrations to automate recurring work.",
    fullDescription: "We connect services and build scheduled jobs, notifications and data pipelines for recurring business processes.",
    deliverables: [
      "Event-Driven Microservices & Webhook Relays",
      "Scheduled Cron Job Queues (BullMQ / Redis)",
      "Automated CRM & Payment Reconciliation",
      "Custom WhatsApp & Telegram Notification Bots",
      "ETL Pipelines & Automated Document Generation"
    ],
    techStack: ["Python", "FastAPI", "Node.js", "BullMQ", "Redis", "Docker", "PostgreSQL"],
  },
  {
    id: "ai-integrations",
    title: "AI Integrations",
    shortDescription: "AI features and language model integrations for existing products and workflows.",
    fullDescription: "We integrate language models into products and workflows, including search, document processing and customer support use cases.",
    deliverables: [
      "Gemini API & LLM Agent System Architectures",
      "Enterprise RAG with Vector Search (pgvector)",
      "Autonomous Decision-Making Agent Workflows",
      "Multimodal Document Parsing & OCR Extraction",
      "Private Model Fine-Tuning & Self-Hosted Ollama"
    ],
    techStack: ["Gemini API", "Python", "FastAPI", "LangChain", "pgvector", "Ollama", "TypeScript"],
  },
  {
    id: "whatsapp-crm-ai",
    title: "WhatsApp CRM with AI",
    shortDescription: "Automate customer conversations, manage leads, and streamline your business with AI-powered WhatsApp CRM solutions.",
    fullDescription: "Automate customer conversations, manage leads, and streamline your business with AI-powered WhatsApp CRM solutions.",
    deliverables: [
      "AI-powered WhatsApp chat automation",
      "Lead management and automated follow-ups",
      "Customer support and smart replies",
      "WhatsApp Business API integration",
    ],
    techStack: ["WhatsApp Business API", "CRM Integrations", "AI Workflows", "Automated Follow-ups"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Clear, considered interfaces shaped around real user needs.",
    fullDescription: "We map user flows, explore visual directions and design responsive interfaces ready for engineering.",
    deliverables: ["User flows and wireframes", "Responsive interface design", "Reusable design patterns"],
    techStack: ["Figma", "Prototyping", "Design systems"],
  },
  {
    id: "seo-digital-marketing",
    title: "SEO & Digital Marketing",
    shortDescription: "Search foundations and practical improvements that help people find your site.",
    fullDescription: "We improve technical search readiness, page structure and content foundations for discoverability.",
    deliverables: ["Technical SEO review", "Metadata and structured data", "Performance and indexing improvements"],
    techStack: ["Technical SEO", "Schema.org", "Core Web Vitals"],
  }
];
