import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Article } from '@/article';
import { BlogCardList, Newsletter } from '@/components';
import { Giscus, useConfig, useTheme } from '@theguild/components';
import { MetaWithLink } from '../../lib/meta';

export default {
  tag: {
    // TODO: fix `normalizePages` in nextra, currently it cannot find right item since we have `display: hidden` in `*`
    display: 'normal',
  },
  '*': {
    display: 'hidden',
    theme: {
      layout: 'default',
      sidebar: false,
      toc: true,
      typesetting: 'article',
      breadcrumb: false,
      pagination: false,
      topContent: Article,
      bottomContent: function BottomContent() {
        const { resolvedTheme } = useTheme();
        const { route } = useRouter();
        const config = useConfig();
        const { tags } = config.frontMatter;
        const [similarArticles, setSimilarArticles] = useState<MetaWithLink[]>([]);

        useEffect(() => {
          import('../../lib/all-blogs').then(({ allBlogs }) => {
            if (!tags) {
              return;
            }

            const similarArticles = allBlogs
              .filter(
                article =>
                  article.link !== route &&
                  (tags.length === 0 || article.tags?.some(tag => tags.includes(tag))),
              )
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 12)
              .sort(() => 0.5 - Math.random())
              .slice(0, 4);

            setSimilarArticles(similarArticles);
          });
        }, []);

        return (
          <>
            <Giscus
              // ensure giscus is reloaded when client side route is changed
              key={route}
              repo="the-guild-org/website"
              repoId="MDEwOlJlcG9zaXRvcnkxOTk3MTM1NzI="
              category="Docs Discussions"
              categoryId="DIC_kwDOC-djJM4CSZk-"
              mapping="pathname"
              theme={resolvedTheme}
            />
            <Newsletter className="mt-6 flex-col !gap-10" />
            {similarArticles.length > 0 && (
              <>
                <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">
                  Similar articles
                </h3>
                <BlogCardList articles={similarArticles} className="!grid-cols-2" />
              </>
            )}
          </>
        );
      },
    },
  },
};
