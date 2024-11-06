import { FC } from 'react';
import { getAllBlogs } from '@all-blogs';
import { asArray, BlogCardList, Heading, HeroSection, Newsletter, TagList } from '@components';

function extractRelevantTags(articles) {
  const allTags = articles.flatMap(article => article.tags || []);
  const map: Record<string, number> = Object.create(null);
  for (const tag of allTags) {
    map[tag] ??= 0;
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

export const BlogPage: FC<{ tag?: string }> = async ({ tag }) => {
  const allBlogs = await getAllBlogs();
  const allTags = extractRelevantTags(allBlogs);
  const articles = tag ? allBlogs.filter(article => asArray(article.tags).includes(tag)) : allBlogs;

  return (
    <>
      <HeroSection>
        <Heading>The Guild's blog</Heading>
      </HeroSection>
      <div className="nextra-container">
        <TagList tags={allTags} withCount className="mb-20 mt-10" />
        {!tag && <Newsletter />}
        {/* @ts-expect-error -- fixme */}
        <BlogCardList articles={articles} />
      </div>
    </>
  );
};
