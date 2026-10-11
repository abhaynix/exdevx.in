import React from 'react';
import { siteData } from '../data/site';

export const Hero: React.FC = () => {
  return (
    <section className="pt-20 sm:pt-28 pb-20 sm:pb-32 animate-fade-rise">
      {/* Editorial Headline */}
      <h1 className="font-serif font-medium text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text)] m-0">
        {siteData.hero.headline}
      </h1>

      {/* One-line Subtitle */}
      <p className="mt-8 sm:mt-10 text-[17px] leading-[1.65] text-[var(--muted)] max-w-[56ch] m-0">
        {siteData.hero.subline}
      </p>

      {/* Two Links: Primary Coral CTA + Plain Text Link */}
      <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-6 sm:gap-8">
        <a
          href={siteData.hero.primaryCta.href}
          className="inline-flex items-center justify-center font-sans font-medium text-sm px-6 py-3.5 bg-[var(--accent)] text-[var(--on-accent)] rounded-[2px] hover:opacity-90 active:scale-[0.98] transition-[opacity,transform]"
        >
          {siteData.hero.primaryCta.label}
        </a>

        <a
          href={siteData.hero.secondaryLink.href}
          className="inline-flex items-center font-sans font-medium text-sm text-[var(--text)] hover:text-[var(--primary)] transition-colors underline underline-offset-4"
        >
          {siteData.hero.secondaryLink.label}
        </a>
      </div>
    </section>
  );
};

export default Hero;
