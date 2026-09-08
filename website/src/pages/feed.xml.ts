import type { APIRoute } from 'astro';
import { getAllPosts } from '../lib/posts';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Replaces the previous website's rss-generator output at /feed.xml:
// the same merged post list the blog index shows.
export const GET: APIRoute = async ({ site }) => {
  const items = (await getAllPosts()).map(post => ({
    ...post,
    link: post.href.startsWith('/') ? new URL(post.href, site).href : post.href,
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Guild Blog</title>
    <link>${site}</link>
    <description>Writing from The Guild on open source, GraphQL, and the craft of long-term software.</description>
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
