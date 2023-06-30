import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { format } from 'date-fns';
import prettier from 'prettier';
import { withGuildDocs } from '@theguild/components/next.config';

const asArray = value => (Array.isArray(value) ? value : [value]);

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

let blogsMetaSaved = false;

export default withGuildDocs({
  env: {
    // needs for canonical <link />
    SITE_URL: 'https://the-guild.dev',
  },
  redirects: () =>
    Object.entries({
      '/contact': '/#get-in-touch',
      '/open-source': '/#platform',
      '/connected-build': '/',
      '/blog/announcing-graphql-hive-public': '/blog/announcing-graphql-hive-release',
      '/blog/announcing-graphql-yoga-2': '/blog/announcing-graphql-yoga-v2',
      '/blog/graphql-cli': '/blog/graphql-cli-is-back',
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
  transformPageOpts(pageOpts) {
    if (!blogsMetaSaved && pageOpts.route === '') {
      try {
        const blogs = pageOpts.pageMap.find(
          item => item.kind === 'Folder' && item.name === 'blog',
        ).children;

        const articles = blogs
          .filter(item => item.kind !== 'Meta' && item.route !== '/blog/tag')
          .map(blog => {
            if (blog.kind === 'Folder') {
              blog = blog.children.find(item => item.name === 'index');
            }
            const {
              title,
              description,
              tags,
              authors,
              image,
              date,
              updateDate,
              thumbnail,
              canonical,
            } = blog.frontMatter;
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
                `SEO issue: The description (${description.length}) "${description}" is too long, should be less than 160 characters - route ${route}`,
              );
            }

            if (description.length < 50) {
              throw new Error(
                `SEO issue: The description (${description.length}) "${description}" is too short, should be more than 50 characters - route ${route}`,
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
            };
          })
          .sort(sortByDateDesc);

        writeFileSync(
          path.join(process.cwd(), 'blogs.json'),
          prettier.format(JSON.stringify(articles), {
            parser: 'json',
            ...prettier.resolveConfig.sync('./blogs.json'),
          }),
        );
        // eslint-disable-next-line no-console
        console.log('✅ blogs meta saved!');
        blogsMetaSaved = true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        process.exit(1);
      }
    }
    return pageOpts;
  },
});
