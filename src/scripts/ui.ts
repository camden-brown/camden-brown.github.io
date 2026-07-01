// Client behaviour for the terminal shell: theme picker + animated favicon.
// Bundled by Astro and driven from Shell.astro via the astro:* lifecycle events,
// so it runs once on first load and again after every View Transition navigation.

import { THEMES, DEFAULT_THEME, THEME_IDS } from '../data/themes';

const THEME_KEY = 'theme';

function storedTheme(): string {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v && THEME_IDS.includes(v)) return v;
  } catch {
    /* localStorage blocked */
  }
  return DEFAULT_THEME;
}

/** Re-assert the persisted theme — the <html> attribute resets to the SSR
 *  default on each page swap, so this runs after every navigation. */
export function applyTheme(): void {
  document.documentElement.setAttribute('data-theme', storedTheme());
}

function labelFor(id: string): string {
  return THEMES.find((t) => t.id === id)?.label ?? id;
}

/** Reflect the active theme in the picker button + option check marks. */
function syncPicker(): void {
  const active = document.documentElement.getAttribute('data-theme') ?? DEFAULT_THEME;
  const label = document.querySelector<HTMLElement>('#theme-btn .theme-btn-label');
  if (label) label.textContent = labelFor(active);
  document.querySelectorAll<HTMLElement>('.theme-opt').forEach((opt) => {
    opt.setAttribute('aria-checked', String(opt.dataset.themeId === active));
  });
}

function setTheme(id: string): void {
  document.documentElement.setAttribute('data-theme', id);
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch {
    /* ignore */
  }
  syncPicker();
}

// Outside-click / Escape close the menu. Registered once; the module persists
// across View Transition navigations so this never stacks.
let pickerGlobalsWired = false;

function closePicker(): void {
  const list = document.getElementById('theme-list');
  const btn = document.getElementById('theme-btn');
  if (list) list.hidden = true;
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function wireThemePicker(): void {
  const btn = document.getElementById('theme-btn');
  const list = document.getElementById('theme-list');
  if (!btn || !list) return;
  syncPicker();

  btn.onclick = (e) => {
    e.stopPropagation();
    const open = list.hidden;
    list.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  };

  list.querySelectorAll<HTMLElement>('.theme-opt').forEach((opt) => {
    opt.onclick = () => {
      if (opt.dataset.themeId) setTheme(opt.dataset.themeId);
      closePicker();
    };
  });

  if (!pickerGlobalsWired) {
    pickerGlobalsWired = true;
    document.addEventListener('click', closePicker);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePicker();
    });
  }
}

// ---- animated favicon: blinking terminal cursor, matching the site's `▋` ----
// Canvas-driven because animated-GIF favicons only work in Firefox; repainting a
// PNG data URL on a timer animates in every modern browser. The static SVG/ICO
// remain the fallback for no-JS, and it stays static under reduced-motion.

const SIZE = 64;
const BLINK_MS = 550; // ~1.1s period, matches the CSS blink keyframe

interface FaviconColors {
  panel: string;
  border: string;
  accent: string;
}

let favCanvas: HTMLCanvasElement | undefined;
let favTimer: number | undefined;

/** Pull the current theme's colors so the favicon recolors with the theme. */
function faviconColors(): FaviconColors {
  const s = getComputedStyle(document.documentElement);
  return {
    panel: s.getPropertyValue('--panel').trim() || '#282a36',
    border: s.getPropertyValue('--border').trim() || '#383a4a',
    accent: s.getPropertyValue('--accent').trim() || '#bd93f9',
  };
}

function drawFavicon(ctx: CanvasRenderingContext2D, cursorOn: boolean, c: FaviconColors): void {
  ctx.clearRect(0, 0, SIZE, SIZE);
  // terminal window
  ctx.fillStyle = c.panel;
  ctx.beginPath();
  ctx.roundRect(2, 2, 60, 60, 13);
  ctx.fill();
  ctx.strokeStyle = c.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(2.5, 2.5, 59, 59, 12.5);
  ctx.stroke();
  // prompt chevron  >
  ctx.strokeStyle = c.accent;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(18.75, 21);
  ctx.lineTo(32.75, 32);
  ctx.lineTo(18.75, 43);
  ctx.stroke();
  // blinking cursor block
  if (cursorOn) {
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.roundRect(37.5, 37.5, 10.75, 6.5, 2);
    ctx.fill();
  }
}

/** The <link> we animate. Swaps re-inject the static icon links, so on each call
 *  we remove those (apple-touch-icon has a different rel and is left alone) and
 *  reuse or recreate our dedicated link. */
function faviconLink(): HTMLLinkElement {
  let link = document.getElementById('favicon-anim') as HTMLLinkElement | null;
  if (!link) {
    document.querySelectorAll('link[rel~="icon"]').forEach((l) => l.remove());
    link = document.createElement('link');
    link.id = 'favicon-anim';
    link.rel = 'icon';
    link.type = 'image/png';
    document.head.appendChild(link);
  }
  return link;
}

function startFavicon(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!favCanvas) {
    favCanvas = document.createElement('canvas');
    favCanvas.width = favCanvas.height = SIZE;
  }
  const ctx = favCanvas.getContext('2d');
  if (!ctx) return;
  const link = faviconLink();
  const canvas = favCanvas;
  let cursorOn = true;
  const tick = () => {
    drawFavicon(ctx, cursorOn, faviconColors());
    link.href = canvas.toDataURL('image/png');
    cursorOn = !cursorOn;
  };
  if (favTimer !== undefined) clearInterval(favTimer);
  tick();
  favTimer = window.setInterval(tick, BLINK_MS);
}

/** Run on initial load and after every View Transition navigation. */
export function initUI(): void {
  applyTheme();
  wireThemePicker();
  startFavicon();
}
