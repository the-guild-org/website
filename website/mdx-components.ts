import { Callout, useMDXComponents as getDocsMDXComponents, Steps } from '@theguild/components';
import { Tweet } from '@/shared/embed/tweet';

const docsComponents = getDocsMDXComponents({
  Callout,
  Steps,
  Tweet
});

export const useMDXComponents: typeof getDocsMDXComponents = components => {
  return {
    ...docsComponents,
    ...components,
  };
};
