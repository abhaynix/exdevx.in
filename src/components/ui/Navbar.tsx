import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { Button } from './Button';
import { Container } from './Container';
import { cn } from '../../lib/cn';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 16;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Skip to Content for screen readers & keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--on-accent)] focus:font-semibold focus-ring"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 border-b',
          isScrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-md border-[var(--text)]/10 shadow-xs'
            : 'bg-[var(--bg)] border-transparent'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              to="/"
              className="group flex items-baseline gap-1.5 focus-ring rounded-xs py-1"
              aria-label="ExDevX Home"
            >
              <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">
                ExDevX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block mb-1" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              {siteConfig.navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={cn(
                      'text-sm font-sans font-medium transition-colors focus-ring py-1 relative',
                      isActive
                        ? 'text-[var(--primary)] font-semibold'
                        : 'text-[var(--text)]/80 hover:text-[var(--primary)]'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--primary)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button to="/contact" size="sm" variant="primary">
                Start a Project
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[var(--text)] hover:text-[var(--primary)] focus-ring rounded-xs"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-b border-[var(--text)]/10 bg-[var(--surface)] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
            role="dialog"
            aria-label="Mobile Navigation"
          >
            <nav className="flex flex-col space-y-3">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3 py-2 text-base font-sans font-medium text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--bg)] rounded-xs focus-ring transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[var(--text)]/10 flex flex-col gap-2">
                <Button to="/contact" size="md" variant="primary" className="w-full">
                  Start a Project
                </Button>
                <a
                  href={siteConfig.contact.whatsappFormatted}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 text-xs font-mono font-medium text-[var(--primary)] hover:underline focus-ring"
                >
                  Quick WhatsApp Chat
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
