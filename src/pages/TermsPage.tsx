import React from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../data/site';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Service | ExDevX"
        description="Standard terms of service and engineering engagement conditions for ExDevX."
      />

      <section className="pt-16 pb-12 border-b border-[var(--text)]/10 bg-[var(--bg)]">
        <Container size="narrow">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
            Legal & Governance
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-[var(--dark)]">
            Terms of Service
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
                1. Scope of Work & Deliverables
              </h2>
              <p>
                All digital engineering engagements executed by ExDevX are governed by formalized Statements of Work (SOW) specifying milestone deliverables, verification criteria, and acceptance schedules.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                2. Intellectual Property Ownership
              </h2>
              <p>
                Upon completion of agreed payment milestones, full copyright, proprietary code, repository assets, and documentation are transferred 100% to the client. ExDevX reserves only the right to reference non-confidential project titles and outcomes in our portfolio unless a white-label NDA is explicitly executed.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                3. Warranties & Code Integrity
              </h2>
              <p>
                All production code is delivered under strict TypeScript linting and automated unit/integration checks. We provide a complimentary 30-day post-deployment bug remediation warranty for all deliverables scoped in the SOW.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                4. Jurisdiction
              </h2>
              <p>
                Agreements are governed in accordance with the laws of the State of Maharashtra, India.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TermsPage;
