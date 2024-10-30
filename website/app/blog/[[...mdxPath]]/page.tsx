import { useMDXComponents as getDocsMDXComponents } from '@mdx-components';
import { generateStaticParamsFor, importPage } from '@theguild/components/nextra';
import { Giscus } from '@theguild/components';
import { BlogCardList, Newsletter } from '@/components';

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
      <Giscus
        // ensure giscus is reloaded when client side route is changed
        // key={route}
        repo="the-guild-org/website"
        repoId="MDEwOlJlcG9zaXRvcnkxOTk3MTM1NzI="
        category="Docs Discussions"
        categoryId="DIC_kwDOC-djJM4CSZk-"
        mapping="pathname"
      />
      {/*<Newsletter className="mt-6 flex-col !gap-10" />*/}
      {/*{similarArticles.length > 0 && (*/}
      {/*  <>*/}
      {/*    <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">*/}
      {/*      Similar articles*/}
      {/*    </h3>*/}
      {/*    <BlogCardList articles={similarArticles} className="!grid-cols-2" />*/}
      {/*  </>*/}
      {/*)}*/}
    </Wrapper>
  );
}
