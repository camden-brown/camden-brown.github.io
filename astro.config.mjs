// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

// Turn ```mermaid fences into <pre class="mermaid"> so Shiki leaves them alone
// and the client-side renderer (see scripts/ui.ts) draws them. Pure AST
// transform — no browser needed at build time.
function remarkMermaid() {
  /** @param {any} tree */
  return (tree) => {
    visit(tree, 'code', (/** @type {any} */ node) => {
      if (node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<pre class="mermaid">${node.value}</pre>`;
      }
    });
  };
}

// Deployed to the user/org GitHub Pages root: https://camden-brown.github.io
// (root repo → no `base` path needed)
export default defineConfig({
  site: 'https://camden-brown.github.io',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      // Match the terminal aesthetic in both light and dark
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
