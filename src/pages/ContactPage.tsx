import React from 'react';
import { siteConfig } from '../data/site';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { ContactForm } from '../components/sections/ContactForm';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';
import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => (
  <>
    <SEO
      title="Contact ExDevX"
      description={`Tell us about your project. Contact ExDevX through WhatsApp or email at ${siteConfig.contact.email}.`}
    />
    <section className="pt-16 pb-20 border-b border-[var(--text)]/10 bg-[var(--bg)]">
      <Container>
        <Reveal>
          <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[var(--dark)] max-w-4xl leading-tight">
            Let’s build something great.
          </h1>
          <p className="mt-6 text-lg text-[var(--text)]/80 max-w-2xl font-sans leading-relaxed">
            Share a few project details and review the prefilled message in WhatsApp before sending. Prefer email? Use the address below.
          </p>
        </Reveal>
      </Container>
    </section>
    <Section tone="surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="p-8 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xs space-y-4">
                <a href={siteConfig.contact.whatsappFormatted} target="_blank" rel="noopener noreferrer" className="p-4 bg-[var(--surface)] border border-[var(--text)]/10 rounded-xs flex items-center justify-between hover:border-[var(--primary)] transition-colors group focus-ring">
                  <span className="flex items-center gap-3"><MessageSquare className="w-5 h-5 text-[var(--accent)]" /><span><span className="block font-mono text-xs text-[var(--text)]/50">WhatsApp</span><span className="block font-mono text-sm font-bold text-[var(--dark)]">{siteConfig.contact.phone}</span></span></span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href={`mailto:${siteConfig.contact.email}`} className="p-4 bg-[var(--surface)] border border-[var(--text)]/10 rounded-xs flex items-center justify-between hover:border-[var(--primary)] transition-colors group focus-ring">
                  <span className="flex items-center gap-3"><Mail className="w-5 h-5 text-[var(--primary)]" /><span><span className="block font-mono text-xs text-[var(--text)]/50">Email</span><span className="block font-mono text-sm font-bold text-[var(--dark)]">{siteConfig.contact.email}</span></span></span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={1}><ContactForm headingLevel={2} /></Reveal>
          </div>
        </div>
      </Container>
    </Section>
  </>
);

export default ContactPage;
