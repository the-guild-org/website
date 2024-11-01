import { FC } from 'react';
import { Authors } from '@/article';
import { BlogCardList, Image, Newsletter, TagList } from '@/components';
import { useMDXComponents as getDocsMDXComponents } from '@mdx-components';
import { Giscus } from '@theguild/components';
import { generateStaticParamsFor, importPage } from '@theguild/components/nextra';
import { getAllBlogs } from '../../../lib/all-blogs';

type Props = {
  params: Promise<{ mdxPath: string[] }>;
};

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const { wrapper: Wrapper, h1: H1 } = getDocsMDXComponents();

const Page: FC<Props> = async props => {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, useTOC, metadata, title } = result;

  const allBlogs = await getAllBlogs();
  const { tags } = result.metadata;

  const similarArticles = allBlogs
    .filter(
      article =>
        (article.link !== `/blog/${params.mdxPath}` && tags.length === 0) ||
        article.tags?.some(tag => tags.includes(tag)),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 12)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <Wrapper toc={useTOC()} metadata={metadata} title={title}>
      <H1>{metadata.title}</H1>
      <Authors meta={metadata} />
      <TagList tags={metadata.tags} className="mt-4" />
      <Image src={metadata.image} className="mx-auto mt-6 aspect-video object-contain" />
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
      <Newsletter className="mt-6 flex-col !gap-10" />
      {similarArticles.length > 0 && (
        <>
          <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">
            Similar articles
          </h3>
          <BlogCardList articles={similarArticles} className="!grid-cols-2" />
        </>
      )}
    </Wrapper>
  );
};

export default Page;
