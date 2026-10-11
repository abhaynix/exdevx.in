import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceList } from './components/ServiceList';
import { WorkList } from './components/WorkList';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Section } from './components/Section';

export default function App(): React.ReactElement {
  return (
    <>
      {/* Accessible Skip Link */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Main Single-Column Editorial Canvas (max 960px) */}
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 sm:px-12 md:px-16 max-w-[960px] mx-auto flex flex-col justify-between selection:bg-[var(--line)]">
        <Header />

        <main id="main">
          <Hero />

          <Section id="services" ariaLabelledBy="services-heading">
            <ServiceList />
          </Section>

          <Section id="work" ariaLabelledBy="work-heading">
            <WorkList />
          </Section>

          <Section id="contact" ariaLabelledBy="contact-heading">
            <Contact />
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
}
