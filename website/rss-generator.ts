import { readFile, writeFile } from 'node:fs/promises';
import RSS from 'rss';
import { MetaWithLink } from './lib/meta';

const NEXTRA_PAGE_MAP_PATH = './.next/static/chunks/nextra-page-map-.mjs';

async function generateRSS() {
  const RAW_PAGE_MAP = await readFile(NEXTRA_PAGE_MAP_PATH, 'utf8');

  const pageMapWithoutResolvePageMap = RAW_PAGE_MAP.slice(
    0,
    RAW_PAGE_MAP.indexOf("import { resolvePageMap } from 'nextra/page-map-dynamic'"),
  );

  await writeFile(NEXTRA_PAGE_MAP_PATH, pageMapWithoutResolvePageMap);

  // use dynamic import since we remove import statement in nextra's page map
  const { allBlogs } = await import('./lib/all-blogs');

  const feed = new RSS({
    title: 'The Guild Blog',
    site_url: 'https://the-guild.dev',
    feed_url: 'https://the-guild.dev/feed.xml',
  });

  for (const meta of allBlogs as MetaWithLink[]) {
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
  await generateRSS();
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
}
