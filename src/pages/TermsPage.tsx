import React from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../data/site';

export const TermsPage: React.FC = () => (
  <>
    <SEO title="Terms and Conditions | ExDevX" description="Terms for using the ExDevX website and information about how project engagements are agreed." />
    <section className="pt-16 pb-12 border-b border-[var(--text)]/10 bg-[var(--bg)]">
      <Container size="narrow">
        <div className="text-xs font-mono tracking-widest text-[var(--primary)] font-bold mb-2">Legal and governance</div>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-[var(--dark)]">Terms and Conditions</h1>
        <p className="text-xs font-mono text-[var(--text)]/60 mt-3">Last updated: October 2026 · ExDevX, Maharashtra, India</p>
      </Container>
    </section>
    <Section tone="surface">
      <Container size="narrow">
        <div className="prose prose-slate max-w-none space-y-8 text-sm font-sans text-[var(--text)]/85 leading-relaxed">
          <p>These terms describe use of the ExDevX website. The legal name and form of the business operating this site are not stated here. Website content is general information, not a binding quote or offer to deliver a particular project.</p>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Project engagements</h2>
            <p>A project begins only when the parties accept a written proposal, contract, or Statement of Work. That document should define the scope, deliverables, schedule, fees, payment milestones, acceptance process, support, intellectual property, confidentiality, cancellation, and any refund terms. If a document does not address one of these topics, the parties should resolve it in writing before work begins.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Payments, cancellation, and refunds</h2>
            <p>This website does not take payments or sell subscriptions. It does not set a general advance, cancellation, or refund schedule. Any such terms must be stated in the signed project agreement or proposal; no refund entitlement or exclusion is created by this page.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Intellectual property and confidentiality</h2>
            <p>Ownership, licences, third-party components, portfolio references, and confidentiality are governed by the written project agreement. Do not send information that must remain confidential until confidentiality terms are agreed in writing.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Website content and external services</h2>
            <p>We aim to keep website information current, but service descriptions and examples may change. Links to third-party sites are provided for convenience; their content and privacy practices are controlled by their operators. Do not rely on this page as a substitute for a signed project agreement or legal advice.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Applicable law and questions</h2>
            <p>Applicable law, dispute forum, and any limits or warranties should be set in the project agreement after legal review. For questions about these website terms, contact <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--primary)] underline">{siteConfig.contact.email}</a>. These website terms do not claim to establish a particular court venue.</p>
          </section>
        </div>
      </Container>
    </Section>
  </>
);

export default TermsPage;
