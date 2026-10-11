# Decision log

Newest first. Each entry: what was decided, why, and what was rejected.
Don't edit old entries; supersede them with a new one.

The learning lab's own decisions (screens, drills, interviews, agent
behaviour, architecture) live in the Palanaeum repo:
`../Palanaeum/wiki/decisions.md`. Only the ones that affect this site are
kept here.

---

## 2026-10-11 · Learning page goes in the nav; writing is hidden

**Decision:** `/learning` is built (step one of the Palanaeum project) and
takes the writing tab's place in the nav, after projects. The writing nav
item is commented out in `Shell.astro`; `/writing/` and its posts still build
and the home page still lists them.

The page opens with a short section on Palanaeum: what it is, why Camden is
building it (learning new topics and prepping for interviews), the stack, and
nine mockup screenshots in the same gallery as the project pages. The topics
section is a "coming soon" placeholder (a fake `palanaeum sync` terminal)
until Palanaeum exports real topics; it renders the list automatically once
`topics` isn't empty. Concept statuses are optional in `learning.json` and
hidden until Palanaeum exports real ones. "Right now" items, a "how I
practice" section and the behavioral topic were cut, and `now` was dropped
from `learning.json`. Copy is plain and first-person.

**Why:** The learning page is the first visible piece of the project, and the
writing section isn't where Camden wants visitors to go right now. Camden
doesn't have real progress data yet, so the page shows the tool and the plan
rather than made-up statuses.

**Supersedes:** the "right now" and "how I practice" parts of "Public
learning page is informational, not a dashboard" below.

---

## 2026-10-11 · Learning lab docs live in Palanaeum

**Decision:** The lab's design docs (`docs/learning-lab/`) and its decisions
moved to `~/Workspace/Palanaeum/wiki/`, the lab's own repo. This repo keeps
only what the site needs: the read-only `/learning` page and the
`learning.json` contract it reads ([learning-page.md](learning-page.md)).

**Why:** Sessions building the lab shouldn't need this repo for context, and
this repo's docs should be about the site.

**Supersedes:** the repo name `learning-lab` in "Learning lab lives in its own
repo" below; the repo is `Palanaeum`.

---

## 2026-10-10 · Public learning page is informational, not a dashboard

**Decision:** The public `/learning` page drops metrics: no scores, streaks,
charts, heatmap or mastery bars. It shows what Camden is learning and why,
three "right now" focus items, how they practice (learn → explain out loud
at a whiteboard → weekly mock interview), topics with concepts marked
comfortable / studying / up next, and links to write-ups. `learning.json`
is simplified to match (statuses and text only).

**Why:** The page is for visitors to understand what Camden is working on,
not to track progress. Metrics belong in the lab.

**Supersedes:** the public-page parts of "Debrief by plan section; public
page grouped by topic" and the original stats/heatmap/score-chart design.

## 2026-10-10 · Learning lab lives in its own repo

**Decision:** The learning tool (walkthroughs, quizzes, grading, interviews,
mastery tracking) is built in a separate repo, `learning-lab`, and can be
public. The portfolio only gets a read-only `/learning` progress page fed by
an exported `learning.json`.

**Why:** Privacy is *not* the concern; data being publicly readable on GitHub
is fine. The point is that the tool isn't what the personal site is for. A
separate repo keeps the site's dependencies, deploy and history about the
portfolio, and the lab can itself be listed as a project.

**Rejected:** A `lab/` folder inside this repo (works, since Astro only builds
`src/`, but mixes tool and site history). Dev-only routes inside the Astro
site (couples the tool to the site's build).

## 2026-10-10 · Learning lab UI matches the portfolio

**Decision:** All lab screens reuse the site's look (Dracula tokens, Space
Grotesk + JetBrains Mono, terminal-window chrome). See
[site/design-system.md](site/design-system.md).

**Why:** The public `/learning` page has to drop into the site cleanly, and
one visual language is less to maintain.
