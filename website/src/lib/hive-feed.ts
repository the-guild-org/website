// The Hive blog lives in this repo (src/hive), so the blog index reads it
// directly instead of fetching the production RSS feed — a build-time fetch
// of our own deployment is circular: if production is down or stale, the
// build that would fix it can't complete.
import { getBlogPosts } from '../hive/lib/get-blog-posts';

const HIVE_SITE_URL = 'https://the-guild.dev/graphql/hive';

export interface HiveFeedItem {
  title: string;
  description: string;
  link: string;
  date: Date;
  tags: string[];
}

export async function fetchHiveFeed(): Promise<HiveFeedItem[]> {
  const posts = await getBlogPosts();
  if (posts.length === 0) {
    throw new Error('Hive blog collection is empty');
  }
  return posts.map(post => ({
    title: post.title,
    description: post.description,
    link: `${HIVE_SITE_URL}${post.route}`,
    date: new Date(post.date),
    // Same normalization the RSS parser applied to <category> values.
    tags: post.tags.map(tag => tag.trim().replaceAll(' ', '-').toLowerCase()),
  }));
}
