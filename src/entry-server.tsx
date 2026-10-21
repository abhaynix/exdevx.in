/**
 * Server-side rendering entry point.
 * Used by scripts/prerender.ts to generate static HTML at build time.
 *
 * Uses MemoryRouter (not StaticRouter) to avoid the react-router-dom/server
 * subpath resolution issue with Vite SSR + react-router-dom v7.
 */

import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppInner } from './App';

export function render(url: string): Promise<{ html: string; head: string }> {
  const helmetContext: { helmet?: Record<string, { toString(): string }> } = {};
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('end', () => {
      const head = Object.values(helmetContext.helmet ?? {}).map((item) => item.toString()).join('\n');
      resolve({ html: Buffer.concat(chunks).toString('utf8'), head });
    });
    stream.on('error', reject);

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <MemoryRouter initialEntries={[url]} initialIndex={0}>
          <AppInner />
        </MemoryRouter>
      </HelmetProvider>,
      {
        onAllReady: () => pipe(stream),
        onShellError: reject,
      }
    );
    stream.on('close', abort);
  });
}
