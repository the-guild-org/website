import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
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
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "The Guild",
      "url": "https://the-guild.dev",
      "email": "contact@the-guild.dev",
      "logo": "https://the-guild.dev/static/logo.svg"
    };
    
    return (
      <Html lang="en">
        <Head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(richData) }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
