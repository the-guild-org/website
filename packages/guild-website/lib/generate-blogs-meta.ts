/* eslint-disable no-console */
import { writeFile } from 'node:fs/promises';
import { getAllArticles } from './get-all-articles';

try {
  const articles = await getAllArticles();
  await writeFile('./dist/blogs-meta.json', JSON.stringify(articles, null, 2));
  console.info('✅  Blogs meta JSON generated');
} catch (e) {
  console.error(e);
}
