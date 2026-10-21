/**
 * Static prerender script.
 * Run after `vite build` to inject server-rendered HTML into the built index.html.
 * This makes all page content crawlable by search engines and AI bots
 * without requiring a running server.
 *
 * Usage: tsx scripts/prerender.ts
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { projectsData } from '../src/data/projects';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const routes: Array<{ url: string; file: string }> = [
  { url: '/', file: 'index.html' },
  { url: '/services', file: 'services/index.html' },
  { url: '/work', file: 'work/index.html' },
  ...projectsData.map(({ slug }) => ({ url: `/work/${slug}`, file: `work/${slug}/index.html` })),
  { url: '/about', file: 'about/index.html' },
  { url: '/contact', file: 'contact/index.html' },
  { url: '/privacy-policy', file: 'privacy-policy/index.html' },
  { url: '/terms-and-conditions', file: 'terms-and-conditions/index.html' },
  { url: '/cookie-policy', file: 'cookie-policy/index.html' },
  { url: '/404', file: '404.html' },
];

// ── Step 1: Build client bundle ──────────────────────────────────────────────
console.log('\n[prerender] Building client bundle…');
await build({
  root,
  build: {
    outDir: path.join(root, 'dist'),
    emptyOutDir: true,
  },
});

// ── Step 2: Build SSR bundle ─────────────────────────────────────────────────
console.log('\n[prerender] Building SSR bundle…');
await build({
  root,
  build: {
    ssr: path.join(root, 'src/entry-server.tsx'),
    outDir: path.join(root, 'dist/server'),
    emptyOutDir: true,
    rollupOptions: {
      output: { format: 'es' },
    },
  },
  ssr: {
    // Bundle these so they work in the Node.js prerender context
    noExternal: ['react-helmet-async', 'gsap'],
  },
});

// ── Step 3: Render each route ────────────────────────────────────────────────
console.log('\n[prerender] Rendering pages…');

const serverEntryPath = path.join(root, 'dist/server/entry-server.js');
const { render } = (await import(pathToFileURL(serverEntryPath).href)) as {
  render: (url: string) => { html: string; head: string };
};

const template = readFileSync(path.join(root, 'dist/index.html'), 'utf-8');
if (!template.includes('<!--ssr-outlet-->') || !template.includes('<!--ssr-head-->')) {
  throw new Error('HTML template is missing an SSR insertion marker.');
}
if (template.includes('googletagmanager.com/gtag/js') || template.includes('/gtag-init.js')) {
  throw new Error('Google Analytics must remain gated behind cookie consent.');
}

for (const { url, file } of routes) {
  const { html: appHtml, head } = await render(url);

  const fullHtml = template.replace('<!--ssr-outlet-->', appHtml).replace('<!--ssr-head-->', head);

  const outPath = path.join(root, 'dist', file);
  const outDir = path.dirname(outPath);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  writeFileSync(outPath, fullHtml);
  console.log(`  ✓  ${url}  →  dist/${file}`);
}

// Keep the previously published terms URL as a static redirect to its canonical replacement.
const legacyTermsPath = path.join(root, 'dist/terms-of-service/index.html');
mkdirSync(path.dirname(legacyTermsPath), { recursive: true });
writeFileSync(legacyTermsPath, '<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><link rel="canonical" href="https://exdevx.in/terms-and-conditions"><meta http-equiv="refresh" content="0;url=/terms-and-conditions"><title>Terms and Conditions | ExDevX</title></head><body><p>Terms have moved to <a href="/terms-and-conditions">Terms and Conditions</a>.</p></body></html>');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.filter(({ url }) => url !== '/404').map(({ url }) => `  <url><loc>https://exdevx.in${url}</loc></url>`),
  '</urlset>',
].join('\n');
for (const { slug } of projectsData) {
  if (!sitemap.includes(`<loc>https://exdevx.in/work/${slug}</loc>`)) {
    throw new Error(`Case study is missing from the sitemap: ${slug}`);
  }
}
writeFileSync(path.join(root, 'dist/sitemap.xml'), `${sitemap}\n`);

console.log('\n[prerender] Done. Static HTML is fully crawlable.\n');
