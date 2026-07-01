// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to the user/org GitHub Pages root: https://camden-brown.github.io
// (root repo → no `base` path needed)
export default defineConfig({
  site: 'https://camden-brown.github.io',
  markdown: {
    shikiConfig: {
      // Match the terminal aesthetic in both light and dark
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
