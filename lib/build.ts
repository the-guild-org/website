import { getAllArticles } from './get-all-articles.js';
import { buildRSS } from './rss.js';
import { buildSitemap } from './sitemap.js';

async function build() {
  const articles = await getAllArticles();

  await Promise.all([buildRSS(articles), buildSitemap(articles)]);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
