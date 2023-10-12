import { writeFile } from 'node:fs/promises';
import RSS from 'rss';
import { allBlogs } from './lib/all-blogs';
import { MetaWithLink } from './lib/meta';

export async function generateRSS(articles: MetaWithLink[]) {
  const feed = new RSS({
    title: 'The Guild Blog',
    site_url: 'https://the-guild.dev',
    feed_url: 'https://the-guild.dev/feed.xml',
  });

  for (const meta of articles) {
    feed.item({
      title: meta.title,
      guid: meta.link,
      url: `https://the-guild.dev${meta.link}`,
      date: meta.date,
      description: meta.description,
    });
  }

  const rss = feed.xml({ indent: '  ' });
  await writeFile('./out/feed.xml', rss);
  // eslint-disable-next-line no-console
  console.info('✅  RSS generated');
}

try {
  await Promise.all([generateRSS(allBlogs)]);
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
}
