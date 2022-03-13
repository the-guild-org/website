import { getAllArticles } from './get-all-articles';
import { generateRSS } from './rss';
import { generateSitemap } from './sitemap';

try {
  const articles = await getAllArticles();

  await Promise.all([generateRSS(articles), generateSitemap(articles)]);
} catch (e) {
  console.error(e);
  process.exit(1);
}
