# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

ExDevX marketing/agency site: a React 19 + Vite 6 SPA that is **prerendered to static HTML at build time** (SSG) for full crawlability, plus one serverless chat endpoint.

## Commands

```bash
npm run dev            # Vite dev server on http://localhost:5000 (also mounts /api/chat as middleware)
npm run build          # full SSG build: client bundle → SSR bundle → prerender each route (scripts/prerender.ts)
npm run build:client   # client-only Vite build (skips prerender) — rarely what you want
npm run preview        # serve the built dist/
  npm run lint           # tsc --noEmit
  npm test               # Node's built-in test runner
```

The chat handler tests exercise method, body, message, history, and size validation without calling the AI service.

## Architecture

**SSG prerender is the core pattern.** `npm run build` builds client and server bundles, then renders each public route with `renderToPipeableStream`, injecting route HTML and Helmet metadata into static files. Case-study routes and sitemap entries come from [src/data/projects.ts](src/data/projects.ts).

**Adding a standard route requires updates to [src/App.tsx](src/App.tsx) and [scripts/prerender.ts](scripts/prerender.ts).** Case studies are generated from the project data, so adding one there also adds its prerendered page and sitemap URL.

**`AppInner` is router-agnostic and must stay that way.** [src/App.tsx](src/App.tsx) exports `AppInner` (layout + `<Routes>`, no `<Router>`). The client wraps it in `BrowserRouter` ([main.tsx](src/main.tsx)); the SSR entry wraps it in `MemoryRouter` ([entry-server.tsx](src/entry-server.tsx)). `MemoryRouter` is used on the server deliberately — `StaticRouter` breaks under Vite SSR + react-router-dom v7. Don't move a `<Router>` into `AppInner`.

**Client mount auto-detects prerendered vs dev.** [main.tsx](src/main.tsx) calls `hydrateRoot` when `#root` has element children (prod, prerendered HTML) and `createRoot` otherwise (dev, where the only child is the `<!--ssr-outlet-->` comment — comment nodes don't count as element children). This is what keeps dev flicker-free without a build.

**One chat handler serves two runtimes.** [api/chat.js](api/chat.js) is a Vercel serverless function AND is imported by [vite.config.ts](vite.config.ts) as dev middleware, so `npm run dev` and prod run identical logic. Because of this, `getBody()` tolerates both Vercel's pre-parsed `req.body` and a raw request stream. Keep the handler runtime-neutral (no Vercel-only or Vite-only assumptions).

**Chat model:** Gemini via `@google/genai`, configured with server-side `GEMINI_API_KEY` and optional `GEMINI_MODEL`. The active frontend ([src/components/ui/ChatWidget.tsx](src/components/ui/ChatWidget.tsx)) expects a JSON `{ text }` response.

## Conventions & gotchas

- **`GEMINI_API_KEY` is server-side only** — do not add a `VITE_` prefix. [vite.config.ts](vite.config.ts) loads it for the dev middleware.
- **SEO metadata** lives in [src/components/ui/SEO.tsx](src/components/ui/SEO.tsx); homepage Organization/WebSite JSON-LD is supplied by [src/pages/HomePage.tsx](src/pages/HomePage.tsx). The prerender template must keep both SSR insertion markers.
- **Rate limiting is not configured in repository code.** Verify the Vercel Firewall setting separately for deployed chat traffic.
- **`@` path alias** resolves to the repo root (not `src/`).
