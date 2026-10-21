import { useEffect, useState } from 'react';

const CONSENT_KEY = 'exdevx-cookie-consent';
const GA_ID = 'G-596L687V72';
type Choice = 'accepted' | 'rejected';

function setAnalyticsDisabled(disabled: boolean) {
  const analyticsWindow = window as unknown as {
    [key: string]: unknown;
    gtag?: (...args: unknown[]) => void;
  };
  analyticsWindow[`ga-disable-${GA_ID}`] = disabled;
  analyticsWindow.gtag?.('consent', 'update', { analytics_storage: disabled ? 'denied' : 'granted' });
}

function clearAnalyticsCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) return;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.exdevx.in; SameSite=Lax`;
  });
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(CONSENT_KEY);
    } catch {
      // Consent controls remain available for the current visit without storage.
    }
    if (saved === 'accepted' || saved === 'rejected') setChoice(saved);
    setAnalyticsDisabled(saved !== 'accepted');

    const openSettings = () => {
      setCustomize(false);
      setAnalyticsEnabled(choice === 'accepted');
      setOpen(true);
    };
    window.addEventListener('exdevx:open-cookie-settings', openSettings);
    return () => window.removeEventListener('exdevx:open-cookie-settings', openSettings);
  }, [choice]);

  useEffect(() => {
    if (choice !== 'accepted') return;
    setAnalyticsDisabled(false);
    if (!document.querySelector('script[data-exdevx-analytics]')) {
      const script = document.createElement('script');
      script.src = '/gtag-init.js';
      script.dataset.exdevxAnalytics = 'true';
      document.head.appendChild(script);
    }
  }, [choice]);

  const saveChoice = (nextChoice: Choice) => {
    setAnalyticsDisabled(nextChoice !== 'accepted');
    if (nextChoice === 'rejected') clearAnalyticsCookies();
    try {
      localStorage.setItem(CONSENT_KEY, nextChoice);
    } catch {
      // The choice still applies for this visit if storage is unavailable.
    }
    setChoice(nextChoice);
    setCustomize(false);
    setOpen(false);
  };

  if (!open && choice !== null) return null;

  return (
    <section
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-sm border border-[var(--text)]/15 bg-[var(--surface)] p-5 shadow-2xl sm:inset-x-6 sm:bottom-6"
    >
      <h2 className="font-display text-lg font-semibold text-[var(--dark)]">Your privacy choices</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/80">
        This site uses necessary browser storage to remember your choice. Optional Google Analytics helps us understand site visits and loads only if you allow it. See our{' '}
        <a className="text-[var(--primary)] underline underline-offset-2 focus-ring" href="/cookie-policy">Cookie Policy</a>.
      </p>

      {customize && (
        <div className="mt-4 rounded-xs border border-[var(--text)]/10 p-3">
          <p className="text-sm font-medium text-[var(--dark)]">Optional analytics</p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--text)]/75">Google Analytics may use cookies to measure visits. You can change this choice later using Cookie settings in the footer.</p>
          <label className="mt-3 flex items-center gap-2 text-sm text-[var(--text)]">
            <input id="analytics-consent" type="checkbox" checked={analyticsEnabled} onChange={(event) => setAnalyticsEnabled(event.target.checked)} className="size-4 accent-[var(--primary)]" />
            Allow Google Analytics
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {!customize ? (
          <>
            <button type="button" onClick={() => saveChoice('accepted')} className="rounded-xs bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--on-accent)] hover:bg-[var(--accent-hover)] focus-ring">Accept optional cookies</button>
            <button type="button" onClick={() => saveChoice('rejected')} className="rounded-xs border border-[var(--control-border)] px-4 py-2 text-sm font-semibold text-[var(--text)] focus-ring">Reject optional cookies</button>
            <button type="button" onClick={() => { setAnalyticsEnabled(choice === 'accepted'); setCustomize(true); }} className="rounded-xs px-3 py-2 text-sm font-semibold text-[var(--primary)] underline underline-offset-2 focus-ring">Customise</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => saveChoice(analyticsEnabled ? 'accepted' : 'rejected')} className="rounded-xs bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--on-accent)] hover:bg-[var(--accent-hover)] focus-ring">Save preferences</button>
            <button type="button" onClick={() => setCustomize(false)} className="rounded-xs border border-[var(--control-border)] px-4 py-2 text-sm font-semibold text-[var(--text)] focus-ring">Back</button>
          </>
        )}
      </div>
    </section>
  );
}
