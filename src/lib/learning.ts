import { z } from 'astro/zod';
import raw from '../data/learning.json';

/**
 * `src/data/learning.json` is written by Palanaeum's `npm run export` (or by
 * hand). This schema is the site's side of that contract; a file that doesn't
 * match fails the build instead of rendering a broken page.
 * Contract: docs/learning-page.md.
 */
const status = z.enum(['comfortable', 'studying', 'next']);

const schema = z.object({
  updatedAt: z.string().date(),
  topics: z.array(
    z.object({
      name: z.string(),
      why: z.string(),
      // status is optional until Palanaeum exports real data
      concepts: z.array(z.object({ name: z.string(), status: status.optional() })),
    }),
  ),
  writeups: z.array(z.object({ title: z.string(), href: z.string() })).default([]),
});

export type ConceptStatus = z.infer<typeof status>;

export const learning = schema.parse(raw);

/** Show the legend and status icons only once there's real status data. */
export const hasStatuses = learning.topics.some((t) => t.concepts.some((c) => c.status));

/** Icon + label per status, in legend order. */
export const statuses: { id: ConceptStatus; icon: string; label: string }[] = [
  { id: 'comfortable', icon: '✓', label: 'comfortable' },
  { id: 'studying', icon: '●', label: 'studying' },
  { id: 'next', icon: '○', label: 'up next' },
];

export const statusMeta = Object.fromEntries(statuses.map((s) => [s.id, s])) as Record<
  ConceptStatus,
  (typeof statuses)[number]
>;

/** "2026-10-11" → "Oct 11, 2026" (UTC, so the date never shifts). */
export function fmtUpdated(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
