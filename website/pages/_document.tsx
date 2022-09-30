import Document, { Head, Main, NextScript, Html } from 'next/document';
import { OrganizationJsonLd } from 'next-seo';
import { getCssText } from '../stitches.config';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <OrganizationJsonLd
            url="https://the-guild.dev"
            logo="https://the-guild.dev/static/logo.svg"
            name="The Guild"
          />
          <style dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <meta charSet="utf-8" />
          <link rel="alternate" type="application/rss+xml" title="RSS Feed for the-guild.dev" href="/feed.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
