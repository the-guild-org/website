import { allBlogs } from '../../../lib/all-blogs';

export default () => {
  return {
    '*': {
      theme: {
        layout: 'full',
      },
    },
    ...Object.fromEntries([...new Set(allBlogs.flatMap(art => art.tags))].map(name => [name, ''])),
  };
};
