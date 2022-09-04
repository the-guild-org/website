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
          <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,700,800&display=swap" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <meta charSet="utf-8" />
          <link href="/favicon-light.ico" rel="shortcut icon" media="(prefers-color-scheme: light)" />
          <link href="/favicon-dark.ico" rel="shortcut icon" media="(prefers-color-scheme: dark)" />
          <link rel="shortcut icon" href="/fav.ico" />
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
