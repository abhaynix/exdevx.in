# ExDevX (exdevx.in)

> Minimal, editorial single-page agency website for **ExDevX** — an engineering studio in Maharashtra, India founded in 2022. Built with deliberate restraint: fewer elements, generous whitespace, strong typography, and zero decorative noise.

---

## Design System & Tokens

A strict, high-contrast palette adhering to editorial balance:

```css
:root {
  --bg: #EAE6DE;          /* Single background colour for entire page */
  --text: #0B1A33;        /* High-contrast ink body and headline text */
  --muted: #5B6577;       /* Secondary text, 5:1 contrast on --bg */
  --primary: #226192;     /* Links, hover transitions, focus rules */
  --line: #D8D2C6;        /* 1px structural dividing rules */
  --accent: #EF8557;      /* Coral: ONE use per viewport (CTA button & logo dot) */
  --on-accent: #021861;   /* Text on coral button */
}
```

### Core Invariants
1. **Single Background Color (`--bg`)**: Zero dark sections, zero cards, zero shadows, zero gradients.
2. **Whitespace Structure**: Structure comes exclusively from whitespace and 1px `--line` dividers.
3. **Coral Discipline**: Coral appears at most once per viewport (the CTA button and the dot in "ExDevX."). Never on text.
4. **Contrast**: Text on coral uses `--on-accent` (`#021861`). WCAG AA verified on every pairing.
5. **Cut List**: No stats strips, no tech stack strips, no process steppers, no tab UIs, no case study sub-pages, no contact form, no chat widgets, no badges, no icons, no tags, no testimonials.

---

## Typography

- **Headline**: Fraunces 500, `clamp(2.5rem, 7vw, 5.5rem)`, line height 1.05, tracking −0.02em.
- **Body**: Inter 17px, line height 1.65, max width 56ch.
- **Labels**: Inter 12px uppercase, tracking 0.08em, `--muted`.
- **Restraint**: No monospace, no outlined text, no stat counters.

---

## Layout Architecture

- **Max Width**: 960px centered single-column layout.
- **Padding**: 24px (mobile) to 64px (desktop) side padding.
- **Vertical Spacing**: 128px desktop, 80px mobile.
- **Navigation**: Mobile-first. Nav collapses to logo plus a single Contact link (no hamburger).
- **Motion**: CSS-only fade and 8px rise on initial load. Respects `prefers-reduced-motion`.

---

## Tech Stack

- **Framework**: Vite + React + TypeScript (Strict mode, no `any`)
- **Styling**: Tailwind CSS v4 with CSS variables tokens
- **Fonts**: Fraunces (display) and Inter (UI) loaded via preconnect with `font-display: swap`
- **Routing**: Anchor links (`#services`, `#work`, `#contact`) — zero router overhead
- **Bundle Budget**: Under 60KB gzipped JS, Lighthouse 100 target, zero layout shift (CLS 0.000)

---

## Project Structure

```
├── public/
│   ├── favicon.svg          # Minimal SVG favicon
│   ├── robots.txt           # Crawler instructions
│   └── sitemap.xml          # Clean root sitemap
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Logo with coral dot + desktop/mobile nav
│   │   ├── Hero.tsx         # Serif headline, subline, coral CTA, anchor link
│   │   ├── ServiceList.tsx  # Plain 4-row numbered services list
│   │   ├── WorkList.tsx     # 4-row project archive with hover arrow shift
│   │   ├── Contact.tsx      # Large serif mailto, WhatsApp, location
│   │   ├── Footer.tsx       # Single-line copyright & founder attribution
│   │   └── Section.tsx      # Semantic section wrapper with vertical rhythm
│   ├── data/
│   │   └── site.ts          # Strictly typed content constants (zero copy in components)
│   ├── styles/
│   │   ├── tokens.css       # Design tokens in CSS variables
│   │   └── globals.css      # Base typography, skip-link, focus rings & CSS motion
│   ├── App.tsx              # Clean single-page composition
│   └── main.tsx             # React DOM entry point
├── Dockerfile               # Multi-stage production Nginx static container
├── compose.yml              # Self-hosted Docker Compose setup
├── index.html               # Semantic SEO head, JSON-LD Schema & OpenGraph
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (runs on port 3000)
npm run dev
```

Visit `http://localhost:3000`.

---

## Production Build & Preview

```bash
# Type check and build static assets
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

### 1. Vercel Deployment

1. Connect the GitHub repository to Vercel.
2. Select the **Vite** framework preset.
3. Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy.

### 2. Self-Hosted (Dokploy / Docker Compose)

A production-ready multi-stage `Dockerfile` and `compose.yml` are provided.

#### Running with Docker Compose:
```bash
docker compose up -d --build
```

#### Deploying on Dokploy:
1. Create an Application in Dokploy.
2. Select **Source: GitHub** and point to your repository.
3. Choose **Build Type: Dockerfile**.
4. Port: Set to `80`.
5. Add domain: `exdevx.in` with automatic Let's Encrypt SSL.
6. Click **Deploy**.

---

## Accessibility Checklist

- [x] Accessible skip link (`#main`) with visible focus ring.
- [x] Visible focus indicators: 2px `--primary` with 3px offset.
- [x] All interactive links have discernible text; arrow glyphs are `aria-hidden`.
- [x] Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` with `aria-labelledby`.
- [x] `prefers-reduced-motion` fully respected in CSS.

---

## License

© 2026 ExDevX. Founded by Abhay Jadhav. All rights reserved.
