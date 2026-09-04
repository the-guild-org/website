// Every post The Guild publishes, merged from the three sources the blog
// index shows: local posts, the Hive blog (lives in this repo under
// src/hive), and the archived Stellate blog. The blog index and /feed.xml
// both render this list so they can never drift apart.
import { getCollection } from 'astro:content';
import { fetchHiveFeed } from './hive-feed';
import stellatePosts from './stellate-blog.json';

export interface BlogPost {
  title: string;
  description: string;
  /** Site-relative for local posts, absolute for external ones. */
  href: string;
  date: Date;
  tags: string[];
  external: 'hive' | 'stellate' | null;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const localPosts = (await getCollection('blog')).map(post => ({
    title: post.data.title,
    description: post.data.description,
    href: `/blog/${post.id}`,
    date: post.data.date,
    tags: post.data.tags,
    external: null as 'hive' | 'stellate' | null,
  }));

  const hivePosts = (await fetchHiveFeed()).map(item => ({
    title: item.title,
    description: item.description,
    href: item.link,
    date: item.date,
    tags: item.tags,
    external: 'hive' as const,
  }));

  const stellateBlogPosts = stellatePosts.map(item => ({
    title: item.title,
    description: item.description,
    href: item.link,
    date: new Date(item.date),
    tags: ['stellate'],
    external: 'stellate' as const,
  }));

  return [...localPosts, ...hivePosts, ...stellateBlogPosts].sort(
    (a, b) => b.date.valueOf() - a.date.valueOf(),
  );
}
