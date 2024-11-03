import { Video } from '@/components';
import { CodeSandbox } from '@/shared/embed/code-sandbox';
import { Gfycat } from '@/shared/embed/gfycat';
import { LinkPreview } from '@/shared/embed/link-preview';
import { StackBlitz } from '@/shared/embed/stack-blitz';
import { Tweet } from '@/shared/embed/tweet';
import { Callout, Steps } from '@theguild/components';
import { useMDXComponents as getDocsMDXComponents } from '@theguild/components/server';

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

export const useMDXComponents = components => {
  return {
    ...docsComponents,
    ...components,
  };
};
