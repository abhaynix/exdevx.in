import React from 'react';
import { siteConfig } from '../data/site';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';
import { Terminal, Shield, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About ExDevX | Engineering Agency Founded in 2022"
        description="Learn about ExDevX, founded in 2022 by Abhay Jadhav in Maharashtra, India. Our values: execution over theory, automation first, and self-hosted infrastructure."
      />

      {/* Hero Header */}
      <section className="pt-16 pb-20 border-b border-[var(--text)]/10 bg-[var(--bg)]">
        <Container>
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold mb-4">
              Agency Origins & Ethos
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[var(--dark)] max-w-4xl leading-tight">
              Execution over theory. Automation first. Zero fluff.
            </h1>
            <p className="mt-6 text-lg text-[var(--text)]/80 max-w-2xl font-sans leading-relaxed">
              Founded in 2022 in Maharashtra, India by engineer Abhay Jadhav, ExDevX was built to escape bureaucratic software development cycles and ship pristine, high-leverage products.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Founder Story */}
      <Section tone="surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="p-8 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xs">
                  <div className="text-xs font-mono text-[var(--primary)] uppercase tracking-wider font-bold mb-2">
                    Founder Profile
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-[var(--dark)] mb-2">
                    {siteConfig.founder.name}
                  </h3>
                  <div className="text-xs font-mono text-[var(--text)]/60 mb-6">
                    {siteConfig.founder.role} · Based in Maharashtra, India
                  </div>

                  <p className="text-sm font-sans text-[var(--text)]/85 leading-relaxed mb-6">
                    "{siteConfig.founder.bio}"
                  </p>

                  <div className="pt-4 border-t border-[var(--text)]/10 flex items-center gap-4 text-xs font-mono">
                    <a
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline inline-flex items-center gap-1 focus-ring"
                    >
                      GitHub Profile <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline inline-flex items-center gap-1 focus-ring"
                    >
                      LinkedIn <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Reveal delay={1}>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--dark)]">
                  Built to build things that actually work.
                </h2>
                <div className="space-y-4 text-sm font-sans text-[var(--text)]/85 leading-relaxed">
                  <p>
                    Most web and software projects fail not because of insufficient frameworks, but because of poor taste, unnecessary layers of abstraction, and a lack of direct engineering accountability.
                  </p>
                  <p>
                    At ExDevX, clients collaborate directly with systems engineers—never account managers or outsourced junior subcontractors. We scope tightly, eliminate speculative features, write strict TypeScript, and deploy self-healing automated pipelines.
                  </p>
                  <p>
                    From rural agricultural logistics in Maharashtra (KisanPool) to institutional portals handling tens of thousands of students without a glitch (ssnlc.in), our work is engineered for resilient reality.
                  </p>
                </div>

                <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[var(--text)]/10 text-xs font-mono">
                  <div>
                    <span className="block text-[var(--primary)] font-bold text-lg">2022</span>
                    <span className="text-[var(--text)]/60 uppercase">Year Founded</span>
                  </div>
                  <div>
                    <span className="block text-[var(--primary)] font-bold text-lg">Pune, MH</span>
                    <span className="text-[var(--text)]/60 uppercase">Operations Hub</span>
                  </div>
                  <div>
                    <span className="block text-[var(--primary)] font-bold text-lg">100%</span>
                    <span className="text-[var(--text)]/60 uppercase">In-House Engineering</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Agency Values (Single Dark Section Band) */}
      <Section tone="dark">
        <Container>
          <Reveal>
            <SectionHeading
              tag="Core Invariants"
              title="Three pillars that govern every engagement"
              description="These aren't marketing slogans. They are architectural guidelines applied to every line of code we ship."
              tone="dark"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-[var(--bg)]/5 border border-[var(--bg)]/10 rounded-xs">
                <span className="text-xs font-mono text-[var(--accent)] font-bold block mb-2">01 / PRINCIPLE</span>
                <h3 className="font-display text-2xl font-medium text-[var(--bg)] mb-3">
                  Execution Over Theory
                </h3>
                <p className="text-xs text-[var(--bg)]/80 leading-relaxed font-sans">
                  We don't waste client budgets on 60-page slide decks or speculative user personas. We validate through working staging builds, reproducible prototypes, and measurable metrics.
                </p>
              </div>

              <div className="p-6 bg-[var(--bg)]/5 border border-[var(--bg)]/10 rounded-xs">
                <span className="text-xs font-mono text-[var(--accent)] font-bold block mb-2">02 / PRINCIPLE</span>
                <h3 className="font-display text-2xl font-medium text-[var(--bg)] mb-3">
                  Automation First
                </h3>
                <p className="text-xs text-[var(--bg)]/80 leading-relaxed font-sans">
                  If an operational task repeats more than twice, it gets codified into an automated worker, cron schedule, or LLM agent. Humans should make decisions; machines should run the loops.
                </p>
              </div>

              <div className="p-6 bg-[var(--bg)]/5 border border-[var(--bg)]/10 rounded-xs">
                <span className="text-xs font-mono text-[var(--accent)] font-bold block mb-2">03 / PRINCIPLE</span>
                <h3 className="font-display text-2xl font-medium text-[var(--bg)] mb-3">
                  Self-Hosted & Resilient Infra
                </h3>
                <p className="text-xs text-[var(--bg)]/80 leading-relaxed font-sans">
                  We architect systems that can run anywhere: Docker, Dokploy, VPS, AWS, or bare metal. No lock-in traps or unpredictable runaway billings.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Milestone Timeline */}
      <Section tone="default">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              tag="Chronology"
              title="Milestones since inception"
              align="center"
            />

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-[1px] before:bg-[var(--text)]/15">
              <div className="relative flex items-start gap-6 pl-10">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-[var(--bg)]" />
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--primary)]">2022</span>
                  <h4 className="font-display text-lg font-semibold text-[var(--dark)] mt-0.5">
                    Founding in Maharashtra, India
                  </h4>
                  <p className="text-xs text-[var(--text)]/80 font-sans mt-1 leading-relaxed">
                    ExDevX established by Abhay Jadhav to build custom web and mobile applications for local businesses and early-stage innovators.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6 pl-10">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-[var(--bg)]" />
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--primary)]">2023</span>
                  <h4 className="font-display text-lg font-semibold text-[var(--dark)] mt-0.5">
                    Institutional & Large Scale Platforms
                  </h4>
                  <p className="text-xs text-[var(--text)]/80 font-sans mt-1 leading-relaxed">
                    Designed and deployed high-traffic institutional portals including ssnlc.in, digitizing admissions for thousands of candidates with zero downtime.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6 pl-10">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-[var(--bg)]" />
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--primary)]">2024 - Present</span>
                  <h4 className="font-display text-lg font-semibold text-[var(--dark)] mt-0.5">
                    AI Agent Workflows & Quantitative Automation
                  </h4>
                  <p className="text-xs text-[var(--text)]/80 font-sans mt-1 leading-relaxed">
                    Expanded core practice to include Gemini API reasoning agents, autonomous data ingestion, and agricultural logistics networks (KisanPool).
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;
