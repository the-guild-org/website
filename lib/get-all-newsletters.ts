import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { globby } from 'globby';
import JSON5 from 'json5';
import { format } from 'date-fns';
import { NewsletterMetaWithLink } from './meta';

/**
 * Based on the files found in `pages/newsletter/*.mdx`
 */
export async function getAllNewsletters(): Promise<NewsletterMetaWithLink[]> {
  const newsletterDir = join(process.cwd(), 'pages/newsletter');
  const filenames = await globby('*.mdx', {
    cwd: newsletterDir,
    absolute: false,
  });

  const issues = await Promise.all(
    filenames.map((file) => readMeta(newsletterDir, file))
  );

  return issues.sort(sortByDateDesc);
}

/**
 * Reads exported `meta` and parses with JSON5
 */
async function readMeta(
  dir: string,
  file: string
): Promise<NewsletterMetaWithLink> {
  const filepath = join(dir, file);
  const raw = await readFile(filepath, 'utf-8');

  const [, result] = /export const meta = {([^}]+)/.exec(raw);

  const parsed = JSON5.parse(`{ ${result.trim().replace(/,$/, '')} }`);

  return {
    ...parsed,
    link: `/newsletter/${file.replace(/\.mdx?/, '')}`,
    date: format(new Date(parsed.date), 'y-MM-dd'),
  };
}

function sortByDateDesc(
  left: NewsletterMetaWithLink,
  right: NewsletterMetaWithLink
) {
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
