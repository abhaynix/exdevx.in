import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../data/site';

export const PrivacyPolicyPage: React.FC = () => (
  <>
    <SEO title="Privacy Policy | ExDevX" description="Learn what information the ExDevX website processes, why it is used, and how to contact us about privacy." />
    <section className="pt-16 pb-12 border-b border-[var(--text)]/10 bg-[var(--bg)]">
      <Container size="narrow">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold mb-2">Legal & Governance</div>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-[var(--dark)]">Privacy Policy</h1>
        <p className="text-xs font-mono text-[var(--text)]/60 mt-3">Last updated: October 2026 · ExDevX, Maharashtra, India</p>
      </Container>
    </section>
    <Section tone="surface">
      <Container size="narrow">
        <div className="prose prose-slate max-w-none space-y-8 text-sm font-sans text-[var(--text)]/85 leading-relaxed">
          <p>This notice describes data handling visible in the ExDevX website code. It is not a statement that ExDevX or this website is legally compliant. The legal entity operating the site and its registered address are not identified here.</p>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Information and purposes</h2>
            <p>The project inquiry form asks for your name, email address, selected service, an optional budget or timeline, and your message. These details are used to respond to the inquiry and discuss a possible engagement. If no form receiver is configured, your browser opens a prefilled email draft addressed to {siteConfig.contact.email}; information is sent only if you choose to send it.</p>
            <p className="mt-3">If an online contact endpoint is configured for a deployment, the form sends those fields, plus a submission timestamp and site source label, to that endpoint. The endpoint and its storage practices are deployment-specific and are not controlled or verified by this repository. Please avoid including sensitive personal information in an inquiry.</p>
            <p className="mt-3">The AI chat sends the message you submit and up to 20 earlier messages in that chat to the website's server. When the Gemini integration is enabled, the server sends that conversation to Google's Gemini API to generate a reply. Chat history is held in page memory and is not saved by the website code to browser storage.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Analytics and technical information</h2>
            <p>Google Analytics is available but is loaded only after you choose “Accept optional cookies.” If you reject or withdraw that choice, analytics is disabled and Google Analytics cookies are cleared where the browser permits. The hosting platform may process standard request and security logs; the hosting provider and log retention depend on the deployment. The website code does not set a retention period for those logs.</p>
            <p className="mt-3">The site uses local storage to remember your analytics choice. It does not use advertising pixels or embedded video, map, or social media widgets. Google Analytics and Gemini are third-party services; their processing is subject to their own terms and privacy documentation.</p>
            <p className="mt-3">The page references an Apple touch icon and social-share image hosted by ImageKit. A browser or social platform may request those files from ImageKit and disclose ordinary connection data such as an IP address. Website fonts are served from the site's own assets.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Sharing and retention</h2>
            <p>Information is sent to the services described above only when the relevant feature is used or enabled. The codebase does not include a contact database or define retention periods for email, configured webhook, hosting, analytics, or Gemini records. Retention by those systems depends on the account and deployment settings and needs confirmation by the site operator.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Your requests and contact</h2>
            <p>You may contact us to ask about information associated with an inquiry, request correction or deletion where applicable, or raise a privacy concern. Write to{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--primary)] underline font-medium">{siteConfig.contact.email}</a>.
              Please include enough context for us to locate the request, and do not send identity documents unless we ask through an appropriate channel. This email is the listed contact; no separate Data Protection Officer is identified on the site.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Indian privacy law</h2>
            <p>The Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 have phased commencement provisions. Which requirements apply to the operator and each processing activity depends on the facts and applicable commencement dates. See the <a href="https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Act</a> and the <a href="https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">Rules</a>. This policy is not a legal opinion; the operator should obtain qualified Indian legal advice and update this notice and its operational processes accordingly.</p>
          </section>
          <p>For cookie details or to change your optional analytics choice, see the <Link to="/cookie-policy" className="text-[var(--primary)] underline">Cookie Policy</Link> or use “Cookie settings” in the site footer.</p>
        </div>
      </Container>
    </Section>
  </>
);

export default PrivacyPolicyPage;
