import React from 'react';
import { siteConfig } from '../data/site';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { ContactForm } from '../components/sections/ContactForm';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';
import { Mail, Phone, MapPin, ArrowUpRight, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact Engineering Team | ExDevX"
        description="Initiate a project consultation with ExDevX. Email hello@exdevx.in or WhatsApp +91 88301 74066. Based in Pune & Maharashtra, India."
      />

      {/* Hero Header */}
      <section className="pt-16 pb-20 border-b border-[var(--text)]/10 bg-[var(--bg)]">
        <Container>
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold mb-4">
              Direct Engineering Inquiries
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[var(--dark)] max-w-4xl leading-tight">
              Let's scope your next product deployment.
            </h1>
            <p className="mt-6 text-lg text-[var(--text)]/80 max-w-2xl font-sans leading-relaxed">
              We discuss technical feasibility, architectural trade-offs, and realistic schedules. No pushy sales pitch—just direct conversations with senior engineers.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Contact Content */}
      <Section tone="surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Coordinates & Contact Methods */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <div className="p-8 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xs space-y-6">
                  <h3 className="font-display text-2xl font-semibold text-[var(--primary)]">
                    Fast Track Channels
                  </h3>

                  <div className="space-y-4">
                    <a
                      href={siteConfig.contact.whatsappFormatted}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-[var(--surface)] border border-[var(--text)]/10 rounded-xs flex items-center justify-between hover:border-[var(--primary)] transition-colors group focus-ring block"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-[var(--accent)]" />
                        <div>
                          <div className="font-mono text-xs uppercase text-[var(--text)]/50">
                            Immediate Messaging
                          </div>
                          <div className="font-mono text-sm font-bold text-[var(--dark)]">
                            WhatsApp Business
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="p-4 bg-[var(--surface)] border border-[var(--text)]/10 rounded-xs flex items-center justify-between hover:border-[var(--primary)] transition-colors group focus-ring block"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[var(--primary)]" />
                        <div>
                          <div className="font-mono text-xs uppercase text-[var(--text)]/50">
                            Inquiry Mailbox
                          </div>
                          <div className="font-mono text-sm font-bold text-[var(--dark)]">
                            {siteConfig.contact.email}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                      className="p-4 bg-[var(--surface)] border border-[var(--text)]/10 rounded-xs flex items-center justify-between hover:border-[var(--primary)] transition-colors group focus-ring block"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[var(--primary)]" />
                        <div>
                          <div className="font-mono text-xs uppercase text-[var(--text)]/50">
                            Voice Line
                          </div>
                          <div className="font-mono text-sm font-bold text-[var(--dark)]">
                            {siteConfig.contact.phone}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  <div className="pt-4 border-t border-[var(--text)]/10 text-xs font-mono text-[var(--text)]/70 space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span>{siteConfig.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span>Mon – Sat: 09:00 – 20:00 IST (UTC+5:30)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span>Non-Disclosure Agreements executed prior to code review</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Interactive Form */}
            <div className="lg:col-span-7">
              <Reveal delay={1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Dark Assurance Band */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold mb-3">
                Get in touch
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-[var(--dark)] mb-4">
                What happens after you reach out?
              </h2>
              <p className="text-sm text-[var(--dark)]/85 leading-relaxed font-sans mb-8">
                1. Tell us about your project.<br />
                2. We discuss the project and its requirements.<br />
                3. We share a proposal based on the scope.
              </p>
              <div className="text-xs font-mono text-[var(--dark)]/60">
                No spam. No newsletter additions. No generic sales badgering.
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
};

export default ContactPage;
