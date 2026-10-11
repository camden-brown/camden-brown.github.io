# The `/learning` page

**Status:** Draft (designed, not built). See [decisions.md](decisions.md).

A read-only page on the site showing what Camden is learning and practising.
The learning tool itself is a separate app,
[Palanaeum](https://github.com/camden-brown/Palanaeum) (`~/Workspace/Palanaeum`);
it is **not** built in this repo.

## How data gets here

```
Palanaeum (local)                         this repo
npm run export  ──writes──▶  src/data/learning.json  ──read by──▶  src/pages/learning.astro
```

The export is run by hand. Review the diff, commit, push; GitHub Pages
rebuilds. The site never imports code from Palanaeum; `learning.json` is the
only coupling.

## What the page shows

Informational, not a dashboard: what Camden is learning and why, up to three
"right now" focus items, how they practise, topics with concepts marked
comfortable / studying / up next, and links to write-ups. No scores, streaks,
charts or job applications. Mockup: the "What I'm learning" board on the
design canvas (https://claude.ai/artifact/F9a5hgsL3DgyrfyJNqs8dV).

The page uses the site's theme variables like every other page
([site/design-system.md](site/design-system.md)).

## `learning.json` contract (draft)

Source of truth: `../Palanaeum/wiki/architecture.md`. Copied here so
site work has it; if they differ, Palanaeum wins.

The public page is informational, not a dashboard, so the export carries
**statuses and short text, no scores or streaks**. The lab derives each
concept's status from its mastery (≥65 comfortable, 40–64 studying, below 40
or not started up next); "Right now" items are written or picked by Camden.

```jsonc
{
  "updatedAt": "2026-10-08",
  "now": [
    { "topic": "Backend fundamentals", "title": "Transactions & isolation levels", "note": "What goes wrong at each level; write skew with a real example." }
  ],
  "topics": [
    {
      "name": "System design",
      "why": "Designing systems that scale, and explaining the trade-offs at a whiteboard.",
      "concepts": [
        { "name": "Consistent hashing", "status": "comfortable" },
        { "name": "Sharding", "status": "studying" },
        { "name": "Event sourcing & CQRS", "status": "next" }
      ]
    }
  ],
  "writeups": [
    { "title": "Building Stonkss AI: a system design deep-dive", "href": "/writing/building-stonkss-ai/" }
  ]
}
```

Scores, interview results and JD-generated interviews stay in the lab.
