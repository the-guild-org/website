import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { globby } from 'globby';
import { format } from 'date-fns';
import { unified } from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import parseFrontmatter from 'remark-parse-frontmatter';
import stringify from 'remark-stringify';
import remarkMdx from 'remark-mdx';
import { MetaWithLink, Meta } from './meta';
import { asArray } from './as-array';

/**
 * Based on the files found in `pages/blog/*.mdx`
 */
export async function getAllArticles(tagsFilter: string[] = []): Promise<MetaWithLink[]> {
  const blogDir = join(process.cwd(), 'pages/blog');
  const filenames = await globby('*.mdx', {
    cwd: blogDir,
    absolute: false,
  });

  const articles = await Promise.all(
    filenames.filter(filename => filename !== 'index.mdx').map(file => readMeta(blogDir, file)),
  );

  return articles
    .filter(
      article =>
        tagsFilter.length === 0 || asArray(article.tags).some(tag => tagsFilter.includes(tag)),
    )
    .sort(sortByDateDesc);
}

/**
 * Reads frontMatter
 */
async function readMeta(dir: string, file: string): Promise<MetaWithLink> {
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
    if (parsed.title.length > 70) {
      throw new Error(
        `SEO issue: The title "${parsed.title}" is too long, should be less than 70 characters -link ${file}`,
      );
    }
    if (parsed.title.length < 20) {
      throw new Error(
        `SEO issue: The title "${parsed.title}" is too short, should be more than 20 characters - link ${file}`,
      );
    }
    if (parsed.description.length > 160) {
      throw new Error(
        `SEO issue: The description (${parsed.description.length}) "${parsed.description}" is too long, should be less than 160 characters - link ${file}`,
      );
    }
    if (parsed.description.length < 50) {
      throw new Error(
        `SEO issue: The description (${parsed.description.length}) "${parsed.description}" is too short, should be more than 50 characters - link ${file}`,
      );
    }
    return {
      ...parsed,
      tags: asArray(parsed.tags),
      authors: asArray(parsed.authors),
      link: `/blog/${file.replace(/\.mdx?/, '')}`,
      date: format(new Date(parsed.date), 'y-MM-dd'),
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error from filepath:', file);
    throw e;
  }
}

function sortByDateDesc(left: MetaWithLink, right: MetaWithLink): number {
  const date1 = new Date(left.date);
  const date2 = new Date(right.date);

  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}
