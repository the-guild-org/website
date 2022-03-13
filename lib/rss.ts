import { writeFile } from 'node:fs/promises';
import RSS from 'rss';
import { MetaWithLink } from './meta';

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

  await writeFile('./.next/static/feed.xml', rss);
  console.info('✅  RSS generated');
}
