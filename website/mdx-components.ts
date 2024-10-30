import { Callout, useMDXComponents as docsMDXComponents, Steps } from '@theguild/components';
import { Tweet } from '@/shared/embed/tweet';

const docsComponents = docsMDXComponents({
  Callout,
  Steps,
  Tweet
});

export const useMDXComponents: typeof docsMDXComponents = components => {
  return {
    ...docsComponents,
    ...components,
  };
};
