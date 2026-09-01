import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { fetchHiveFeed } from '../lib/hive-feed';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Replaces the previous website's rss-generator output at /feed.xml:
// local blog posts merged with the Hive blog feed, like the blog index.
export const GET: APIRoute = async ({ site }) => {
  const localPosts = (await getCollection('blog')).map(post => ({
    title: post.data.title,
    description: post.data.description,
    link: new URL(`/blog/${post.id}`, site).href,
    date: post.data.date,
  }));

  const hivePosts = (await fetchHiveFeed()).map(item => ({
    title: item.title,
    description: item.description,
    link: item.link,
    date: item.date,
  }));

  const items = [...localPosts, ...hivePosts].sort((a, b) => b.date.valueOf() - a.date.valueOf());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Guild Blog</title>
    <link>${site}</link>
    <description>Writing from The Guild — open source, GraphQL, and the craft of long-term software.</description>
    <atom:link href="${new URL('/feed.xml', site).href}" rel="self" type="application/rss+xml"/>
${items
  .map(
    item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(item.link)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml' } });
};
