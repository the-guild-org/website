import { Video } from '@/components';
import { Tweet } from '@/shared/embed/tweet';
import { Callout, useMDXComponents as getDocsMDXComponents, Steps } from '@theguild/components';

const docsComponents = getDocsMDXComponents({
  Callout,
  Steps,
  Tweet,
  Video,
});

export const useMDXComponents: typeof getDocsMDXComponents = components => {
  return {
    ...docsComponents,
    ...components,
  };
};
