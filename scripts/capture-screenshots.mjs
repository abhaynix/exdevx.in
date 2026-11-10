// Captures real screenshots of live ExDevX projects into public/work/.
// Run on a machine with normal internet: `npm run shots`
// Sites that fail to load are skipped, never faked.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const targets = [
  ['configshell', 'https://configshell.antideploy.com/'],
  ['ssnlc-law-college', 'https://ssnlc.in'],
  ['kisanpool', 'https://kisanpool.in'],
  ['perpwise-ai', 'https://perpwise.ai'],
];

mkdirSync('public/work', { recursive: true });
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const [name, url] of targets) {
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    if (!res || !res.ok()) throw new Error(`HTTP ${res?.status()}`);
    await page.screenshot({ path: `public/work/${name}.png` });
    console.log('ok  ', name);
  } catch (error) {
    console.log('skip', name, String(error.message ?? error).split('\n')[0]);
  }
}
await browser.close();
