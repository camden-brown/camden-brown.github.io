import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'writing'>;

/** All writing entries, newest first. */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection('writing');
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

/** ISO-ish date label, e.g. "2025-08-17". */
export function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
