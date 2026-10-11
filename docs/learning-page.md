# The `/learning` page

**Status:** Built 2026-10-11. `topics` is empty until Palanaeum exports real
data, so the page shows a "coming soon" placeholder there. See [decisions.md](decisions.md).

- Page: [`src/pages/learning.astro`](../src/pages/learning.astro)
- Data: [`src/data/learning.json`](../src/data/learning.json), validated at
  build time by the zod schema in [`src/lib/learning.ts`](../src/lib/learning.ts)
  (a file that doesn't match fails the build). The "Written up" section is hidden while `writeups` is empty.

A read-only page on the site showing what Camden is learning and practicing.
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

A brief summary:

1. A one-line intro.
2. **Palanaeum:** what it is and why Camden is building it (learning and
   interview prep), the stack, and nine design-mockup screenshots
   (`public/palanaeum/`, rendered from the design canvas: learning, practice
   and interview screens, placeholder company names) in the same gallery +
   lightbox as the project pages. Copy is plain and in Camden's voice.
3. **Topics:** while `topics` is empty, a "coming soon" placeholder styled as
   a terminal running `palanaeum sync` (0 topics, last sync never, a sweeping
   progress bar that stops under reduced motion). Once topics exist, each
   technical topic with its concepts, marked comfortable / studying / up next
   when statuses exist (legend and icons hidden while none do).
4. Links to write-ups (hidden while there are none).

No "right now" items, scores, streaks, charts or real job applications.
Mockup: the "What I'm learning" board on the
design canvas (https://claude.ai/artifact/F9a5hgsL3DgyrfyJNqs8dV).

The page uses the site's theme variables like every other page
([site/design-system.md](site/design-system.md)).

## `learning.json` contract (draft)

Source of truth: `../Palanaeum/wiki/architecture.md`. Copied here so
site work has it; if they differ, Palanaeum wins.

The public page is informational, not a dashboard, so the export carries
**statuses and short text, no scores or streaks**. The lab derives each
concept's status from its mastery (≥65 comfortable, 40–64 studying, below 40
or not started up next). Only technical topics are exported (no behavioral). `status` is optional: the page hides statuses until
any concept has one.

```jsonc
{
  "updatedAt": "2026-10-08",
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
