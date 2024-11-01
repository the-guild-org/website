import { FC } from 'react';
import { BlogCardList, Heading, Newsletter, TagList } from '@/components';
import { HeroSection } from '@/hero-section';
import { getAllBlogs } from '../../lib/all-blogs';
import { asArray } from '../../lib/as-array';

export const metadata = {
  title: 'Blog',
  description: 'Announcements about our Open-Source projects',
};

function extractRelevantTags(articles) {
  const allTags = articles.flatMap(article => article.tags || []);
  const map = Object.create(null);
  for (const tag of allTags) {
    map[tag] = map[tag] == null ? 0 : map[tag];
    map[tag] += 1;
  }
  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  if (sorted.every(([tagName]) => tagName !== 'codegen')) {
    sorted.unshift(['codegen', 0]);
  }
  if (sorted.every(([tagName]) => tagName !== 'envelop')) {
    sorted.unshift(['envelop', 0]);
  }
  return sorted.slice(0, 10);
}

const BlogPage: FC<{ tag: string }> = async ({ tag }) => {
  const allBlogs = await getAllBlogs();
  const allTags = extractRelevantTags(allBlogs);
  const articles = tag ? allBlogs.filter(article => asArray(article.tags).includes(tag)) : allBlogs;

  return (
    <>
      <HeroSection>
        <Heading>The Guild's blog</Heading>
      </HeroSection>
      <div className="nextra-container">
        <TagList tags={allTags} withCount asLink className="mb-20 mt-10" />
        {!tag && <Newsletter />}
        <BlogCardList articles={articles} />
      </div>
    </>
  );
};

export default BlogPage;
