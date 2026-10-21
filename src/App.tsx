/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import ScrollToTop from './components/ScrollToTop';
import { CookieConsent } from './components/ui/CookieConsent';

// Lazy-loaded route-level splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
import NotFoundPage from './pages/NotFoundPage';
const ChatWidget = lazy(() => import('./components/ui/ChatWidget'));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[var(--bg)]" aria-busy="true" aria-label="Loading page">
      <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * AppInner — Router-agnostic shell used by client BrowserRouter and SSR prerender
 */
export function AppInner() {
  const isHome = useLocation().pathname === '/';
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <div className={`min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]${isHome ? ' home-theme' : ''}`}>
        <Navbar />
        <main id="main-content" className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<CaseStudyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/terms-of-service" element={<Navigate to="/terms-and-conditions" replace />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent />
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
