import { join } from 'path';
import { promises } from 'fs';
import { globby } from 'globby';
import JSON5 from 'json5';
import { format } from 'date-fns';
import { MetaWithLink } from './meta';

/**
 * Based on the files found in `pages/blog/*.mdx`
 */
export async function getAllArticles(
  tagsFilter: string[] = []
): Promise<MetaWithLink[]> {
  const blogDir = join(process.cwd(), 'pages/blog');
  const filenames = await globby('*.mdx', {
    cwd: blogDir,
    absolute: false,
  });

  const articles = await Promise.all(
    filenames.map((file) => readMeta(blogDir, file))
  );

  return articles
    .filter((article) => {
      if (tagsFilter.length === 0) {
        return true;
      }

      return (article.tags || []).some((articleTag) =>
        tagsFilter.includes(articleTag)
      );
    })
    .sort(sortByDateDesc);
}

/**
 * Reads exported `meta` and parses with JSON5
 */
async function readMeta(dir: string, file: string): Promise<MetaWithLink> {
  const filepath = join(dir, file);
  const raw = await promises.readFile(filepath, 'utf-8');

  const [, result] = /export const meta = {([^}]+)/.exec(raw);

  const parsed = JSON5.parse(`{ ${result.trim().replace(/,$/, '')} }`);

  return {
    ...parsed,
    link: `/blog/${file.replace(/\.mdx?/, '')}`,
    date: format(new Date(parsed.date), 'y-MM-dd'),
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
