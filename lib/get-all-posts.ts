import globby from 'globby';
import { join } from 'path';
import { promises } from 'fs';
import JSON5 from 'json5';
import { MetaWithLink } from './types';

/**
 * Based on the files found in `pages/blog/*.mdx`
 */
export async function getAllPosts(): Promise<MetaWithLink[]> {
  const blogDir = join(process.cwd(), 'pages/blog');
  const filenames = await globby('*.mdx', {
    cwd: blogDir,
    absolute: false,
  });

  const posts = await Promise.all(
    filenames.map((file) => readMeta(blogDir, file))
  );

  return posts.sort(sortByDateDesc);
}

/**
 * Reads exported `meta` and parses with JSON5
 */
async function readMeta(dir: string, file: string): Promise<MetaWithLink> {
  const filepath = join(dir, file);
  const raw = await promises.readFile(filepath, 'utf-8');

  const [, result] = raw.match(/export const meta \= \{([^\}]+)\};/);

  return {
    ...JSON5.parse(`{ ${result.trim().replace(/,$/, '')} }`),
    link: `/blog/${file.replace(/\.mdx?/, '')}`,
  };
}

function sortByDateDesc(left: MetaWithLink, right: MetaWithLink) {
  const date1 = new Date(left.date);
  const date2 = new Date(right.date);

  if (date1 > date2) {
    return -1;
  }

  if (date1 < date2) {
    return 1;
  }

  return 0;
}
