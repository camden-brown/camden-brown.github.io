# CLAUDE.md

Personal portfolio for Camden Brown: Astro 5 static site, deployed to GitHub
Pages from `main`. See `README.md` for commands (some of it is out of date;
see `docs/site/design-system.md`).

## Read first

- `docs/decisions.md`: dated log of design decisions and why. Check it before
  proposing changes that might reverse one.
- `docs/` index: `docs/README.md`.

## Keep docs current

When a design decision is made in a session, add an entry to the top of
`docs/decisions.md` and update the relevant doc's status. Follow the
conventions in `docs/README.md`.

## Ground rules

- New UI uses the theme CSS variables in `src/styles/global.css`, never
  hard-coded colors; it must work in all five themes.
- The learning tool is **not** built in this repo; it's Palanaeum
  (`~/Workspace/Palanaeum`, docs in its `wiki/`). Only the read-only
  `/learning` page and `src/data/learning.json` live here
  (`docs/learning-page.md`).
