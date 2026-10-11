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
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold mb-4">
              Comprehensive Service Matrix
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[var(--dark)] max-w-4xl leading-tight">
              Engineering without bloat, abstraction layers or guesswork.
            </h1>
            <p className="mt-6 text-lg text-[var(--text)]/80 max-w-2xl font-sans leading-relaxed">
              We operate as your specialized product engineering squad. Each discipline is managed with strict architectural contracts, type safety, and zero external subcontractor overhead.
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
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary)] font-bold mb-3">
                        <span>DISCIPLINE 0{index + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[var(--text)]/60">{service.metrics}</span>
                      </div>

                      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--dark)] mb-4 leading-tight">
                        {service.title}
                      </h2>

                      <p className="text-base text-[var(--text)]/85 leading-relaxed font-sans mb-6">
                        {service.fullDescription}
                      </p>

                      <div className="p-4 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xs mb-6">
                        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text)]/50 mb-2">
                          Standard Production Stack
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
                        Inquire About {service.title}
                      </Button>
                    </Reveal>
                  </div>

                  {/* Right Column: Deliverables & Specifications */}
                  <div className="lg:col-span-7">
                    <Reveal delay={1}>
                      <div className="bg-[var(--surface)] border border-[var(--text)]/10 p-6 sm:p-8 rounded-xs">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--primary)] font-bold mb-6 pb-2 border-b border-[var(--text)]/10">
                          Production Scope & Deliverables
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

                        <div className="mt-8 pt-6 border-t border-[var(--text)]/10 grid grid-cols-2 gap-4 text-xs font-mono text-[var(--text)]/70">
                          <div>
                            <span className="block text-[var(--primary)] font-bold">Timeline Range</span>
                            <span>2 to 6 weeks per sprint</span>
                          </div>
                          <div>
                            <span className="block text-[var(--primary)] font-bold">Handover Asset</span>
                            <span>Full git repo + CI/CD runbook</span>
                          </div>
                        </div>
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
      <Section tone="dark">
        <Container>
          <Reveal>
            <SectionHeading
              tag="Architectural Standard"
              title="Our Non-Negotiable Engineering Principles"
              description="Every deliverable that leaves ExDevX is governed by core invariants ensuring longevity, security, and low operational overhead."
              tone="dark"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[var(--bg)]/5 border border-[var(--bg)]/10 rounded-xs">
                <div className="w-8 h-8 rounded-xs bg-[var(--accent)] text-[var(--on-accent)] flex items-center justify-center mb-4">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-display text-xl font-medium text-[var(--bg)] mb-2">
                  Zero Lock-In
                </h3>
                <p className="text-xs text-[var(--bg)]/80 leading-relaxed font-sans">
                  We write clean, idiomatic code adhering to open standards. No proprietary agency frameworks, no opaque magic configs. You own 100% of the repository.
                </p>
              </div>

              <div className="p-6 bg-[var(--bg)]/5 border border-[var(--bg)]/10 rounded-xs">
                <div className="w-8 h-8 rounded-xs bg-[var(--accent)] text-[var(--on-accent)] flex items-center justify-center mb-4">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-display text-xl font-medium text-[var(--bg)] mb-2">
                  Lighthouse 95+ Guarantee
                </h3>
                <p className="text-xs text-[var(--bg)]/80 leading-relaxed font-sans">
                  We profile every route with Web Vitals thresholds. Sub-second initial loads, zero cumulative layout shift (CLS), and accessible semantic trees.
                </p>
              </div>

              <div className="p-6 bg-[var(--bg)]/5 border border-[var(--bg)]/10 rounded-xs">
                <div className="w-8 h-8 rounded-xs bg-[var(--accent)] text-[var(--on-accent)] flex items-center justify-center mb-4">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-display text-xl font-medium text-[var(--bg)] mb-2">
                  Deterministic AI Output
                </h3>
                <p className="text-xs text-[var(--bg)]/80 leading-relaxed font-sans">
                  We constrain LLMs via strict Pydantic and JSON schemas, assertive fallbacks, and bounded agent memory. Zero hallucination in critical data flows.
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
                Examine Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ServicesPage;
