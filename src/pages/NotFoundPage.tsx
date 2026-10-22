import React, { useEffect, useRef } from 'react';
import { Home, Mail } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/ui/SEO';

export const NotFoundPage: React.FC = () => {
  const content = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    import('../lib/gsap').then(({ gsap }) => {
      if (cancelled || !content.current) return;
      const context = gsap.context(() => {
        gsap.from('[data-404-enter]', {
          autoAlpha: 0,
          y: 12,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }, content.current);
      revert = () => context.revert();
    }).catch(() => undefined);
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <>
      <SEO
        title="404: page not found | ExDevX"
        description="The page you're looking for doesn't exist or may have moved. Return to ExDevX or contact our team."
        noindex
      />
      <section className="home-theme relative isolate flex min-h-[calc(100svh-9rem)] items-center overflow-hidden py-20 text-center sm:py-28">
        <Container size="narrow" className="w-full">
          <div ref={content}>
            <p data-404-enter className="font-mono text-xs font-medium tracking-[0.2em] text-[var(--muted)]">
              Error code: 404
            </p>
            <p data-404-enter aria-hidden="true" className="mt-4 font-display text-[clamp(7rem,27vw,17rem)] font-semibold leading-[0.78] tracking-[-0.09em] text-[var(--text)]">
              404
            </p>
            <h1 id="not-found-title" data-404-enter className="mt-8 font-display text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text)] sm:text-5xl">
              Lost in the digital space.
            </h1>
            <p data-404-enter className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              The page you’re looking for doesn’t exist, may have moved, or is temporarily unavailable.
            </p>
            <div data-404-enter className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button to="/" variant="primary" size="lg" className="home-primary-button">
                <Home aria-hidden="true" className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <Button to="/contact" variant="outline-on-dark" size="lg">
                <Mail aria-hidden="true" className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default NotFoundPage;
