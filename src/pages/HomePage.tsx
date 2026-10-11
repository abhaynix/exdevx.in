import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react';
import { siteConfig } from '../data/site';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CaseStudyCard } from '../components/ui/CaseStudyCard';
import { ProcessStepper } from '../components/sections/ProcessStepper';
import { TechStrip } from '../components/sections/TechStrip';
import { ContactForm } from '../components/sections/ContactForm';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';
import { getOrganizationSchema, getWebSiteSchema } from '../lib/seo';

export const HomePage: React.FC = () => {
  const homeSchema = [getOrganizationSchema(), getWebSiteSchema()];

  return (
    <>
      <SEO
        title="ExDevX | High-Performance Web, Mobile & AI Engineering Agency"
        description="Pune & Maharashtra-based digital engineering agency. We build resilient React web platforms, React Native mobile apps, automation pipelines, and Gemini AI agent systems."
        schema={homeSchema}
      />

      {/* ── 1. Hero Section ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[var(--text)]/10">
        <Container>
          <Reveal>
            {/* Small meta tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary)] font-semibold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span>Founded {siteConfig.foundedYear} · {siteConfig.location}</span>
            </div>

            {/* Poster Headline with One Coral-Highlighted Word & Outlined Text */}
            <div className="relative">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--dark)] leading-[1.08] max-w-5xl">
                We engineer scalable web platforms, mobile apps &{' '}
                <span className="text-[var(--accent)] relative inline-block">
                  autonomous
                </span>{' '}
                AI systems.
              </h1>

              {/* Repeating Outlined Hero Text Treatment (Editorial Poster Style) */}
              <div
                className="select-none pointer-events-none mt-2 font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-stroke-primary opacity-25 uppercase overflow-hidden whitespace-nowrap"
                aria-hidden="true"
              >
                AUTONOMOUS · RESILIENT · DETERMINISTIC · SCALABLE
              </div>
            </div>

            {/* Subline */}
            <p className="mt-6 text-lg sm:text-xl text-[var(--text)]/80 max-w-2xl font-sans leading-relaxed">
              ExDevX is a Maharashtra-based software consultancy. We cut through enterprise bloat with type-safe architectures, 60fps mobile runtimes, and sub-second web performance.
            </p>

            {/* Two CTAs: Primary Coral + Secondary Outline Blue */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary" size="lg">
                Initiate Project Consultation
              </Button>
              <Button to="/work" variant="outline" size="lg">
                Inspect Selected Work
              </Button>
            </div>

            {/* Value Indicators (No static pill boxes) */}
            <div className="mt-14 pt-8 border-t border-[var(--text)]/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-[var(--text)]/70">
              <div>
                <span className="block font-display text-xl font-bold text-[var(--primary)]">100%</span>
                <span className="uppercase tracking-wider">Type-Safe TypeScript</span>
              </div>
              <div>
                <span className="block font-display text-xl font-bold text-[var(--primary)]">&lt; 100ms</span>
                <span className="uppercase tracking-wider">Average Edge TTFB</span>
              </div>
              <div>
                <span className="block font-display text-xl font-bold text-[var(--primary)]">99.9%</span>
                <span className="uppercase tracking-wider">System Availability</span>
              </div>
              <div>
                <span className="block font-display text-xl font-bold text-[var(--primary)]">2022</span>
                <span className="uppercase tracking-wider">Engineering Since</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 2. Services Grid (Card grid on --surface) ────────────────────── */}
      <Section tone="surface" id="services">
        <Container>
          <Reveal>
            <SectionHeading
              tag="Engineered Capabilities"
              title="Four disciplines. Complete technical depth."
              description="We avoid generic multi-purpose agency promises. We specialize strictly in four interconnected software disciplines built for scale."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {servicesData.map((service, index) => (
              <Reveal key={service.id} delay={index}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/services" variant="outline" size="md">
              View Detailed Service Architecture Specs
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── 3. Selected Work (Case study cards) ─────────────────────────── */}
      <Section tone="default" id="work">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
            <SectionHeading
              tag="Selected Work"
              title="Proven deployments with measured outcomes"
              description="Case studies across agricultural logistics, institutional portals, and real-time quantitative AI systems."
              className="mb-0"
            />
            <Button to="/work" variant="outline" size="sm" className="self-start sm:self-auto shrink-0">
              View All 4 Case Studies
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, idx) => (
              <Reveal key={project.slug} delay={idx}>
                <CaseStudyCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 4. Process Stepper (Single Dark Section Band per page) ───────── */}
      <Section tone="dark" id="process">
        <Container>
          <Reveal>
            <ProcessStepper />
          </Reveal>
        </Container>
      </Section>

      {/* ── 5. Tech Stack Strip ─────────────────────────────────────────── */}
      <TechStrip />

      {/* ── 6. CTA Band & Contact Form ──────────────────────────────────── */}
      <Section tone="default" id="contact">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Kicker */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold mb-3">
                  Consultation
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[var(--dark)] leading-tight mb-4">
                  Have a high-stakes product challenge?
                </h2>
                <p className="text-base text-[var(--text)]/80 leading-relaxed font-sans mb-6">
                  Whether you are initiating a greenfield React/Native application, integrating LLM reasoning agents, or decoupling a sluggish legacy stack, our engineers can assist immediately.
                </p>

                <div className="space-y-4 pt-4 border-t border-[var(--text)]/10 text-xs font-mono text-[var(--text)]/70">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Fixed-scope or sprint-based retainer agreements</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Architectural review and zero-waste tech recommendations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Direct engineering line with lead architect Abhay Jadhav</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[var(--surface)] border border-[var(--text)]/10 rounded-xs">
                  <div className="text-[11px] font-mono uppercase text-[var(--text)]/50 mb-1">
                    Direct Coordination
                  </div>
                  <div className="font-mono text-sm font-bold text-[var(--dark)]">
                    hello@exdevx.in
                  </div>
                  <div className="font-mono text-xs text-[var(--text)]/70 mt-1">
                    +91 88301 74066 (WhatsApp Available)
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <Reveal delay={1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
