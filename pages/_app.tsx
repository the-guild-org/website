import App, { NextWebVitalsMetric } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from '@theguild/components';
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

const GlobalStyle = createGlobalStyle`
  html {
    // For smooth scrolling effect when click on '#' hash links
    scroll-behavior: smooth;
    background-color: #0b0d11;
  }

  // TODO: Remove this when guild/components Header/Footer will can accept bg color
  footer {
    background-color: #0b0d11 !important;
  }

  header {
    &,
    & > div > nav {
      background-color: #0b0d11 !important;
    }
  }

  * {
    font-family: Poppins, sans-serif;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isDarkMode = ['/', '/about-us', '/services', '/blog'].includes(
      router.route
    );

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
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
            href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
            rel="stylesheet"
          />
          {isDarkMode && (
            <link
              href="https://fonts.googleapis.com/css?family=Poppins:400,500,700&display=swap"
              rel="stylesheet"
            />
          )}
        </Head>
        <script src="/static/crisp.js" />

        {/* TODO: Remove this when site will be compatible with two themes */}
        {isDarkMode && <GlobalStyle />}

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
              --colors-accent: #03a6a6;
              --colors-accent-light: #04bfad;
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
              background-color: var(--colors-background);
              font-family: 'Roboto', sans-serif;
            }

            a {
              cursor: pointer;
              text-decoration: none;
              transition: all 0.2s ease 0s;
            }

           ,
          `}
        </style>

        <ThemeProvider
          // TODO: Remove this when site will be compatible with two themes
          isDarkTheme={isDarkMode}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
