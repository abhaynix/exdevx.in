# exdevx.in SEO Audit

Nov 11, 2026 · @Abhay Jadhav

## Summary

exdevx.in scores 66/100: two critical issues, six warnings, seven smaller opportunities. Scope was the `main` build (11 indexable pages) cross-checked against the live homepage.

Not run: Lighthouse, Search Console and real Core Web Vitals, because the sandbox can't reach them. Performance notes come from the markup only.

## Critical issues

Two problems should be fixed first: the hero image 404s live, and every head tag sits in the page body.

1. **Hero image 404s on the live site.** `/work/configshell.png` returns a 404, and the page also preloads it with `fetchpriority="high"`. The result is a broken LCP image and a wasted high-priority request. Fix: run `npm run shots`, then commit `public/work/configshell.png`. Files: `components/hero.tsx`, `src/pages/HomePage.tsx`.
2. **Title, description, canonical, OG and JSON-LD are in `<body>`, not `<head>`.** The live raw HTML has a `<head>` with no `<title>`; every meta tag sits inside `<div id="root">`. `<!--ssr-head-->` is replaced with an empty string, because react-helmet-async v3 on React 19 renders tags in place and `helmetContext.helmet` stays empty (`src/entry-server.tsx:22`). Google renders JS and should recover; social scrapers and non-JS AI crawlers often won't. Fix: in `scripts/prerender.ts`, lift `<title>`, `<meta>`, `<link rel="canonical|preload">` and the JSON-LD scripts out of `appHtml` into the head string. Placement is confirmed locally and live; the ranking impact is a judgment call.

## Warnings

Six issues are worth fixing after the critical two; most are quick edits.

| Issue | Detail and fix | Where |
| --- | --- | --- |
| Short titles and descriptions | Home title is 41 characters, Contact is 14, case studies about 30. Descriptions run 82 to 108 characters on Contact, case studies and legal pages. Aim for 50–60 and 140–160, with service and location, e.g. "Web, Mobile & AI Development Agency in Pune \| ExDevX". | `<SEO>` calls in each page file |
| One OG image everywhere | Every page shares `ik.imagekit.io/exdev/file.jpg`, and the Organization logo uses the same file. Use a 1200×630 OG image per case study and a separate square logo. | `src/components/ui/SEO.tsx` |
| Stale GitHub handle in schema | `sameAs` lists `github.com/AbhiDevepl`; the footer links `github.com/abhaynix`. Align them. | `src/lib/seo.ts:36` |
| Schema only on the homepage | Add `Article` or `CreativeWork` plus `BreadcrumbList` on case studies, `Service` or `OfferCatalog` on Services, `ContactPoint` on Contact, and `ProfessionalService` with the Pune address. | page files, `src/lib/seo.ts` |
| Heading skip on case studies | `h2` goes to `h4` in the "Next case study" block. Change it to `h3`. | `src/pages/CaseStudyPage.tsx:159` |
| Heavy hero image | The capture script writes a 1440×900 PNG, likely 1–2 MB, on the LCP element. Output WebP or AVIF at about 150 KB or less and update `src`. | `scripts/capture-screenshots.mjs`, `HomePage.tsx` |

## Opportunities

Seven lower-priority improvements, none urgent.

- [ ] Add `lastmod` to the generated sitemap in `scripts/prerender.ts` (currently none).
- [ ] Fix footer labels: the "Services" column holds Home, Services and About, and the "Work" column holds Privacy, Terms and Cookies. Give the legal links their own column.
- [ ] Add `public/llms.txt` summarising services and case studies for AI answer engines.
- [ ] Clean `robots.txt`: `User-agent: Common Crawl` isn't a real token (`CCBot` covers it), and `Disallow: /admin/` points at a route that doesn't exist.
- [ ] Add a `site.webmanifest`; the icons exist but there is no manifest.
- [ ] Give ConfigShell an internal page. It appears in Selected work with no internal link equity.
- [ ] Update the static `theme-color` in `index.html` from `#f7f5f0` to `#08090c`. `theme-init.js` fixes it live, but the static value is cream.

## Passing

The technical foundation is solid.

- One `<h1>` on every page and no heading skips outside case studies.
- Unique titles and descriptions, a canonical on every page, and correct `noindex` on `/404` and the legacy `/terms-of-service`.
- `lang="en-IN"`, viewport set, complete OG and Twitter tags, and `max-image-preview:large`.
- Prerendered static HTML for every route, with a sitemap built from the project data and a build check that every case study is included.
- `robots.txt` exists, allows search and AI retrieval bots, and links the sitemap.
- Images have `alt`, `width` and `height`; touch targets are at least 44px; form labels are proper; GA stays gated behind cookie consent.

## Next steps

Fixing the two critical items is small work and the biggest win. The head-lifting change in `scripts/prerender.ts`, the heading fix, the schema handle and the sitemap `lastmod` can ship in one PR. The hero PNG needs a machine with normal internet: run `npm run shots` and commit the result.
