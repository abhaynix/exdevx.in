import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, Cpu, Check } from 'lucide-react';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Find next project for pagination
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <>
      <SEO
        title={`${project.title} Case Study | ExDevX`}
        description={project.summary}
        ogType="article"
      />

      {/* Case Study Header */}
      <section className="pt-12 pb-16 sm:pb-24 border-b border-[var(--text)]/10 bg-[var(--bg)]">
        <Container>
          <Reveal>
            <div className="mb-8">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--primary)] hover:underline focus-ring py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Work</span>
              </Link>
            </div>

            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--primary)] font-bold mb-4">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.client}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[var(--dark)] max-w-4xl leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-sm font-mono uppercase tracking-wider text-[var(--text)]/60 max-w-2xl mb-8">
              {project.subtitle}
            </p>

            {project.liveUrl && (
              <div className="mt-8">
                <Button href={project.liveUrl} variant="primary" size="md">
                Visit project <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      {/* Challenge and Solution */}
      <Section tone="surface">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-12">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold mb-3">
                  01. The Core Challenge
                </h2>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--dark)] mb-4">
                  Overcoming bottlenecks & infrastructural instability
                </h3>
                <p className="text-base text-[var(--text)]/85 leading-relaxed font-sans">
                  {project.challenge}
                </p>
              </div>

              <div className="border-t border-[var(--text)]/10 pt-10">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold mb-3">
                  02. Engineered Solution
                </h2>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--dark)] mb-4">
                  Type-safe implementation designed for resilient scale
                </h3>
                <p className="text-base text-[var(--text)]/85 leading-relaxed font-sans mb-6">
                  {project.solution}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Single Dark Section Band: Technical Architecture */}
      <Section tone="surface">
        <Container size="narrow">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold mb-3">
              03. Technical Architecture
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[var(--dark)] mb-6">
              Engineering Specs & Architectural Invariants
            </h2>

            <div className="space-y-4 mb-10">
              {project.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-[var(--dark)]/5 border border-[var(--text)]/10 rounded-xs"
                >
                  <Cpu className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--dark)]/90 font-mono leading-relaxed">
                    {arch}
                  </span>
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div className="border-t border-[var(--text)]/10 pt-6">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--dark)]/60 mb-3">
                Technologies Utilized
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono text-[var(--dark)] bg-[var(--bg)]/10 px-3 py-1.5 rounded-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Next Project Footer Bar */}
      <Section tone="default" className="py-12 border-t border-[var(--text)]/10">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text)]/60">
                Next Case Study
              </span>
              <h4 className="font-display text-2xl font-semibold text-[var(--primary)] mt-1">
                {nextProject.title}
              </h4>
            </div>

            <Button to={`/work/${nextProject.slug}`} variant="outline" size="md">
              Examine Next Case Study <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default CaseStudyPage;
