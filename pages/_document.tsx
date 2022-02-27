import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { getCssText } from '../stitches.config';

const JS_COMMENT_REGEX = /\/\*[\s\S]*?\*\/|\/\/.*/g;

const noFlashCode = readFileSync(
  join(process.cwd(), '/public/static/no-flash.mjs'),
  'utf8'
)
  .replace(JS_COMMENT_REGEX, '')
  .trim();

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    };
  }

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
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,500,700,800&display=swap"
            rel="stylesheet"
          />
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
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
