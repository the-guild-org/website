// import { MetaWithLink } from '../../lib/meta';

// eslint-disable-next-line import/no-default-export
export default {
  blog: {
    type: 'page',
    title: 'Blog',
    theme: {
      sidebar: false,
      pagination: false,
      typesetting: 'article',
    },
  },
  logos: {
    type: 'page',
    display: 'hidden',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  'about-us': {
    type: 'page',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  contact: {
    title: 'Contact Us',
    type: 'page',
    href: '/contact',
  },
  // '*': {
  //   display: 'hidden',
  //   theme: {
  //     layout: 'default',
  //     sidebar: false,
  //     toc: true,
  //     typesetting: 'article',
  //     breadcrumb: false,
  //     pagination: false,
  //     bottomContent: function BottomContent() {
  //       const { route } = useRouter();
  //       const config = useConfig();
  //       const { tags } = config.frontMatter;
  //       const [similarArticles, setSimilarArticles] = useState<MetaWithLink[]>([]);
  //
  //       useEffect(() => {
  //         import('../../lib/all-blogs').then(({ allBlogs }) => {
  //           if (!tags) {
  //             return;
  //           }
  //
  //           const similarArticles = allBlogs
  //             .filter(
  //               article =>
  //                 article.link !== route &&
  //                 (tags.length === 0 || article.tags?.some(tag => tags.includes(tag))),
  //             )
  //             .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //             .slice(0, 12)
  //             .sort(() => 0.5 - Math.random())
  //             .slice(0, 4);
  //
  //           setSimilarArticles(similarArticles);
  //         });
  //       }, []);
  //     },
  //   },
  // },
};
