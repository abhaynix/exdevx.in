import React from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SEO } from '../components/ui/SEO';

export const CookiePolicyPage: React.FC = () => (
  <>
    <SEO title="Cookie Policy | ExDevX" description="Cookie and browser storage details for the ExDevX website, including optional analytics preferences." />
    <section className="pt-16 pb-12 border-b border-[var(--text)]/10 bg-[var(--bg)]">
      <Container size="narrow">
        <div className="text-xs font-mono tracking-widest text-[var(--primary)] font-bold mb-2">Legal and governance</div>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-[var(--dark)]">Cookie policy</h1>
        <p className="text-xs font-mono text-[var(--text)]/60 mt-3">Last updated: October 2026</p>
      </Container>
    </section>
    <Section tone="surface">
      <Container size="narrow">
        <div className="prose prose-slate max-w-none space-y-8 text-sm font-sans text-[var(--text)]/85 leading-relaxed">
          <p>The site does not load Google Analytics until you accept optional analytics. Rejecting or withdrawing consent disables analytics and attempts to clear its cookies. You can change your choice at any time with the “Cookie settings” control in the footer.</p>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Storage used by this site</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>Necessary preference storage:</strong> browser local storage key <code>exdevx-cookie-consent</code> remembers whether you accepted or rejected optional analytics. It is not a cookie and is used only to apply your choice.</li>
              <li><strong>Optional analytics cookies:</strong> after consent, Google Analytics may use first-party cookies such as <code>_ga</code> and <code>_ga_*</code> to distinguish users and maintain session state. Google documents a default expiry of two years; property settings and browser limits can change the actual duration. See <a className="text-[var(--primary)] underline" href="https://support.google.com/analytics/answer/11397207?hl=en" target="_blank" rel="noopener noreferrer">Google Analytics cookie details</a>.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">Your choices</h2>
            <p>On a first visit, choose “Accept optional cookies,” “Reject optional cookies,” or “Customise.” Customise lets you enable or disable Google Analytics. The choice is saved in your browser. Clearing local storage resets the site to ask again. If browser storage is unavailable, the selection applies for the current page visit only.</p>
            <button type="button" onClick={() => window.dispatchEvent(new Event('exdevx:open-cookie-settings'))} className="mt-3 rounded-xs border border-[var(--control-border)] px-4 py-2 font-semibold text-[var(--primary)] underline underline-offset-2 focus-ring">Open cookie settings</button>
          </section>
          <p>Read the <a href="/privacy-policy" className="text-[var(--primary)] underline">Privacy Policy</a> for information about data processing and third-party services.</p>
        </div>
      </Container>
    </Section>
  </>
);

export default CookiePolicyPage;
