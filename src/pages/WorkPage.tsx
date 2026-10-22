import React from 'react';
import { portfolioProjectsData } from '../data/projects';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CaseStudyCard } from '../components/ui/CaseStudyCard';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';

export const WorkPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Selected Work & Case Studies | ExDevX"
        description="Explore production case studies by ExDevX across agri-tech logistics, high-traffic institutional education, bespoke design engineering, and quantitative AI systems."
      />

      {/* Header */}
      <section className="pt-16 pb-20 border-b border-[var(--text)]/10 bg-[var(--bg)]">
        <Container>
          <Reveal>
            <div className="text-xs font-mono tracking-widest text-[var(--primary)] font-semibold mb-4">
              Selected work
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[var(--dark)] max-w-4xl leading-tight">
              Projects across web, mobile and AI.
            </h1>
            <p className="mt-6 text-lg text-[var(--text)]/80 max-w-2xl font-sans leading-relaxed">
              A selection of projects from our portfolio.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Grid of Case Studies */}
      <Section tone="surface">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {portfolioProjectsData.map((project, idx) => (
              <Reveal key={project.slug} delay={idx}>
                <CaseStudyCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Single Dark Section Band per page */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-xs font-mono tracking-widest text-[var(--accent)] font-semibold mb-2">
                  Code ownership
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-[var(--dark)] mb-3">
                  Your project, in your hands.
                </h2>
                <p className="text-sm text-[var(--dark)]/80 leading-relaxed font-sans max-w-2xl">
                  We aim to build with familiar tools and clear handover, so your team can continue working with the code.
                </p>
              </div>

              <div className="lg:col-span-4 lg:text-right">
                <Button to="/contact" variant="primary" size="lg">
                  Start your project
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
};

export default WorkPage;
