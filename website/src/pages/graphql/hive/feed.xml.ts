import { getCollection } from 'astro:content';

const SITE_URL = 'https://the-guild.dev/graphql/hive';

function escapeXml(value: string) {
  return value.replace(/[&<>'"]/g, char => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case "'":
        return '&apos;';
      default:
        return '&quot;';
    }
  });
}

function slug(id: string) {
  return id.replace(/\/index$/, '').replace(/\.(md|mdx)$/, '');
}

/**
 * Hive Changelog RSS feed. The old site serves this at runtime from the
 * product-updates content; readers subscribed to /feed.xml keep working.
 */
export async function GET() {
  const updates = (await getCollection('productUpdates'))
    .map(entry => {
      const data = entry.data as {
        date: Date | string;
        description: string;
        title: string;
      };
      const date =
        data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);

      return {
        date,
        description: data.description ?? '',
        title: data.title,
        url: `${SITE_URL}/product-updates/${slug(entry.id)}`,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  if (updates.length === 0) throw new Error('No product updates found for RSS feed');

  const items = updates
    .map(
      item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hive Changelog</title>
    <link>${SITE_URL}</link>
    <description>Hive Changelog</description>
    <language>en</language>
    <lastBuildDate>${new Date(updates[0]!.date).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
