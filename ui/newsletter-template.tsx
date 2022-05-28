import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

import { styled } from '../stitches.config';
import { components } from './blog/elements';
import { Newsletter, GenericLink, Heading } from './components';
import { Page } from './shared/Page';
import { NewsletterMeta } from '../lib/meta';

const Content = styled('div', {
  fontFamily: 'Open Sans, sans-serif',
  paddingTop: 25,
  fontWeight: 400,
  '> *': {
    marginBottom: '1.7rem',
  },
  '> pre[class*="language-"]': {
    margin: 0,
    marginBottom: '1.7rem',
    borderRadius: 3,
    '> pre': {
      padding: '1.5rem',
      margin: 0,
    },
  },
});

const NewsletterPage = (meta: NewsletterMeta): FC =>
  function NewsletterRender({ children }) {
    const title = `${meta.title} - The Guild Newsletter`;
    const router = useRouter();

    const markupData: OpenGraph = {
      title,
      images: [{ url: 'https://the-guild.dev/img/ogimage.png' }],
      article: {
        authors: ['The Guild'],
        publishedTime: new Date(meta.date).toISOString(),
        modifiedTime: new Date(meta.date).toISOString(),
        tags: ['newsletter', 'graphql'],
      },
    };

    return (
      <MDXProvider components={components}>
        <Head>
          <link rel="canonical" href={`https://the-guild.dev${router.route}`} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <NextSeo
          title={meta.title}
          description={meta.description}
          openGraph={markupData}
        />
        <ArticleJsonLd
          title={title}
          description={meta.description}
          url={`https://the-guild.dev${router.route}`}
          publisherName="The Guild"
          publisherLogo="https://the-guild.dev/static/logo.svg"
          authorName="The Guild"
          datePublished={new Date(meta.date).toISOString()}
          dateModified={new Date(meta.date).toISOString()}
          images={['https://the-guild.dev/img/ogimage.png']}
        />

        <Page
          title={title}
          image="https://the-guild.dev/img/ogimage.png"
          description={meta.description}
        >
          <div className="mx-auto w-[790px] max-w-[100vw] px-4 pt-32 sm:px-6 md:px-8">
            <Heading className="text-center text-[42px]">{meta.title}</Heading>
            <div className="mt-6 border-l-[3px] border-solid border-[#1cc8ee] bg-gray-100 p-6 leading-7 text-[#777] dark:bg-gray-900">
              Looking for experts? We offer consulting and trainings.
              <br />
              Explore{' '}
              <GenericLink
                href="/services"
                title="Explore our services. Consulting and Trainings."
              >
                our services
              </GenericLink>{' '}
              and get in touch.
            </div>
            <Content className="dark:text-[#7F818C]">{children}</Content>
          </div>
          <Newsletter />
        </Page>
      </MDXProvider>
    );
  };

export default NewsletterPage;
