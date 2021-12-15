import { FC } from 'react';
import Head from 'next/head';
import { Layout } from './Layout';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

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
        <meta property="og:title" content={title} key="ogtitle" />

        {image && (
          <>
            <meta property="og:image" content={ensureAbsolute(image)} />
            <meta property="twitter:image" content={ensureAbsolute(image)} />
          </>
        )}

        <meta name="twitter:image:alt" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="TheGuildDev" key="twhandle" />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} key="ogdesc" />

        <title>{title}</title>
      </Head>
      {children}
    </Layout>
  );
};
