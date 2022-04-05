import { FC } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { Layout } from './Layout';

export const Page: FC<{
  description: string;
  image?: string;
  title: string;
}> = ({ title, description, image, children }) => {
  return (
    <Layout>
      <Head>
        <meta
          property="og:site_name"
          content="the-guild.dev"
          key="ogsitename"
        />

        <NextSeo
          title={title}
          description={description}
          openGraph={{ images: [{ url: image }] }}
        />
        <meta name="description" content={description} />

        <title>{title}</title>
      </Head>
      {children}
    </Layout>
  );
};
