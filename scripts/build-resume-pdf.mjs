// Regenerates public/resume.pdf from the live /resume page so the downloadable
// file never drifts from the site. Uses the print stylesheet (clean white,
// US-Letter), i.e. the exact output the on-page export would produce.
//
//   npm run resume:pdf
//
// Chrome resolution order: $CHROME env → Playwright's bundled Chromium →
// common system installs. Override with CHROME=/path/to/chrome if needed.

import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const PORT = 4331;
const URL = `http://localhost:${PORT}/resume/`;
const OUT = 'public/resume.pdf';

function findChrome() {
  if (process.env.CHROME && existsSync(process.env.CHROME)) return process.env.CHROME;
  const pwRoot = join(homedir(), '.cache/ms-playwright');
  if (existsSync(pwRoot)) {
    for (const dir of readdirSync(pwRoot).filter((d) => d.startsWith('chromium-')).sort().reverse()) {
      for (const rel of ['chrome-linux64/chrome', 'chrome-linux/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
        const p = join(pwRoot, dir, rel);
        if (existsSync(p)) return p;
      }
    }
  }
  for (const p of [
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]) if (existsSync(p)) return p;
  throw new Error('Chrome not found. Set CHROME=/path/to/chrome and retry.');
}

async function waitForServer(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Preview server never came up at ${url}`);
}

const chrome = findChrome();
console.log('› chrome:', chrome);

console.log('› building…');
if (spawnSync('npm', ['run', 'build'], { stdio: 'inherit' }).status !== 0) process.exit(1);

console.log('› starting preview…');
const preview = spawn('npm', ['run', 'preview', '--', '--port', String(PORT)], { stdio: 'ignore' });

try {
  await waitForServer(URL);
  console.log('› printing PDF…');
  execFileSync(chrome, [
    '--headless', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${OUT}`, URL,
  ], { stdio: 'ignore' });
  console.log(`✓ wrote ${OUT}`);
} finally {
  preview.kill('SIGTERM');
}
