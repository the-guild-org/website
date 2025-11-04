import Document, { Head, Html, Main, NextScript } from 'next/document';
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
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for the-guild.dev"
            href="/feed.xml"
          />
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
          <link rel="preconnect" href="https://challenges.cloudflare.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
