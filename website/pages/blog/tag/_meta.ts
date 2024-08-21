import { createCatchAllMeta } from '@theguild/components';

export default async () => {
  // @ts-expect-error -- TODO: add types
  const { getStaticPaths } = await import('./[tag].mdx');

  const { paths } = await getStaticPaths();

  const tags = paths.map(o => o.params.tag);

  // TODO: remove this requirements of specifying files, since there is `*` symbol which could be applied
  const result = createCatchAllMeta(tags, {
    '*': {
      theme: {
        layout: 'raw',
      },
    },
  });

  return result;
};
