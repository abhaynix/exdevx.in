import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { Button } from './Button';
import { Container } from './Container';
import { cn } from '../../lib/cn';

export const Navbar: React.FC = () => {
  const header = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileDrawer = useRef<HTMLDivElement>(null);
  const hasOpenedMobileDrawer = useRef(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    import('../../lib/gsap').then(({ gsap }) => {
      if (cancelled || !header.current) return;
      const context = gsap.context(() => {
        const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
        entrance
          .from(header.current, { autoAlpha: 0, y: -5, duration: 0.36 })
          .from('.site-navbar-brand', { autoAlpha: 0, y: 6, duration: 0.3 }, '-=0.14')
          .from('.site-navbar-links > a', { autoAlpha: 0, y: 6, duration: 0.28, stagger: 0.035 }, '-=0.12')
          .from('.site-navbar-actions', { autoAlpha: 0, y: 5, duration: 0.26 }, '-=0.12')
          .from('.site-navbar-toggle', { autoAlpha: 0, y: 5, duration: 0.24 }, '-=0.12');
      }, header.current);
      revert = () => context.revert();
    }).catch(() => {
      if (cancelled || !header.current) return;
      header.current.querySelectorAll<HTMLElement>('.site-navbar-brand, .site-navbar-links > a, .site-navbar-actions, .site-navbar-toggle').forEach((item) => {
        item.style.removeProperty('opacity');
        item.style.removeProperty('transform');
        item.style.removeProperty('visibility');
      });
      header.current.style.removeProperty('opacity');
      header.current.style.removeProperty('transform');
      header.current.style.removeProperty('visibility');
    });
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen && !hasOpenedMobileDrawer.current) return;
    let cancelled = false;
    let stopTween: (() => void) | undefined;
    import('../../lib/gsap').then(({ gsap }) => {
      const drawer = mobileDrawer.current;
      if (cancelled || !drawer) return;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        gsap.set(drawer, { display: isMobileMenuOpen ? 'block' : 'none', autoAlpha: isMobileMenuOpen ? 1 : 0, y: 0 });
        return;
      }
      if (isMobileMenuOpen) {
        hasOpenedMobileDrawer.current = true;
        gsap.set(drawer, { display: 'block' });
        const tween = gsap.fromTo(drawer, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power3.out' });
        stopTween = () => tween.kill();
        return;
      }
      const tween = gsap.to(drawer, {
        autoAlpha: 0,
        y: -8,
        duration: 0.18,
        ease: 'power3.out',
        onComplete: () => gsap.set(drawer, { display: 'none' }),
      });
      stopTween = () => tween.kill();
    }).catch(() => {
      if (cancelled || !mobileDrawer.current) return;
      mobileDrawer.current.style.display = isMobileMenuOpen ? 'block' : 'none';
      mobileDrawer.current.style.opacity = isMobileMenuOpen ? '1' : '0';
    });
    return () => {
      cancelled = true;
      stopTween?.();
    };
  }, [isMobileMenuOpen]);

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
        ref={header}
        className={cn(
          'sticky top-0 z-50 border-b border-[var(--text)]/10 bg-[var(--bg)] home-navbar site-navbar',
          isScrolled && 'bg-[var(--surface)]'
        )}
      >
        <Container size="wide">
          <div className="site-navbar-inner flex items-center justify-between h-[72px]">
            {/* Brand Logo */}
            <Link
              to="/"
              className="site-navbar-brand group flex items-baseline gap-1.5 focus-ring rounded-xs py-1"
              aria-label="ExDevX Home"
            >
              <span className="font-display text-2xl font-semibold tracking-tight">ExDev<span className="site-navbar-mark">X</span></span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={`site-navbar-links hidden md:flex items-center gap-8${isHome ? ' home-desktop-nav' : ''}`} aria-label="Main Navigation">
              {siteConfig.navItems.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(`${item.href}/`));
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
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    <span aria-hidden="true" className="site-nav-indicator absolute -bottom-1 left-0 right-0 h-px bg-[var(--primary)]" />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className={`site-navbar-actions hidden md:flex items-center gap-4${isHome ? ' home-desktop-cta' : ''}`}>
              <Button to="/contact" size="sm" variant="primary" className="site-navbar-cta">
                Let’s Talk
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`site-navbar-toggle p-2 text-[var(--text)] hover:text-[var(--primary)] focus-ring rounded-xs${isHome ? ' home-menu-button' : ' md:hidden'}`}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-controls="site-mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        <div
          ref={mobileDrawer}
          id="site-mobile-navigation"
          className={`site-mobile-drawer md:hidden border-b border-[var(--text)]/10 bg-[var(--surface)] px-4 pt-3 pb-6 shadow-xl${isHome ? ' home-menu-drawer' : ''}`}
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
        >
          <nav className="site-mobile-links flex flex-col" aria-label="Mobile Navigation">
            {siteConfig.navItems.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className="px-3 py-3 text-base font-sans font-medium text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--bg)] rounded-xs focus-ring transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[var(--text)]/10 flex flex-col gap-2">
              <Button to="/contact" size="md" variant="primary" className="site-navbar-cta w-full">
                Let’s Talk
              </Button>
              <a
                href={siteConfig.contact.whatsappFormatted}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2 text-xs font-mono font-medium text-[var(--primary)] hover:underline focus-ring"
              >
                Quick WhatsApp Chat
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
