import {
  Video,
  CodeSandbox,
  Gfycat,
  LinkPreview,
  StackBlitz,
  Tweet,
} from '@components';
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
