import { promises } from 'node:fs';
import RSS from 'rss';
import { MetaWithLink } from './meta';
import { logAsComplete } from './utils';

export async function buildRSS(articles: MetaWithLink[]) {
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

  const rss = feed.xml({ indent: true });

  await promises.writeFile('./.next/static/feed.xml', rss);

  logAsComplete('RSS');
}
