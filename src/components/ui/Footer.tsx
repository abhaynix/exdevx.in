import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { Container } from './Container';

export const Footer: React.FC = () => (
  <footer className="border-t border-[var(--text)]/10 bg-[var(--surface)] py-12 text-[var(--text)]">
    <Container>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="font-display text-2xl font-semibold text-[var(--dark)]">ExDevX</Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text)]/75">
            Web, mobile and AI software development. Based in {siteConfig.address.locality}, {siteConfig.address.region}.
          </p>
        </div>
        <nav aria-label="Footer services">
          <h2 className="mb-3 text-sm font-semibold text-[var(--dark)]">Services</h2>
          <ul className="space-y-2 text-sm">
            {siteConfig.navItems.slice(0, 2).map((item) => <li key={item.href}><Link className="hover:text-[var(--primary)]" to={item.href}>{item.label}</Link></li>)}
            <li><Link className="hover:text-[var(--primary)]" to="/about">About</Link></li>
          </ul>
        </nav>
        <nav aria-label="Footer projects">
          <h2 className="mb-3 text-sm font-semibold text-[var(--dark)]">Work</h2>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-[var(--primary)]" to="/work">Selected projects</Link></li>
            <li><Link className="hover:text-[var(--primary)]" to="/privacy-policy">Privacy policy</Link></li>
            <li><Link className="hover:text-[var(--primary)]" to="/terms-and-conditions">Terms and conditions</Link></li>
            <li><Link className="hover:text-[var(--primary)]" to="/cookie-policy">Cookie policy</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-[var(--dark)]">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-[var(--primary)]" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
            <li><a className="hover:text-[var(--primary)]" href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}>{siteConfig.contact.phone}</a></li>
            <li><a className="hover:text-[var(--primary)]" href={siteConfig.contact.whatsappFormatted} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li className="flex flex-wrap gap-x-3 pt-1 text-xs">
              <a className="hover:text-[var(--primary)]" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="hover:text-[var(--primary)]" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="hover:text-[var(--primary)]" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="mt-5 text-xs text-[var(--text)]/70 underline underline-offset-4 hover:text-[var(--primary)] focus-ring"
        onClick={() => window.dispatchEvent(new Event('exdevx:open-cookie-settings'))}
      >
        Cookie settings
      </button>
      <div className="mt-10 border-t border-[var(--text)]/10 pt-5 text-xs text-[var(--text)]/60">
        © {new Date().getFullYear()} ExDevX
      </div>
    </Container>
  </footer>
);
