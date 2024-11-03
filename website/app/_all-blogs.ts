import { format } from 'date-fns';
import { asArray } from '@components';
import { getPageMap } from '@theguild/components/server';
import { Blog } from './types';

let allBlogs: Blog[];

export async function getAllBlogs(): Promise<Blog[]> {
  if (allBlogs) {
    return allBlogs;
  }

  const pageMap = await getPageMap();

  return (allBlogs ||=
    // Use flatMap to avoid use filter + map
    pageMap
      .find(item => item.name === 'blog')
      .children //
      .flatMap(blog => {
        if (blog.name === 'index') {
          return [];
        }

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

        return [
          {
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
          },
        ];
      })
      .sort(sortByDateDesc));
}

function sortByDateDesc(left, right) {
  const date1 = new Date(left.date);
  const date2 = new Date(right.date);
  if (date1 > date2) {
    return -1;
  }
  if (date1 < date2) {
    return 1;
  }
  return 0;
}
