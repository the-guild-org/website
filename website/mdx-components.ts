import { Video } from '@/components';
import { CodeSandbox } from '@/shared/embed/code-sandbox';
import { Gfycat } from '@/shared/embed/gfycat';
import { LinkPreview } from '@/shared/embed/link-preview';
import { StackBlitz } from '@/shared/embed/stack-blitz';
import { Tweet } from '@/shared/embed/tweet';
import { Callout, useMDXComponents as getDocsMDXComponents, Steps } from '@theguild/components';

const docsComponents = getDocsMDXComponents({
  Callout,
  Steps,
  Tweet,
  Video,
  LinkPreview,
  CodeSandbox,
  Gfycat,
  StackBlitz,
});

export const useMDXComponents: typeof getDocsMDXComponents = components => {
  return {
    ...docsComponents,
    ...components,
  };
};
