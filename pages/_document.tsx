import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const noFlashCode = readFileSync(
  join(process.cwd(), '/public/static/no-flash.mjs'),
  'utf8'
);

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
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
            href="https://fonts.googleapis.com/css?family=Poppins:400,500,700&display=swap"
            rel="stylesheet"
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
