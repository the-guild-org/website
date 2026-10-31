import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ROUTER_SITEMAP_PAGES } from '../lib/router-pages';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');

  const entries: { path: string; lastmod?: Date }[] = [
    { path: '/' },
    { path: '/blog' },
    { path: '/logos' },
    { path: '/graphqlconf' },
    // Hive's federation benchmark and compatibility audit, served by their own deployments.
    ...ROUTER_SITEMAP_PAGES.map(path => ({ path })),
    ...posts.map(post => ({
      path: `/blog/${post.id}`,
      lastmod: post.data.updateDate ?? post.data.date,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(entry => {
    const loc = `    <loc>${new URL(entry.path, site).href}</loc>`;
    const lastmod = entry.lastmod
      ? `\n    <lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>`
      : '';
    return `  <url>\n${loc}${lastmod}\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
