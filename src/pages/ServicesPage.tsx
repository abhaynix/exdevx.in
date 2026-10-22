import React from 'react';
import { servicesData } from '../data/services';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';
import { CheckCircle2, ArrowRight, Server, Shield, Zap, Terminal } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Services & Capabilities | ExDevX"
        description="Comprehensive engineering capabilities across Web Applications, React Native Mobile, Background Automations, and Gemini AI Integrations."
      />

      {/* Hero Header */}
      <section className="pt-16 pb-20 border-b border-[var(--text)]/10 bg-[var(--bg)]">
        <Container>
          <Reveal>
            <div className="text-xs font-mono tracking-widest text-[var(--primary)] font-semibold mb-4">
              Services
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[var(--dark)] max-w-4xl leading-tight">
              Software for your product and business.
            </h1>
            <p className="mt-6 text-lg text-[var(--text)]/80 max-w-2xl font-sans leading-relaxed">
              We design and build web applications, mobile apps, automation systems and AI integrations.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Services Detail List */}
      <div className="divide-y divide-[var(--text)]/10">
        {servicesData.map((service, index) => {
          const isAlternate = index % 2 === 1;

          return (
            <Section
              key={service.id}
              id={service.id}
              tone={isAlternate ? 'surface' : 'default'}
              className="py-20"
            >
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* Left Column: Title & Overview */}
                  <div className="lg:col-span-5">
                    <Reveal>
                      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--dark)] mb-4 leading-tight">
                        {service.title}
                      </h2>

                      <p className="text-base text-[var(--text)]/85 leading-relaxed font-sans mb-6">
                        {service.fullDescription}
                      </p>

                      <div className="p-4 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xs mb-6">
                        <div className="text-xs font-mono tracking-wider text-[var(--text)]/50 mb-2">
                          Technologies
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-[var(--text)] font-semibold">
                          {service.techStack.map((tech, idx) => (
                            <span key={tech}>
                              {tech}
                              {idx < service.techStack.length - 1 && ' ·'}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button to="/contact" variant="primary" size="md">
                        Discuss {service.title}
                      </Button>
                    </Reveal>
                  </div>

                  {/* Right Column: Deliverables & Specifications */}
                  <div className="lg:col-span-7">
                    <Reveal delay={1}>
                      <div className="bg-[var(--surface)] border border-[var(--text)]/10 p-6 sm:p-8 rounded-xs">
                        <h3 className="text-xs font-mono tracking-wider text-[var(--primary)] font-bold mb-6 pb-2 border-b border-[var(--text)]/10">
                          What we can build
                        </h3>

                        <ul className="space-y-4">
                          {service.deliverables.map((item, dIdx) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-[var(--text)]">
                              <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                              <div className="font-sans leading-relaxed">
                                <span className="font-medium text-[var(--dark)]">{item}</span>
                              </div>
                            </li>
                          ))}
                        </ul>

                      </div>
                    </Reveal>
                  </div>
                </div>
              </Container>
            </Section>
          );
        })}
      </div>

      {/* Single Dark Section Band per page */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              tag="Architectural standard"
              title="How we work"
              description="A practical approach to building and maintaining software."

            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[var(--dark)]/5 border border-[var(--text)]/10 rounded-xs">
                <h3 className="flex items-center gap-3 font-display text-xl font-medium text-[var(--dark)] mb-2">
                  <Terminal aria-hidden="true" className="h-5 w-5 text-[var(--accent-primary)]" />
                  Zero lock-in
                </h3>
                <p className="text-xs text-[var(--dark)]/80 leading-relaxed font-sans">
                  We use familiar tools and open standards, with clear handover so your team can continue working with the code.
                </p>
              </div>

              <div className="p-6 bg-[var(--dark)]/5 border border-[var(--text)]/10 rounded-xs">
                <h3 className="flex items-center gap-3 font-display text-xl font-medium text-[var(--dark)] mb-2">
                  <Zap aria-hidden="true" className="h-5 w-5 text-[var(--accent-primary)]" />
                  Performance
                </h3>
                <p className="text-xs text-[var(--dark)]/80 leading-relaxed font-sans">
                  We consider loading speed, responsive behavior and accessibility as part of implementation.
                </p>
              </div>

              <div className="p-6 bg-[var(--dark)]/5 border border-[var(--text)]/10 rounded-xs">
                <h3 className="flex items-center gap-3 font-display text-xl font-medium text-[var(--dark)] mb-2">
                  <Shield aria-hidden="true" className="h-5 w-5 text-[var(--accent-primary)]" />
                  Deterministic AI Output
                </h3>
                <p className="text-xs text-[var(--dark)]/80 leading-relaxed font-sans">
                  We constrain LLMs via strict Pydantic and JSON schemas, assertive fallbacks, and bounded agent memory. We design AI integrations around the needs and constraints of each use case.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Bottom CTA Band */}
      <Section tone="default">
        <Container>
          <div className="bg-[var(--surface)] border border-[var(--text)]/10 p-8 sm:p-12 text-center max-w-3xl mx-auto rounded-xs">
            <h2 className="font-display text-3xl font-semibold text-[var(--dark)] mb-4">
              Need a custom engineering scope?
            </h2>
            <p className="text-sm font-sans text-[var(--text)]/80 mb-8 max-w-lg mx-auto">
              We offer technical architecture reviews, code audits, and full-cycle development sprints tailored to your exact milestones.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button to="/contact" variant="primary" size="lg">
                Discuss Your Scope
              </Button>
              <Button to="/work" variant="outline" size="lg">
                View projects
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ServicesPage;
