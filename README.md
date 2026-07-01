# camden-brown.github.io

Personal portfolio + blog for **Camden Brown**, senior full-stack engineer. A
developer-native / terminal aesthetic — a macOS-style terminal window with a
command-prompt hero, monospace chrome, and a light/dark toggle.

Built with [Astro](https://astro.build) (static output) and deployed to GitHub
Pages via GitHub Actions.

## Stack

- **Astro** — static site generation, real routes per view, View Transitions for
  smooth client-side navigation.
- **Fonts** — Space Grotesk (display/body) + JetBrains Mono (chrome) via Google Fonts.
- **Content collections** — blog posts live as Markdown in `src/content/writing/`.
- No runtime framework; syntax highlighting via Astro's built-in Shiki.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the production build locally
```

## Project layout

```
src/
├── content/writing/   # blog posts (Markdown + frontmatter)
├── content.config.ts  # writing collection schema
├── data/portfolio.ts  # projects, roles, skills, links
├── layouts/Shell.astro# terminal window chrome + nav + theme toggle
├── components/         # shared bits (Prompt)
├── lib/posts.ts        # post loading/sorting helpers
├── pages/             # routes: /, /projects, /projects/[id], /writing,
│                      #         /writing/[slug], /about, /experience, /contact
└── styles/global.css   # design tokens (dark + light) and shell styles
public/                 # avatar.jpg, favicons — copied verbatim to the site root
```

## Editing content

- **Projects / experience / skills** — edit `src/data/portfolio.ts`.
- **Blog posts** — add a Markdown file under `src/content/writing/`. Frontmatter:

  ```yaml
  ---
  title: My Post Title
  date: 2026-01-15
  tags: [go, testing]
  categories: [Programming, Go]
  description: One-line summary shown in the writing list.
  ---
  ```

- **Theme** — colors are CSS custom properties in `src/styles/global.css`
  (`:root` for dark, `html[data-theme="light"]` for light). The toggle persists
  to `localStorage` and respects `prefers-color-scheme` on first visit.

## Deploy

Pushing to `main` triggers `.github/workflows/pages-deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. Ensure **Settings → Pages → Source**
is set to **GitHub Actions**.

## License

[MIT](LICENSE)
