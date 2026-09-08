import type { APIRoute } from 'astro';
import { PRODUCTS } from '../products/registry';

// The website-router worker fetches this sitemapindex and injects the
// product sites' sitemaps into it (packages/website-router/src/sitemap),
// so this must stay a <sitemapindex> served as application/xml.
export const GET: APIRoute = ({ site }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${new URL('/sitemap-0.xml', site).href}</loc>
  </sitemap>
  <sitemap>
    <loc>${new URL('/graphql/hive/sitemap.xml', site).href}</loc>
  </sitemap>
  <sitemap>
    <loc>${new URL('/graphql/codegen/sitemap.xml', site).href}</loc>
  </sitemap>
  <sitemap>
    <loc>${new URL('/graphql/yoga-server/sitemap.xml', site).href}</loc>
  </sitemap>
  <sitemap>
    <loc>${new URL('/graphql/envelop/sitemap.xml', site).href}</loc>
  </sitemap>
  <sitemap>
    <loc>${new URL('/graphql/inspector/sitemap.xml', site).href}</loc>
  </sitemap>
  <sitemap>
    <loc>${new URL('/graphql/mesh/sitemap.xml', site).href}</loc>
  </sitemap>
${PRODUCTS.map(
  product => `  <sitemap>
    <loc>${new URL(`/graphql/${product.slug}/sitemap.xml`, site).href}</loc>
  </sitemap>`,
).join('\n')}
</sitemapindex>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
