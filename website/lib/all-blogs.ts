import { format } from 'date-fns';
import { asArray } from './as-array';
import externalFeed from './hive-blog-feed.json';
import { sortByDateDesc } from './sort-by-date';
// eslint-disable-next-line import/no-useless-path-segments -- this will exist when we do `next build`
import { pageMap } from '.next/static/chunks/nextra-page-map-.mjs';

const blogFolder = pageMap.find(item => item.name === 'blog' && item.children).children;

const allInternalBlogs = blogFolder
  .filter(item => !item.data && item.route !== '/blog/tag')
  .map(blog => {
    if (blog.children) {
      blog = blog.children.find(item => item.name === 'index');
    }
    const { title, description, tags, authors, image, date, updateDate, thumbnail, canonical } =
      blog.frontMatter;
    const { route } = blog;

    if (title.length > 70) {
      throw new Error(
        `SEO issue: The title "${title}" is too long, should be less than 70 characters - route ${route}`,
      );
    }

    if (title.length < 20) {
      throw new Error(
        `SEO issue: The title "${title}" is too short, should be more than 20 characters - route ${route}`,
      );
    }

    if (description.length > 160) {
      throw new Error(
        `SEO issue: The description "${description}" is too long, should be less than 160 characters, not ${description.length}, route "${route}"`,
      );
    }

    if (description.length < 50) {
      throw new Error(
        `SEO issue: The description "${description}" is too short, should be more than 50 characters, not ${description.length}, route "${route}"`,
      );
    }

    return {
      title,
      description,
      tags,
      authors: asArray(authors),
      link: route,
      image,
      date: format(new Date(date), 'y-MM-dd'),
      thumbnail,
      canonical,
      updateDate: updateDate ? format(new Date(updateDate), 'y-MM-dd') : undefined,
      isHive: false,
    };
  });

const allExternalBlogs = externalFeed.items.map(item => ({
  title: item.title,
  description: item.content,
  tags: item.categories,
  authors: [item.creator],
  link: item.link,
  image: null,
  date: format(new Date(item.isoDate), 'y-MM-dd'),
  thumbnail: null,
  canonical: item.link,
  updateDate: format(new Date(item.isoDate), 'y-MM-dd'),
}));

export const allBlogs = [...allInternalBlogs, ...allExternalBlogs].sort(sortByDateDesc);
