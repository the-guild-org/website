import React from 'react';
import Head from 'next/head';
import { Layout } from './Layout';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? 'https://the-guild.dev' + url : url;
}

export const Page: React.FC<{
  description: string;
  image?: string;
  title: string;
}> = ({ title, description, image, children }) => {
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />

        <meta property="og:title" content={title} />

        {image && (
          <>
            <meta property="og:image" content={ensureAbsolute(image)} />
            <meta property="twitter:image" content={ensureAbsolute(image)} />
          </>
        )}

        <meta name="twitter:image:alt" content={title} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />

        <title>{title}</title>
      </Head>
      {children}
    </Layout>
  );
};
