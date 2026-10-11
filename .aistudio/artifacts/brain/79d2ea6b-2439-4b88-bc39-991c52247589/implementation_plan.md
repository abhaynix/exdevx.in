# Minimal Editorial Single-Page Agency Website for ExDevX

A radical, disciplined single-page redesign for **ExDevX** (`exdevx.in`) focused on editorial restraint: fewer elements, generous whitespace, strong typography, and zero decorative fluff.

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisions confirmed in Phase 1:
> - **Font Loading**: Preconnect to Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) with `display=swap` for Fraunces 500 and Inter 400/500, avoiding font file bundle bloat and ensuring instant swap.
> - **Arrow Glyph**: Clean inline Unicode arrow character (`→`) with CSS transform on hover for work links, requiring zero external SVG or icon library dependencies.
> - **Cut List strictly enforced**: No router, no icon library, no animation library, no chat widget, no contact form, no stats strips, no badges, no dark sections, no cards, no gradients.

---

## 1. Overview & Core Concept

- **Core Vision**: A high-end editorial broadsheet aesthetic inspired by restrained Swiss typography and literary engineering journals.
- **Color Palette & Discipline**:
  - `--bg: #EAE6DE` (Single uniform background throughout the entire page; no dark section bands)
  - `--text: #0B1A33` (High-contrast deep ink body and headline text)
  - `--muted: #5B6577` (Secondary editorial text, passing 5:1 contrast on `--bg`)
  - `--primary: #226192` (Links, hover transitions, and thin focus outlines)
  - `--line: #D8D2C6` (Subtle 1px structural dividing rules)
  - `--accent: #EF8557` (Coral: Used exactly once per viewport: the CTA button and the dot in "ExDevX.")
  - `--on-accent: #021861` (Dark navy text on coral CTA button for WCAG AA compliance)
- **Zero-Waste Asset Budget**: Target under 60KB gzipped JS, zero layout shift (CLS 0.000), Lighthouse 100 on Performance, Accessibility, Best Practices, and SEO.

---

## 2. User Experience & Visual Design

### Single-Page Layout Rhythm
- **Container**: Single centered column, max width `960px`, fluid side padding (`24px` mobile, `64px` desktop).
- **Vertical Rhythm**: `80px` section gap on mobile, `128px` on desktop.
- **Visual Structure**: Only whitespace and 1px `--line` dividers. No cards, no elevation shadows, no background toggling.

### Typography Hierarchy
- **Headlines**: Fraunces 500 (serif), `clamp(2.5rem, 7vw, 5.5rem)`, line-height `1.05`, letter-spacing `-0.02em`.
- **Body & Subtitles**: Inter regular (sans-serif) 17px, line-height `1.65`, maximum line length `56ch`.
- **Labels & Numbers**: Inter 12px uppercase, letter-spacing `0.08em`, color `--muted`.

### Motion & Micro-Interactions (CSS-Only)
- **Initial Load**: Single subtle 8px fade-and-rise CSS animation (`@keyframes fadeRise`).
- **Interactive Links**: Smooth hover color change to `--primary`, work item names shift subtly, arrow glyph shifts 4px right (`transform: translateX(4px)`).
- **Reduced Motion**: All animations disabled if `prefers-reduced-motion: reduce` is active.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Elimination of Client-Side Router**
  - *Chosen Approach*: Single-page React application with accessible anchor navigation (`#services`, `#work`, `#contact`).
  - *Why*: Removes React Router runtime overhead, keeps gzipped bundle under 25KB, eliminates route chunking latency, and improves browser cache efficiency.
- **Decision 2: Direct Mailto & WhatsApp Instead of Complex Form**
  - *Chosen Approach*: Large serif `mailto:hello@exdevx.in` and direct WhatsApp line.
  - *Why*: Senior engineering clients and founders prefer direct correspondence. Eliminates spam honeypots, recaptcha scripts, state management bloat, and server endpoint dependencies.
- **Decision 3: Zero Component Hardcoding**
  - *Chosen Approach*: All copy, titles, services, and project outcomes live in a strictly typed data model (`src/data/site.ts`).
  - *Why*: Clean separation of data and presentation with zero duplicated text strings across components.

---

## 4. Technical Architecture & Component Mapping

```
┌─────────────────────────────────────────────────────────────┐
│                          index.html                         │
│  (SEO Head + Preconnect Fonts + Preload + JSON-LD Schema)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                           App.tsx                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ SkipLink: "#main" (Visible on focus)                  │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ Header: "ExDevX." wordmark + desktop/mobile nav       │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ <main id="main">                                      │  │
│  │   ├── Hero: H1 + Sub + Coral Button + "See work"      │  │
│  │   ├── Section#services: 4-row plain numbered list     │  │
│  │   ├── Section#work: 4-row project archive with arrows │  │
│  │   └── Section#contact: Large serif email + WhatsApp   │  │
│  │ </main>                                               │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ Footer: Single-line © 2026 ExDevX · Founded by Abhay  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    src/data/site.ts                         │
│      (Strictly typed metadata, services, and projects)      │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown
1. **`src/styles/tokens.css` & `src/styles/globals.css`**: Strict token definitions, font declarations, skip link, focus rings (`outline: 2px solid var(--primary)` with `3px offset`), and CSS-only `fadeRise` animation.
2. **`src/data/site.ts`**: Pure data file with TypeScript types (`SiteData`, `Service`, `Project`).
3. **`src/components/Header.tsx`**: Wordmark with coral dot (`<span className="text-[var(--accent)]">.</span>`), anchor links (`#services`, `#work`, `#contact`), collapsed to logo + Contact link on mobile without any hamburger menu.
4. **`src/components/Hero.tsx`**: Headline clamp, subtitle, primary CTA button (`mailto:`), text link (`#work`).
5. **`src/components/ServiceList.tsx`**: Plain 4-row numbered list separated by 1px `--line` rules.
6. **`src/components/WorkList.tsx`**: 4-row project list (KisanPool, ssnlc.in, Sumit Ubale, PerpWise AI) with clean hover shifts.
7. **`src/components/Contact.tsx`**: Large serif email link, WhatsApp coordinate, location.
8. **`src/components/Footer.tsx`**: Clean single-line attribution.
9. **`src/components/Section.tsx`**: Reusable semantic section container with accessible `aria-labelledby`.
10. **`index.html`**: Clean static head with full meta tags, OpenGraph, Twitter card, JSON-LD Organization graph, and Google Fonts preconnect.
11. **`README.md`**: Complete documentation for build, preview, and deployment (Vercel & Dokploy multi-stage Dockerfile).

---

## 5. Verification Plan

1. **Bundle Size & Speed**: Run `npm run build` and verify total gzipped JS is well under the 60KB budget.
2. **Type Safety**: Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors under strict mode.
3. **Visual & Contrast Verification**: Test keyboard tab order, skip link functionality, visible focus rings, and contrast compliance against `--bg`.
