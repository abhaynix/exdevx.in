export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

export interface WorkItem {
  name: string;
  outcome: string;
  stack: string;
  year: string;
  url: string;
}

export interface SiteData {
  name: string;
  navLinks: NavLink[];
  hero: {
    headline: string;
    subline: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryLink: {
      label: string;
      href: string;
    };
  };
  services: ServiceItem[];
  work: WorkItem[];
  contact: {
    heading: string;
    email: string;
    emailMailto: string;
    whatsappLabel: string;
    whatsappUrl: string;
    location: string;
  };
  footer: {
    copyright: string;
    founder: string;
  };
}

export const siteData: SiteData = {
  name: 'ExDevX',
  navLinks: [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    headline: 'We build web apps, mobile apps and automation systems that ship.',
    subline: 'ExDevX is a small engineering studio in Maharashtra, India. Founded 2022.',
    primaryCta: {
      label: 'Start a project',
      href: 'mailto:hello@exdevx.in?subject=New%20Project%20Enquiry',
    },
    secondaryLink: {
      label: 'See work',
      href: '#work',
    },
  },
  services: [
    {
      number: '01',
      name: 'Web Applications',
      description: 'Production React and Next.js applications engineered for sub-second responses and long-term maintainability.',
    },
    {
      number: '02',
      name: 'Mobile Apps',
      description: 'Cross-platform React Native and Flutter applications delivering 60fps performance on iOS and Android.',
    },
    {
      number: '03',
      name: 'Automation Systems',
      description: 'Event-driven background workers, webhook integrations, and automated pipelines eliminating manual operations.',
    },
    {
      number: '04',
      name: 'AI Integrations',
      description: 'Deterministic LLM reasoning workflows, structured data extraction, and pragmatic model integrations.',
    },
  ],
  work: [
    {
      name: 'KisanPool',
      outcome: 'Aggregated 12,000+ quintals of produce, saving farmers 22% in freight costs.',
      stack: 'React, Node.js, PostgreSQL, WhatsApp API',
      year: '2024',
      url: 'https://kisanpool.com',
    },
    {
      name: 'ssnlc.in Law College Platform',
      outcome: 'Digitized admissions and exam notices for thousands of students with zero downtime.',
      stack: 'Next.js, TypeScript, Cloudflare, Tailwind CSS',
      year: '2023',
      url: 'https://ssnlc.in',
    },
    {
      name: 'Sumit Ubale Portfolio',
      outcome: 'Delivered an interactive portfolio with a 100/100 Lighthouse score and 0.000 CLS.',
      stack: 'React, Vite, CSS Animations',
      year: '2023',
      url: 'https://sumitubale.in',
    },
    {
      name: 'PerpWise AI',
      outcome: 'Automated quantitative market hedging processing 850,000+ daily data ticks.',
      stack: 'Python, FastAPI, Gemini API, Redis, WebSockets',
      year: '2024',
      url: 'https://perpwise.ai',
    },
  ],
  contact: {
    heading: 'Contact',
    email: 'hello@exdevx.in',
    emailMailto: 'mailto:hello@exdevx.in?subject=Project%20Inquiry',
    whatsappLabel: '+91 88301 74066',
    whatsappUrl: 'https://wa.me/918830174066?text=Hi%20Abhay,%20I%20would%20like%20to%20discuss%20a%20project%20with%20ExDevX',
    location: 'Pune & Maharashtra, India',
  },
  footer: {
    copyright: '© 2026 ExDevX',
    founder: 'Founded by Abhay Jadhav',
  },
};
