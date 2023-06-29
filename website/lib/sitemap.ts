import { writeFile } from 'node:fs/promises';
import { MetaWithLink } from './meta';

const createUrl = (
  pathname: string,
  priority = 0.5,
  changeFrequency: 'weekly' | 'daily' = 'weekly',
) =>
  `
<url>
  <loc>https://the-guild.dev${pathname}</loc>
  <changefreq>${changeFrequency}</changefreq>
  <priority>${priority}</priority>
</url>`;

export async function generateSitemap(articles: MetaWithLink[]) {
  const sitemap = `
<urlset
  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'
  xmlns:news='http://www.google.com/schemas/sitemap-news/0.9'
  xmlns:xhtml='http://www.w3.org/1999/xhtml'
  xmlns:mobile='http://www.google.com/schemas/sitemap-mobile/1.0'
  xmlns:image='http://www.google.com/schemas/sitemap-image/1.1'
  xmlns:video='http://www.google.com/schemas/sitemap-video/1.1'
>
  ${createUrl('/', 0.6)}
  ${createUrl('/contact')}
  ${createUrl('/services')}
  ${createUrl('/newsletter')}
  ${createUrl('/open-source')}
  ${createUrl('/blog', 0.8, 'daily')}
  ${createUrl('/newsletter', 0.5, 'weekly')}
  ${articles.map(art => createUrl(art.link)).join('\n')}
</urlset>`;

  await writeFile(
    './.next/static/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>${sitemap}`,
    'utf8',
  );

  // eslint-disable-next-line no-console
  console.info('✅  Sitemap generated');
}
