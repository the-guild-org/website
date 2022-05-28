import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { OrganizationJsonLd } from 'next-seo';
import { getCssText } from '../stitches.config';
import { GA_TRACKING_ID } from '../lib/gtag';

const JS_COMMENT_REGEX = /\/\*[\s\S]*?\*\/|\/\/.*/g;

const noFlashCode = readFileSync(
  join(process.cwd(), '/public/static/no-flash.mjs'),
  'utf8'
)
  .replace(JS_COMMENT_REGEX, '')
  .trim();

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
          <script
            async
            // Global Site Tag (gtag.js) - Google Analytics
            src={`https://googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            id="googleTagManager"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');`,
            }}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,500,700,800&display=swap"
            rel="stylesheet"
          />
          <style dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/fav.ico" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for the-guild.dev"
            href="/feed.xml"
          />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: noFlashCode }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
