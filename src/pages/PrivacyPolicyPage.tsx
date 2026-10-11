import React from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../data/site';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | ExDevX"
        description="Privacy policy and data governance practices of ExDevX engineering agency."
      />

      <section className="pt-16 pb-12 border-b border-[var(--text)]/10 bg-[var(--bg)]">
        <Container size="narrow">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
            Legal & Governance
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-[var(--dark)]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[var(--text)]/60 mt-3">
            Last Updated: October 2026 · ExDevX, Maharashtra, India
          </p>
        </Container>
      </section>

      <Section tone="surface">
        <Container size="narrow">
          <div className="prose prose-slate max-w-none space-y-8 text-sm font-sans text-[var(--text)]/85 leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                1. Data Minimization Principle
              </h2>
              <p>
                ExDevX respects your privacy. We collect only the information necessary to evaluate project inquiries, communicate regarding active engineering engagements, and maintain system security. We do not sell, rent, or trade your contact data to any third party.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                2. Information We Collect
              </h2>
              <p>
                When you submit our contact form or contact us via email/WhatsApp, we receive your name, email address, project specifications, and timeline requirements. Server access logs collect standard non-identifying telemetry (IP address, user agent, requested URLs) strictly for rate-limiting and DDoS defense.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                3. Confidentiality & Non-Disclosure
              </h2>
              <p>
                All proprietary source code, architecture schematics, and business logic shared with ExDevX during consultation and project delivery remain strictly confidential under standard mutual NDA agreements.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                4. Inquiries & Data Removal
              </h2>
              <p>
                To request deletion of your contact records or inquiry data, please email our security officer at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--primary)] underline font-medium">
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default PrivacyPolicyPage;
