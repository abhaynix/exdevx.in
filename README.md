# ExDevX (exdevx.in)

> Agency website for **ExDevX** — Web, Mobile, Automation, and AI Integration Agency founded in 2022 in Maharashtra, India.

---

## Design System & Tokens

The approved site palette uses near-black surfaces, near-white text, and ExDevX orange accents. Shared semantic tokens live in `src/styles/tokens.css`; legacy component variables map to them.

```css
:root {
  --background: #08090c;
  --background-secondary: #0d1015;
  --surface-hover: #171a20;
  --text-primary: #f2f2f3;
  --text-secondary: #9a9da6;
  --accent-primary: #ff8a45;
  --accent: #ff792e;
  --accent-hover: #ff9b50;
  --on-accent: #101114;
  --control-border: #646872;
  --focus-ring: #ff9b50;
  --success: #4ade80;
  --warning: #fbbf24;
  --error: #fb7185;
}
```

### Color Rules
1. **Surfaces**: Pages use the shared dark tokens, with slightly lighter secondary surfaces for cards and controls.
2. **Accent**: Orange is used for links, emphasis, focus, and primary actions; button text uses `--on-accent` for contrast.
3. **Status**: Success, warning, and error colors remain semantic and separate from the brand accents.
4. **Contrast**: `--text-secondary` is used for supporting copy, and `--control-border` distinguishes inputs and secondary controls.

### Typography
- **Display**: Manrope Variable.
- **UI & Body**: Inter Variable.
- **Technical & Mono**: System monospace stack.

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
- `dist/terms-and-conditions/index.html`
- `dist/cookie-policy/index.html`
- `dist/terms-of-service/index.html` (legacy redirect)

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
   - `GEMINI_API_KEY` *(optional: enables live AI chat; without it, chat shows a contact fallback)*
   - `GEMINI_MODEL` *(optional: defaults to `gemini-3.5-flash`)*
5. Deploy.

The inquiry form opens WhatsApp with a prefilled message; the visitor reviews and sends it there. The form does not email inquiry details.

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

## Accessibility & Search

- The site provides visible keyboard focus styles, a skip link, semantic landmarks, labelled form controls, and reduced-motion handling.
- Color tokens aim for readable contrast, but a complete WCAG 2.2 AA contrast and assistive-technology audit has not been completed.
- Route metadata and the sitemap are generated during prerendering. Search appearance and indexing are not guaranteed.

---

## License

Proprietary © 2022–Present ExDevX. All rights reserved.
