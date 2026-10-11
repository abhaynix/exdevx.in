import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mail, ArrowUpRight, Terminal, Compass, Search } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../data/site';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 — Page Not Found | ExDevX"
        description="Looks like this page took a wrong turn. Return to ExDevX homepage or get in touch with our engineering team."
      />

      <section className="relative overflow-hidden py-20 sm:py-28 bg-[var(--bg)] min-h-[calc(100vh-12rem)] flex items-center">
        {/* Subtle background poster watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10"
          aria-hidden="true"
        >
          <span className="font-display text-[18vw] font-bold text-stroke-primary leading-none">
            404
          </span>
        </div>

        <Container size="narrow" className="relative z-10 text-center">
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--surface)] border border-[var(--text)]/10 text-xs font-mono text-[var(--primary)] font-semibold uppercase tracking-widest rounded-xs mb-6 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>404 — Page Not Found</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[var(--dark)] leading-[1.1] mb-4">
            Looks like this page took a wrong turn.
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)]/80 max-w-xl mx-auto font-sans leading-relaxed mb-8">
            The URL you requested doesn't exist, may have moved to an updated route, or was retired during an infrastructure migration.
          </p>

          {/* Tasteful Development-Themed Visual: Terminal Route Trace */}
          <div className="max-w-md mx-auto bg-[var(--surface)] border border-[var(--text)]/15 rounded-xs p-4 sm:p-5 text-left mb-10 shadow-xs">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--text)]/10 mb-3 text-[11px] font-mono text-[var(--text)]/50">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
              </div>
              <span className="flex items-center gap-1 text-[var(--text)]/60">
                <Terminal className="w-3 h-3 text-[var(--primary)]" />
                router.inspect()
              </span>
            </div>

            {/* Terminal Body */}
            <div className="font-mono text-xs space-y-1.5 text-[var(--text)]/80">
              <div className="text-[var(--text)]/50">
                // Failed route resolution
              </div>
              <div>
                <span className="text-[var(--primary)] font-bold">GET</span>{' '}
                <span className="text-[var(--dark)] font-semibold">
                  {currentPath || '/unknown-resource'}
                </span>{' '}
                <span className="text-rose-600 font-bold">→ 404 Not Found</span>
              </div>
              <div className="text-[var(--text)]/60 text-[11px] pt-1">
                status: <span className="text-[var(--accent)]">ERR_ROUTE_UNDEFINED</span>
              </div>
              <div className="text-[11px] text-[var(--text)]/60">
                resolution: return_to_origin()
                <span
                  className="inline-block w-1.5 h-3.5 bg-[var(--accent)] animate-pulse ml-1 align-middle"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button to="/" variant="primary" size="lg" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Contact ExDevX</span>
            </Button>
          </div>

          {/* Quick Helpful Destinations (Clean Unboxed Metadata Discipline) */}
          <div className="pt-8 border-t border-[var(--text)]/10 max-w-lg mx-auto">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text)]/50 mb-3">
              Explore Core Destinations
            </div>
            <nav
              aria-label="Popular site destinations"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-mono text-[var(--primary)]"
            >
              <Link to="/services" className="hover:underline focus-ring py-0.5">
                Our Services
              </Link>
              <span className="text-[var(--text)]/30" aria-hidden="true">·</span>
              <Link to="/work" className="hover:underline focus-ring py-0.5">
                Selected Work
              </Link>
              <span className="text-[var(--text)]/30" aria-hidden="true">·</span>
              <Link to="/about" className="hover:underline focus-ring py-0.5">
                About Agency
              </Link>
              <span className="text-[var(--text)]/30" aria-hidden="true">·</span>
              <a
                href={siteConfig.contact.whatsappFormatted}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[var(--dark)] font-semibold inline-flex items-center gap-1 focus-ring py-0.5"
              >
                <span>WhatsApp Hotline</span>
                <ArrowUpRight className="w-3 h-3 text-[var(--accent)]" />
              </a>
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
};

export default NotFoundPage;
