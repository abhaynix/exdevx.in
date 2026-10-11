# Privacy, Cookie Consent & Accessibility Architecture for ExDevX

Comprehensive enhancements for the ExDevX agency website covering privacy compliance, GA4 cookie gating, accessible consent controls, business and portfolio consistency, and draft legal terms.

## User Review & Critical Decisions

> [!IMPORTANT]
> Key preferences confirmed during interactive scoping:
> - **Google Analytics (GA4)**: Retained with strict consent gating (`G-596L687V72`). GA4 will not execute or place cookies until explicit consent is granted.
> - **Payment & Refund Policy**: ExDevX conducts billing exclusively via invoices, bank transfers, and UPI; no on-site checkout or payment gateway exists, so an online refund policy is omitted in favor of standard service agreement terms.
> - **Data Retention**: Form submissions will be retained until the enquiry is resolved, with automated deletion / manual purging after 180 days.
> - **Legal Disclaimer**: All policy texts are explicitly presented as drafts for review by an India-qualified lawyer under the Digital Personal Data Protection Act (DPDP Act 2023) and IT Act 2000.

---

## 1. Overview & Core Concept

- **What It Delivers**:
  1. **Accessible Cookie Consent Banner & Preferences Modal**: A floating, keyboard-navigable banner allowing visitors to **Accept All**, **Reject All**, or **Manage Preferences** (Essential vs Analytics). GA4 script is dynamically injected only upon consent and persisted across visits in `localStorage`.
  2. **Dedicated Privacy & Cookies Governance**: Comprehensive `/privacy-policy` covering form data collection, 180-day retention schedule, third-party network requests (Google Fonts, ImageKit, WhatsApp, Google Analytics), and data subject rights.
  3. **Contact Form Privacy Notice**: A clear, unobtrusive notice placed directly beside the submission CTA with a direct link to `/privacy-policy`.
  4. **Terms & Conditions (`/terms-of-service`)**: Clear B2B terms covering statements of work, IP ownership transfer, invoice payment terms, 30-day warranty, and Maharashtra jurisdiction.
  5. **Accessibility & Contrast Audit**: Verification of `<label>` associations, ARIA live regions, focus indicators (`focus-ring`), empty alt tags on decorative icons, and reduced-motion fallbacks.
  6. **Business Accuracy Review**: Verification of founder name (Abhay Jadhav), founding date (2022), location (Pune & Ahilyanagar, Maharashtra), and portfolio case studies without unverified claims.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **First-Time Visitor**:
   - Sees the page in warm ivory (`--bg: #EAE6DE`) with midnight navy bands.
   - A quiet, bottom-anchored cookie consent bar appears with three clear actions: **Accept Analytics**, **Decline Non-Essential**, and **Customize Preferences**.
   - If accepted, GA4 initializes; if declined or closed, GA4 remains completely inactive.
2. **Contact Submission Flow**:
   - Visitor fills out Name, Email, Service, Budget, and Message.
   - Directly next to or under the submit button, a privacy statement informs the visitor: *"By submitting, you agree to our privacy policy. Your information is retained for up to 180 days strictly to respond to your project enquiry."*
   - Real-time feedback appears in an accessible `aria-live` container.

### Visual Styling & Design System
- **Colors & Tokens**:
  - Background: `--surface` (`#F4F1EB`) for modal/card panels with border `border-[var(--text)]/15`.
  - Buttons: `--accent` (`#EF8557`) with `--on-accent` (`#021861`) text for primary actions; outline borders with `--primary` (`#226192`) for secondary actions.
  - Zero-pill discipline: Unboxed text metadata separated by `·`.
- **Keyboard & Screen Reader Support**:
  - Esc key closes preference modals; Tab focus is constrained.
  - Visible focus rings (`outline: 2px solid var(--primary)`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Cookie Consent Architecture**
  - *Chosen Approach*: Lightweight React component (`src/components/ui/CookieConsent.tsx`) managing consent state via `localStorage` key `exdevx_cookie_consent_v1`. It controls Google Analytics injection dynamically rather than loading `gtag.js` unconditionally in `index.html`.
  - *Why*: Ensures zero non-essential cookies or tracker requests happen prior to user consent, adhering to GDPR, UK DPA, and DPDP best practices.
  - *Alternative Considered*: External consent managers (e.g., Cookiebot/OneTrust), rejected to avoid third-party script bloat, layout shift, and heavy monthly subscriptions.

- **Decision 2: Third-Party Network Embed Transparency**
  - *Chosen Approach*: Detail in `/privacy-policy` exactly which external origins the site connects to:
    1. **Google Analytics (GA4)**: `googletagmanager.com` (user telemetry, only loaded after consent).
    2. **Google Fonts**: `fonts.googleapis.com` / `fonts.gstatic.com` (font file delivery).
    3. **ImageKit.io**: `ik.imagekit.io` (brand logo asset CDN).
    4. **WhatsApp**: `wa.me` (direct user-initiated messaging link).
  - *Why*: Transparent disclosure without breaking working fonts or logos.

---

## 4. Technical Architecture & Component Mapping

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│                                                             │
│  ┌─────────────────────────┐   ┌─────────────────────────┐  │
│  │   CookieConsent Banner  │──>│  localStorage Consent   │  │
│  │  (Accept / Reject / Opt)│   │ (exdevx_consent_v1)     │  │
│  └────────────┬────────────┘   └────────────┬────────────┘  │
│               │                             │               │
│               ▼ Consent = 'all'             │               │
│  ┌─────────────────────────┐                │               │
│  │  Dynamic GA4 Injection  │                │               │
│  │  (gtag G-596L687V72)    │                │               │
│  └─────────────────────────┘                │               │
│                                             │               │
│  ┌─────────────────────────┐                │               │
│  │  ContactForm + Notice   │<───────────────┘               │
│  │  (180-day retention)    │                                │
│  └─────────────────────────┘                                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Legal Routes: /privacy-policy and /terms-of-service  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component & File Changes
1. **`index.html`**:
   - Remove unconditional `gtag` script tags so GA4 is strictly consent-driven.
   - Keep `<noscript>` content and SEO metadata intact.
2. **`src/components/ui/CookieConsent.tsx`**:
   - Floating banner and preference drawer.
   - Dynamic GA4 loader function upon affirmative consent.
   - Re-openable via footer link ("Cookie Preferences").
3. **`src/components/sections/ContactForm.tsx`**:
   - Add privacy notice text and link beside the submit button.
   - Retain necessary fields (name, email, service, budget, message) + honeypot.
4. **`src/pages/PrivacyPolicyPage.tsx`**:
   - Comprehensive draft privacy policy:
     - Data collected via forms (name, email, requirements).
     - 180-day retention guideline.
     - Google Analytics disclosure & cookie types.
     - Third-party CDN disclosures (Google Fonts, ImageKit).
     - Contact details (`hello@exdevx.in`, +91 88301 74066).
     - Disclaimer: *"Draft text for review by an India-qualified lawyer."*
5. **`src/pages/TermsPage.tsx`**:
   - Formalize business terms: invoicing & bank transfer payments, no online deposit/checkout, IP ownership transfer, 30-day warranty, Maharashtra jurisdiction.
6. **`src/components/ui/Footer.tsx`**:
   - Add "Cookie Settings" trigger link alongside Privacy Policy and Terms of Service.
7. **Verification**:
   - `npm run lint` (`tsc --noEmit`)
   - `npm run build` (SSG prerender check)
   - Dev server verification on port 3000.
