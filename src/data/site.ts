export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  subline: string;
  foundedYear: number;
  location: string;
  address: {
    locality: string;
    region: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    whatsappFormatted: string;
  };
  social: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  founder: {
    name: string;
    role: string;
    bio: string;
  };
  navItems: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "ExDevX",
  tagline: "Web, mobile and AI development.",
  subline: "We build scalable web platforms, cross-platform mobile apps, autonomous workflows, and AI systems for ambitious businesses worldwide.",
  foundedYear: 2022,
  location: "Pune & Ahilyanagar, Maharashtra, India",
  address: {
    locality: "Pune",
    region: "Maharashtra",
    country: "India"
  },
  contact: {
    email: "hallo@exdevx.in",
    phone: "+91 70204 01094",
    whatsapp: "+917020401094",
    whatsappFormatted: "https://wa.me/917020401094?text=Hi%20ExDevX%20team%2C%20I%20would%20like%20to%20discuss%20a%20project."
  },
  social: {
    github: "https://github.com/abhaynix",
    linkedin: "https://www.linkedin.com/in/abhay-jadhav-56a623309/",
    instagram: "https://www.instagram.com/dev.abhayyy/"
  },
  founder: {
    name: "Abhay Jadhav",
    role: "Founder & Lead Engineer",
    bio: "Systems architect and developer specializing in React, Node.js, distributed automations, and AI agent integrations."
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
};
