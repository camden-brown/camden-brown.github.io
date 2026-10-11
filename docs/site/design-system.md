# Portfolio design system

**Status:** Built. Source of truth is the code linked below; this doc explains
the intent.

## Look

A dark, developer-native "terminal window": macOS-style title bar with
traffic-light dots, `~/path` prompts, `$ command` headers above sections,
monospace body text.

## Themes

Five dark terminal themes, chosen from the title-bar picker. There is no light
theme (it was replaced in `ccc405b`).

- Registry: [`src/data/themes.ts`](../../src/data/themes.ts) (`THEMES`,
  `DEFAULT_THEME = 'dracula'`).
- Tokens: one `html[data-theme='…']` block per theme in
  [`src/styles/global.css`](../../src/styles/global.css). Dracula also sits on
  `:root` so the site renders correctly without JS.
- An inline script in [`src/layouts/Shell.astro`](../../src/layouts/Shell.astro)
  applies the saved theme before first paint.

| Theme | `--accent` |
|---|---|
| dracula (default) | `#bd93f9` |
| nord | `#88c0d0` |
| gruvbox | `#b8bb26` |
| tokyo-night | `#7aa2f7` |
| solarized | `#268bd2` |

**Rule:** new UI uses the CSS variables (`--bg`, `--panel`, `--panelHi`,
`--chrome`, `--border`, `--text`, `--muted`, `--faint`, `--accent`,
`--amber`, …), never hard-coded hexes, so it works in all five themes.

## Type

- `--sans`: Space Grotesk, for headings and display numbers.
- `--mono`: JetBrains Mono, for body text (13.5px, line-height 1.85) and chrome.

## Diagrams

System-design posts use Mermaid. `remarkMermaid()` in
[`astro.config.mjs`](../../astro.config.mjs) turns ```` ```mermaid ```` fences
into `<pre class="mermaid">`; `wireMermaid()` in
[`src/scripts/ui.ts`](../../src/scripts/ui.ts) loads Mermaid only on pages
that need it and colours diagrams from the active theme's tokens.

## Exceptions

- The printed / PDF resume uses its own light palette with a teal accent
  (`--rz-accent: #2f6f6a`) under `@media print` in `global.css`.

## Known drift

`README.md` still describes a light/dark toggle and an `/experience` route.
Both are out of date: the site has the 5-theme picker and a `/resume` page.
