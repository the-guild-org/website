import blogs from '../../../blogs.json';

export default () => {
  return {
    '*': {
      theme: {
        layout: 'full',
      },
    },
    ...Object.fromEntries([...new Set(blogs.flatMap(art => art.tags))].map(name => [name, ''])),
  };
};
