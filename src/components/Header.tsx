import React from 'react';
import { siteData } from '../data/site';

export const Header: React.FC = () => {
  return (
    <header className="pt-8 sm:pt-12 pb-8 sm:pb-12 flex items-center justify-between border-b border-[var(--line)]">
      {/* Wordmark with coral dot */}
      <a
        href="#"
        className="font-sans font-medium text-lg tracking-tight text-[var(--text)] hover:opacity-90 transition-opacity"
        aria-label="ExDevX Home"
      >
        <span>{siteData.name}</span>
        <span className="text-[var(--accent)] font-bold">.</span>
      </a>

      {/* Navigation: full list on desktop, collapses to single Contact link on mobile */}
      <nav aria-label="Main Navigation">
        <ul className="flex items-center gap-6 sm:gap-8 list-none m-0 p-0">
          {/* Services (desktop only) */}
          <li className="hidden sm:block">
            <a
              href="#services"
              className="text-sm font-sans text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              Services
            </a>
          </li>

          {/* Work (desktop only) */}
          <li className="hidden sm:block">
            <a
              href="#work"
              className="text-sm font-sans text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              Work
            </a>
          </li>

          {/* Contact (both mobile and desktop) */}
          <li>
            <a
              href="#contact"
              className="text-sm font-sans text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
