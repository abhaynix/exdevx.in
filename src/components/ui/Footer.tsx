import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--dark)] text-[var(--bg)] border-t border-[var(--bg)]/10 pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[var(--bg)]/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-baseline gap-1.5 focus-ring-dark rounded-xs py-1"
              aria-label="ExDevX Home"
            >
              <span className="font-display text-3xl font-semibold tracking-tight text-[var(--bg)]">
                ExDevX
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block mb-1" />
            </Link>

            <p className="text-sm font-sans leading-relaxed text-[var(--bg)]/80 max-w-sm">
              High-performance digital engineering agency. We design and build resilient web applications, cross-platform mobile apps, autonomous workflows, and production AI systems.
            </p>

            <div className="pt-2 text-xs font-mono text-[var(--bg)]/60 space-y-1">
              <p>Founded {siteConfig.foundedYear} · Founded by {siteConfig.founder.name}</p>
              <p className="flex items-center gap-1.5 text-[var(--bg)]/80">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                {siteConfig.location}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services#web-applications" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link to="/services#mobile-apps" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  Mobile Apps (React Native)
                </Link>
              </li>
              <li>
                <Link to="/services#automation-systems" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  Automation Systems
                </Link>
              </li>
              <li>
                <Link to="/services#ai-integrations" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  AI Integrations & Agents
                </Link>
              </li>
              <li>
                <Link to="/#process" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  5-Step Delivery Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Case Studies */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Selected Work
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/work/kisanpool" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  KisanPool (Agri Logistics)
                </Link>
              </li>
              <li>
                <Link to="/work/ssnlc-law-college" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  ssnlc.in (Admissions Portal)
                </Link>
              </li>
              <li>
                <Link to="/work/sumit-ubale-portfolio" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  Sumit Ubale Portfolio
                </Link>
              </li>
              <li>
                <Link to="/work/perpwise-ai" className="text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark">
                  PerpWise AI Quant Bot
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 focus-ring-dark text-xs font-mono font-medium pt-1">
                  View All Archives <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              Initiate Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark"
                >
                  <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-[var(--bg)]/80 hover:text-[var(--bg)] transition-colors focus-ring-dark"
                >
                  <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.whatsappFormatted}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--on-accent)] bg-[var(--accent)] rounded-xs hover:opacity-90 transition-opacity focus-ring-dark mt-1 font-semibold"
                >
                  Chat on WhatsApp
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="pt-3 flex items-center gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--bg)]/70 hover:text-[var(--bg)] focus-ring-dark p-1 rounded-xs"
                aria-label="ExDevX GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--bg)]/70 hover:text-[var(--bg)] focus-ring-dark p-1 rounded-xs"
                aria-label="ExDevX LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--bg)]/70 hover:text-[var(--bg)] focus-ring-dark p-1 rounded-xs"
                aria-label="ExDevX Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--bg)]/60">
          <div>
            &copy; {new Date().getFullYear()} ExDevX. All rights reserved. Registered in Maharashtra, India.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[var(--bg)] transition-colors focus-ring-dark">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[var(--bg)] transition-colors focus-ring-dark">
              Terms of Service
            </Link>
            <Link to="/about" className="hover:text-[var(--bg)] transition-colors focus-ring-dark">
              About Agency
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
