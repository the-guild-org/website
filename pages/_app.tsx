import App, { NextWebVitalsMetric } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import { extendTheme } from '@chakra-ui/react';
import { createGlobalStyle } from 'styled-components';
import { CombinedThemeProvider, AppSeoProps } from '@guild-docs/client';
import 'prism-theme-night-owl';
import 'remark-admonitions/styles/classic.css';
import * as gtag from '../lib/gtag';
import { GA_TRACKING_ID } from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  gtag.event({
    action: name,
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id,
    non_interaction: true,
  });
}

const accentColor = '#1cc8ee';

const GlobalStyle = createGlobalStyle`
  // TODO: Remove this when guild/components Header/Footer will can accept bg color
  @media (min-width: 768px) {
    header,
    header > div > nav {
      background-color: transparent !important;
    }
  }

  footer {
    background-color: transparent !important;
  }

  html[data-theme='dark'] {
    &,
    body,
    #tgc-modal,
    #tgc-modal > div:last-child > div {
      background-color: var(--colors-background);
    }
  }

  body {
    z-index: -1; /* needs for blue and pink circles */
  }
`;

const theme = extendTheme({
  colors: {
    accentColor,
  },
  fonts: {
    heading: 'TGCFont, sans-serif',
    body: 'TGCFont, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const defaultSeo: AppSeoProps = {
  title: 'The Guild',
  description: 'Modern API Platform and Ecosystem that scales',
  logo: {
    url: 'https://guild.dev/static/logo.svg',
    width: 88,
    height: 50,
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/fav.ico" />
          <script
            async
            // Global Site Tag (gtag.js) - Google Analytics
            src={`https://googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');`,
            }}
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for the-guild.dev"
            href="/feed.xml"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,500,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Script src="/static/crisp.js" />
        <GlobalStyle />
        <style global jsx>
          {`
            html,
            body,
            #__next {
              margin: 0;
              width: 100%;
              height: 100%;
            }

            :root {
              --colors-text: white;
              --colors-dim: #777;
              --colors-dim-dark: #555;
              --colors-accent: #1cc8ee;
              --colors-accent-light: #1cc8ee;
              --colors-error: #bf120d;
              --colors-error-light: #ff3f38;
              --colors-primary: white;
              --colors-background: #0b0d11;
              --hover-opacity: 0.75;

              // After upgrading @theguild/components from 1.7.0 to 1.7.1 Modal is no longer centered
              // Manually adding below styles fix that issue
              --tw-translate-x: -50%;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-skew-x: 0;
              --tw-skew-y: 0;
              --tw-scale-x: 1;
              --tw-scale-y: 1;
              --tw-transform: translateX(var(--tw-translate-x))
                translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
                skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
                scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
            }

            body {
              font-family: Poppins, sans-serif;
            }

            a {
              cursor: pointer;
              text-decoration: none;
              transition: all 0.2s ease 0s;
            }

            html {
              // For smooth scrolling effect when click on '#' hash links
              scroll-behavior: smooth;
            }
          `}
        </style>
        <CombinedThemeProvider
          theme={theme}
          accentColor={accentColor}
          defaultSeo={defaultSeo}
        >
          <Component {...pageProps} />
        </CombinedThemeProvider>
      </>
    );
  }
}
