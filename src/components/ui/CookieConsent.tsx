import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cookie, X, Check, SlidersHorizontal } from 'lucide-react';
import { Button } from './Button';

const STORAGE_KEY = 'exdevx_cookie_consent_v1';
const GA_MEASUREMENT_ID = 'G-596L687V72';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

/**
 * Dynamically loads Google Analytics only when user has given explicit consent.
 */
function initializeGoogleAnalytics() {
  if (typeof window === 'undefined') return;

  // Check if already injected
  if (document.getElementById('ga-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
}

/**
 * Removes Google Analytics scripts if user revokes consent
 */
function removeGoogleAnalytics() {
  if (typeof window === 'undefined') return;
  const script = document.getElementById('ga-gtag-script');
  if (script) {
    script.remove();
  }
}

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        if (parsed.analytics) {
          initializeGoogleAnalytics();
        }
      } else {
        // Delay display slightly to avoid layout flicker on initial paint
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // In case localStorage is disabled in strict private windows
      setIsVisible(true);
    }
  }, []);

  // Listen for custom event triggered from footer "Cookie Settings" link
  useEffect(() => {
    const handleOpenPreferences = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as CookiePreferences;
          setAnalyticsOptIn(parsed.analytics);
        }
      } catch (e) {
        // noop
      }
      setIsPreferencesOpen(true);
      setIsVisible(false);
    };

    window.addEventListener('open-cookie-preferences', handleOpenPreferences);
    return () => window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
  }, []);

  // Keyboard navigation: Escape key closes preferences modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreferencesOpen) {
        setIsPreferencesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPreferencesOpen]);

  const savePreferences = (analytics: boolean) => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      // noop
    }

    if (analytics) {
      initializeGoogleAnalytics();
    } else {
      removeGoogleAnalytics();
    }

    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true);
  };

  const handleRejectNonEssential = () => {
    savePreferences(false);
  };

  const handleSaveCustomPreferences = () => {
    savePreferences(analyticsOptIn);
  };

  if (!isVisible && !isPreferencesOpen) {
    return null;
  }

  return (
    <>
      {/* ── Main Banner ── */}
      {isVisible && !isPreferencesOpen && (
        <section
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[var(--surface)] border-t border-[var(--text)]/15 shadow-2xl animate-in slide-in-from-bottom duration-200"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 max-w-2xl">
              <div className="w-8 h-8 rounded-xs bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm font-sans text-[var(--text)]/85 leading-relaxed">
                <p>
                  We use strictly essential cookies for site functionality and optional anonymous Google Analytics (GA4) to understand how visitors navigate our work. Analytics cookies are never loaded without your consent.{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-[var(--primary)] underline hover:text-[var(--dark)] font-medium focus-ring rounded-xs"
                  >
                    Read our Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs"
              >
                Accept All
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRejectNonEssential}
                className="text-xs"
              >
                Reject Non-Essential
              </Button>
              <button
                type="button"
                onClick={() => setIsPreferencesOpen(true)}
                className="px-3 py-1.5 text-xs font-mono font-medium text-[var(--primary)] hover:underline focus-ring rounded-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Manage Preferences</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Manage Preferences Modal ── */}
      {isPreferencesOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--dark)]/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--text)]/15 rounded-xs p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--text)]/10 mb-6">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[var(--primary)]" />
                <h3
                  id="cookie-preferences-title"
                  className="font-display text-xl font-semibold text-[var(--dark)]"
                >
                  Cookie & Tracking Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPreferencesOpen(false)}
                className="p-1 text-[var(--text)]/60 hover:text-[var(--text)] focus-ring rounded-xs cursor-pointer"
                aria-label="Close preferences dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text)]/80 font-sans leading-relaxed mb-6">
              Customize which categories of cookies and telemetry you allow ExDevX to use. Essential cookies cannot be disabled as they are required for security and core site operation.
            </p>

            <div className="space-y-4 mb-8">
              {/* Essential Category */}
              <div className="p-4 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xs flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-sm text-[var(--dark)]">
                      Essential Cookies
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-[var(--surface)] px-1.5 py-0.5 text-[var(--primary)] border border-[var(--text)]/10">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text)]/70 mt-1">
                    Required for site security, navigation memory, and storing your cookie choice.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="w-4 h-4 mt-1 accent-[var(--primary)] cursor-not-allowed opacity-70"
                  aria-label="Essential cookies (always enabled)"
                />
              </div>

              {/* Analytics Category */}
              <div className="p-4 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xs flex items-start justify-between gap-4">
                <div>
                  <span className="font-display font-semibold text-sm text-[var(--dark)] block">
                    Performance & Analytics (GA4)
                  </span>
                  <p className="text-xs text-[var(--text)]/70 mt-1">
                    Measures aggregated pageviews, visitor journeys, and referral sources using Google Analytics (ID: G-596L687V72). IP addresses are anonymized.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={analyticsOptIn}
                    onChange={(e) => setAnalyticsOptIn(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Enable Performance and Analytics cookies"
                  />
                  <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--primary)]" />
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[var(--text)]/10">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto text-xs"
              >
                Reject All Non-Essential
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleSaveCustomPreferences}
                className="w-full sm:w-auto text-xs"
              >
                Save My Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
