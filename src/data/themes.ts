// Theme registry — shared by Shell.astro (renders the picker) and ui.ts (applies
// + persists the choice). Each id has a matching token block in global.css, and
// `swatch` is the theme's signature accent shown as a dot in the menu.

export interface ThemeDef {
  id: string;
  label: string;
  swatch: string;
}

export const THEMES: ThemeDef[] = [
  { id: 'dracula', label: 'dracula', swatch: '#bd93f9' },
  { id: 'nord', label: 'nord', swatch: '#88c0d0' },
  { id: 'gruvbox', label: 'gruvbox', swatch: '#b8bb26' },
  { id: 'tokyo-night', label: 'tokyo night', swatch: '#7aa2f7' },
  { id: 'solarized', label: 'solarized', swatch: '#268bd2' },
];

export const DEFAULT_THEME = 'dracula';
export const THEME_IDS = THEMES.map((t) => t.id);
