# ExDevX (exdevx.in)

> Production-ready agency website for **ExDevX** — Web, Mobile, Automation, and AI Integration Agency founded in 2022 in Maharashtra, India. Engineered for premium editorial design, technical credibility, sub-second load times, and Lighthouse 95+ performance.

---

## Design System & Tokens

Strict tokenized palette adhering to editorial color balance (ivory 60%, deep blue/navy 30%, coral highlight 10%):

```css
:root {
  --bg: #EAE6DE;          /* warm ivory, page background */
  --surface: #F4F1EB;     /* cards, raised panels */
  --text: #0B1A33;        /* body text */
  --primary: #226192;     /* deep editorial blue: headings, links, borders */
  --dark: #021861;        /* midnight navy: hero band, footer, dark sections */
  --accent: #EF8557;      /* coral: CTA and highlights only */
  --on-accent: #021861;   /* text on coral buttons */
}
```

### Color Rules
1. **Ratio**: Ivory 60%, Blue & Navy 30%, Coral 10% maximum.
2. **Coral**: Never used for small body text on ivory (fails WCAG contrast). Reserved exclusively for primary CTA buttons, marks, and hero highlights.
3. **Contrast**: Button text on coral uses `--on-accent` (`#021861`). Text on `--dark` bands uses `--bg` (`#EAE6DE`).
4. **Editorial weight**: Each page features a single focused `--dark` section band for technical contrast.

### Typography
- **Display**: Fraunces (weights 500 to 600, tight tracking, fluid optical sizing).
- **UI & Body**: Inter (16px base, 1.6 line height).
- **Technical & Mono**: JetBrains Mono (tags, metadata, deliverable checklists).
- **Outlined Text Treatment**: CSS stroke treatment for repeating hero motifs (`.text-stroke-primary`).

---

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 with CSS variables tokens (`src/styles/tokens.css` & `globals.css`)
- **Routing**: React Router with route-level code splitting
- **Motion**: Framer Motion (`motion/react`) with strict `prefers-reduced-motion` compliance
- **SEO & Meta**: `react-helmet-async` with Open Graph, Twitter Cards, and Schema.org JSON-LD graphs
- **Forms & Validation**: `react-hook-form` + `zod` with honeypot anti-spam defense
- **Icons**: `lucide-react`
- **SSG Prerendering**: Native Node/Vite `renderToString` build pipeline generating static HTML for every route

---

## Architecture & Directory Structure

```
src/
  ├── app/                  # Router setup and lazy route boundaries
  ├── components/
  │   ├── ui/               # Modular primitives (Button, Container, Section, Reveal, SEO)
  │   └── sections/         # Feature blocks (Navbar, Footer, ProcessStepper, TechStrip, ContactForm)
  ├── data/                 # Strictly typed data constants (site.ts, services.ts, projects.ts, process.ts)
  ├── lib/                  # Helpers (cn, validators, seo)
  ├── pages/                # Route pages (Home, Services, Work, CaseStudy, About, Contact, 404, Legal)
  ├── styles/               # tokens.css & globals.css
  ├── entry-server.tsx      # SSR prerender entry point
  └── main.tsx              # Client entry point
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (runs on port 3000)
npm run dev
```

Visit `http://localhost:3000`.

---

## Production Build & Static Prerender (SSG)

The build script compiles client assets and pre-renders static HTML for all routes into `dist/`:

```bash
npm run build
```

Prerendered routes output:
- `dist/index.html` (Homepage)
- `dist/services/index.html` (Capabilities)
- `dist/work/index.html` (Case Studies)
- `dist/work/kisanpool/index.html`
- `dist/work/ssnlc-law-college/index.html`
- `dist/work/sumit-ubale-portfolio/index.html`
- `dist/work/perpwise-ai/index.html`
- `dist/about/index.html`
- `dist/contact/index.html`
- `dist/privacy-policy/index.html`
- `dist/terms-of-service/index.html`

Test the static build locally:
```bash
npm run preview
```

---

## Deployment

### 1. Vercel Deployment

1. Connect your GitHub repository to Vercel.
2. Select the **Vite** framework preset.
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables in Vercel Project Settings:
   - `VITE_CONTACT_ENDPOINT` *(optional: Webhook or API endpoint for form submissions)*
   - `GROQ_API_KEY` *(optional: for serverless AI chat)*
5. Deploy.

### 2. Self-Hosted (Docker & Dokploy)

A production-ready multi-stage `Dockerfile` and `compose.yml` are provided. The build compiles static HTML and serves it using a minimal, high-performance Nginx image with gzip and client caching headers.

#### Running with Docker Compose:
```bash
docker compose up -d --build
```

#### Deploying on Dokploy:
1. Create a new Application in your Dokploy project.
2. Select **Source: GitHub** and choose this repository.
3. Choose **Build Type: Dockerfile**.
4. Port: Set to `80`.
5. Domain: Add `exdevx.in` and toggle SSL (Let's Encrypt).
6. Click **Deploy**.

---

## Performance & Accessibility Checklist

- [x] **WCAG AA Contrast**: All text pairings meet 4.5:1 (normal) and 3:1 (large) contrast.
- [x] **Zero-Pill Discipline**: Metadata displayed as clean, unboxed typography with typographic separators (`·`).
- [x] **Visible Focus Rings**: Dedicated 2px focus outlines on both ivory and dark backgrounds.
- [x] **Reduced Motion**: Graceful fallback disabling translateY animations when requested.
- [x] **Semantic HTML**: Semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- [x] **Search & AI Discovery**: Complete Open Graph, Twitter cards, Schema.org Organization/WebSite graphs, `sitemap.xml`, and `robots.txt` supporting AI search crawlers.

---

## License

Proprietary © 2022–Present ExDevX. All rights reserved.
