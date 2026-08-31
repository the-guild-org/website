// Build-time fetch of the Hive blog RSS feed, mirroring the previous
// website's load-hive-feed step: Hive posts are merged into the blog
// index as external links.
const FEED_URL = 'https://the-guild.dev/graphql/hive/blog/feed.xml';

export interface HiveFeedItem {
  title: string;
  description: string;
  link: string;
  date: Date;
  tags: string[];
}

function field(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 's'));
  if (!match) return '';
  return match[1]
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .trim();
}

export async function fetchHiveFeed(): Promise<HiveFeedItem[]> {
  const response = await fetch(FEED_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch Hive blog feed: HTTP ${response.status}`);
  }
  const xml = await response.text();
  const items = [...xml.matchAll(/<item>(.*?)<\/item>/gs)].map(([, item]) => ({
    title: field(item, 'title'),
    description: field(item, 'description'),
    link: field(item, 'link'),
    date: new Date(field(item, 'pubDate')),
    tags: [...item.matchAll(/<category>(.*?)<\/category>/gs)].map(([, tag]) =>
      tag
        .replace(/^<!\[CDATA\[/, '')
        .replace(/\]\]>$/, '')
        .trim()
        .replaceAll(' ', '-')
        .toLowerCase(),
    ),
  }));
  if (items.length === 0) {
    throw new Error('Hive blog feed parsed to zero items — feed format may have changed');
  }
  return items;
}
