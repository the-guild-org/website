import { getAllArticles } from './get-all-articles';
import { buildRSS } from './rss';
import { buildSitemap } from './sitemap';

async function build() {
  const articles = await getAllArticles();

  await Promise.all([buildRSS(articles), buildSitemap(articles)]);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
