import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    // short summary shown in the Writing list; falls back to an excerpt if absent
    description: z.string().optional(),
    // draft: true → visible in `npm run dev`, excluded from production builds
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
