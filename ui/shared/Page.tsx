import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { Layout } from './Layout';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

export const Page = ({
  title,
  description,
  image,
  children,
}: {
  description: string;
  image?: string;
  title: string;
  children: ReactNode;
}): ReactElement => {
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
          openGraph={
            image ? { images: [{ url: ensureAbsolute(image) }] } : undefined
          }
        />
        <meta name="description" content={description} />

        <title>{title}</title>
      </Head>
      {children}
    </Layout>
  );
};
