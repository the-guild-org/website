import RSS from 'rss';
import { getAllBlogs } from '@all-blogs';

export const dynamic = 'force-static';

export async function GET() {
  const feed = new RSS({
    title: 'The Guild Blog',
    site_url: 'https://the-guild.dev',
    feed_url: 'https://the-guild.dev/feed.xml',
  });

  for (const meta of await getAllBlogs()) {
    feed.item({
      title: meta.title,
      // @ts-expect-error -- fixme
      guid: meta.link,
      // @ts-expect-error -- fixme
      url: `https://the-guild.dev${meta.link}`,
      date: meta.date,
      description: meta.description,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
