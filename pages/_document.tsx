import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Document, { Head, Main, NextScript, Html } from 'next/document';
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
    const richData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'The Guild',
      url: 'https://the-guild.dev',
      email: 'contact@the-guild.dev',
      logo: 'https://the-guild.dev/static/logo.svg',
    };

    return (
      <Html lang="en">
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(richData) }}
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
