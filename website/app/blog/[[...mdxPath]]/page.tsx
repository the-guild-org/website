import { generateStaticParamsFor, importPage } from '@theguild/components/nextra';
import { useMDXComponents as getDocsMDXComponents } from '../../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata(props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getDocsMDXComponents().wrapper;

// eslint-disable-next-line import/no-default-export
export default async function Page(props) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, useTOC, metadata, title } = result;

  return (
    <Wrapper toc={useTOC()} metadata={metadata} title={title}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
