import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: ['**/*.mdx', '!**/_*/**'] }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    description: z.string(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { blog };
