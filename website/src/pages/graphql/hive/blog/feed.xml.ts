import type { APIRoute } from 'astro';
import { resolveAuthor } from '../../../../hive/lib/authors';
import { getBlogPosts } from '../../../../hive/lib/get-blog-posts';

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

export const GET: APIRoute = async () => {
  const posts = await getBlogPosts();
  if (posts.length === 0) throw new Error('No blog posts found for RSS feed');

  const items = posts
    .map(post => {
      const firstAuthor = post.authors[0];
      const author = firstAuthor ? resolveAuthor(firstAuthor).name : undefined;
      const url = `${SITE_URL}${post.route}`;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
      ${author ? `<author>${escapeXml(author)}</author>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hive Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Hive Blog</description>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0]!.date).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
