import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import heroPng from '../assets/hero.png';
import heroWebp from '../assets/hero.webp';
import heroAvif from '../assets/hero.avif';
import manropeLatin from '@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url';
import { siteConfig } from '../data/site';
import { servicesData } from '../data/services';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ServiceCard } from '../components/ui/ServiceCard';
import { WorkCarousel } from '../components/sections/WorkCarousel';
import { TechStrip } from '../components/sections/TechStrip';
import { ProcessStepper } from '../components/sections/ProcessStepper';
import { ContactForm } from '../components/sections/ContactForm';
import { Reveal } from '../components/ui/Reveal';
import { SEO } from '../components/ui/SEO';
import { getOrganizationSchema, getWebSiteSchema } from '../lib/seo';

export const HomePage: React.FC = () => (
  <>
    <Helmet>
      <meta name="theme-color" content="#0E0E10" />
      <link rel="preload" href={manropeLatin} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={heroWebp} as="image" type="image/webp" />
    </Helmet>
    <SEO
      title="ExDevX | Web, Mobile & AI Development"
      description="ExDevX builds web applications, mobile apps, automation systems and AI integrations. Based in Maharashtra, India."
      schema={[getOrganizationSchema(), getWebSiteSchema()]}
    />

    <section className="home-hero">
      <div className="home-hex home-hex-left" aria-hidden="true"><svg viewBox="0 0 180 220"><g fill="none" stroke="currentColor"><path d="M42 25 60 35v20L42 65 24 55V35zM78 45l18 10v20L78 85 60 75V55zM42 65l18 10v20L42 105 24 95V75zM114 65l18 10v20l-18 10-18-10V75zM78 85l18 10v20l-18 10-18-10V95zM42 105l18 10v20l-18 10-18-10v-20z" /></g></svg></div>
      <div className="home-hex home-hex-right" aria-hidden="true"><svg viewBox="0 0 180 220"><g fill="none" stroke="currentColor"><path d="M42 25 60 35v20L42 65 24 55V35zM78 45l18 10v20L78 85 60 75V55zM42 65l18 10v20L42 105 24 95V75zM114 65l18 10v20l-18 10-18-10V75zM78 85l18 10v20l-18 10-18-10V95zM42 105l18 10v20l-18 10-18-10v-20z" /></g></svg></div>
      <Container size="wide" className="home-hero-grid">
        <div className="home-hero-copy">
          <p className="home-badge"><span>Software development · Maharashtra, India</span></p>
          <h1>Engineering<br className="hidden sm:block" /> and Automation</h1>
          <p className="home-hero-description">ExDevX builds web platforms, mobile apps, automation systems and <mark>AI integrations</mark> for businesses.</p>
          <div className="home-hero-actions">
            <Button to="/contact" size="md" className="home-primary-button">Start a project <ArrowUpRight aria-hidden="true" size={16} /></Button>
            <Button href="#work" variant="outline" size="md" className="home-secondary-button">See the work <ChevronDown aria-hidden="true" size={16} /></Button>
          </div>
        </div>
        <picture className="home-portrait">
          <source srcSet={heroWebp} type="image/webp" />
          <source srcSet={heroAvif} type="image/avif" />
          <img src={heroPng} alt="Abhay Jadhav, founder of ExDevX" width="1254" height="1254" fetchPriority="high" />
        </picture>
      </Container>
    </section>

    <WorkCarousel />

    <Section id="services" tone="surface">
      <Container>
        <Reveal>
          <SectionHeading tag="Services" title="What we do" description="From product interfaces to the systems behind them." />
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {servicesData.map((service, index) => (
            <Reveal key={service.id} delay={index}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Button to="/services" variant="ghost" size="sm">All services</Button>
        </div>
      </Container>
    </Section>

    <TechStrip />

    <Section id="process" tone="surface">
      <Container>
        <Reveal><ProcessStepper /></Reveal>
      </Container>
    </Section>

    <Section id="contact">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-3 text-sm font-medium text-[var(--primary)]">Contact</p>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--dark)] sm:text-4xl">Have a project in mind?</h2>
            <p className="mt-4 max-w-md leading-relaxed text-[var(--text)]/80">
              Tell us what you’re looking to build. You can also reach us directly at{' '}
              <a className="text-[var(--primary)] underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
            </p>
            <a className="mt-3 inline-block text-[var(--primary)] underline underline-offset-4" href={siteConfig.contact.whatsappFormatted} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
          </div>
          <div className="lg:col-span-7"><ContactForm /></div>
        </div>
      </Container>
    </Section>
  </>
);

export default HomePage;
