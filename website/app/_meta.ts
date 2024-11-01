// import { MetaWithLink } from '../../lib/meta';

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
  //   theme: {
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

  //
  //           setSimilarArticles(similarArticles);
  //         });
  //       }, []);
  //     },
  //   },
  // },
};
