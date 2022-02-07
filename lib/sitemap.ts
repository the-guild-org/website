import { writeFile } from 'node:fs/promises';
import { MetaWithLink } from './meta';
import { logAsComplete } from './utils';

const createUrl = (link: string) => {
  return /* HTML */ `
    <url>
      <loc>https://the-guild.dev${link}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
  `;
};

export async function buildSitemap(articles: MetaWithLink[]) {
  const body = articles.map((art) => createUrl(art.link)).join('\n');

  const sitemap = /* HTML */ `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>https://the-guild.dev/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>https://the-guild.dev/contact</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://the-guild.dev/services</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://the-guild.dev/open-source</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://the-guild.dev/blog</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      ${body}
    </urlset>
  `;

  await writeFile('./.next/static/sitemap.xml', sitemap.trimStart(), 'utf-8');

  logAsComplete('Sitemap');
}
