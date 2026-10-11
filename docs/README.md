# Design docs

Context on *why* things are the way they are, for people and Claude sessions
picking up work later. Code shows what was built; these docs hold the intent,
the constraints and the choices that were rejected.

| Doc | What it covers |
|---|---|
| [decisions.md](decisions.md) | Dated log of every design decision, newest first. Start here. |
| [site/design-system.md](site/design-system.md) | The portfolio's look: themes, tokens, fonts, terminal chrome, diagrams. |
| [learning-page.md](learning-page.md) | The read-only `/learning` page and the `learning.json` contract it reads. |

The learning lab itself (screens, agent behaviour, architecture) is documented
in the Palanaeum repo's wiki: `../Palanaeum/wiki/index.md`.

## Conventions

- **Record decisions as they're made.** Add an entry to the top of
  `decisions.md`: date, decision, why, alternatives considered. Never rewrite
  an old entry; if a decision is reversed, add a new one that supersedes it.
- **Docs describe intent; code is the source of truth for details.** Link to
  files instead of copying values that will drift.
- **Mark status** at the top of each doc: `Draft`, `Agreed`, `Built` or
  `Superseded`.
- Dates are absolute (`2026-10-10`), never "last week".
