import { getAllArticles } from './get-all-articles';
import { getAllNewsletters } from './get-all-newsletters';
import { generateRSS } from './rss';
import { generateSitemap } from './sitemap';

try {
  const [articles, newsletters] = await Promise.all([getAllArticles(), getAllNewsletters()]);

  await Promise.all([generateRSS(articles), generateSitemap(articles, newsletters)]);
} catch (e) {
  console.error(e);
  process.exit(1);
}
