import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { globby } from 'globby';
import { format } from 'date-fns';
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import frontmatter from 'remark-frontmatter';
import parseFrontmatter from 'remark-parse-frontmatter';
import stringify from 'remark-stringify';
import { Meta, NewsletterMetaWithLink } from './meta';

/**
 * Based on the files found in `pages/newsletter/*.mdx`
 */
export async function getAllNewsletters(): Promise<NewsletterMetaWithLink[]> {
  const newsletterDir = join(process.cwd(), 'pages/newsletter');
  const filenames = await globby('*.mdx', {
    cwd: newsletterDir,
    absolute: false,
  });

  const issues = await Promise.all(filenames.map(file => readMeta(newsletterDir, file)));

  return issues.sort(sortByDateDesc);
}

/**
 * Reads frontMatter
 */
async function readMeta(dir: string, file: string): Promise<NewsletterMetaWithLink> {
  const raw = await readFile(join(dir, file), 'utf8');

  try {
    const processor = unified()
      .use(parse)
      .use(remarkMdx)
      .use(frontmatter)
      .use(parseFrontmatter, {
        // properties: {
        //   title: { type: 'title', required: true },
        //   tags: { type: 'tags', minItems: 1 },
        // },
      })
      .use(stringify);
    const vFile = await processor.process(raw);
    const parsed = vFile.data.frontmatter as Meta;
    return {
      ...parsed,
      link: `/newsletter/${file.replace(/\.mdx?/, '')}`,
      date: format(new Date(parsed.date), 'y-MM-dd'),
    };
  } catch (e) {
    console.error('Error from filepath:', file);
    throw e;
  }
}

function sortByDateDesc(left: NewsletterMetaWithLink, right: NewsletterMetaWithLink) {
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
