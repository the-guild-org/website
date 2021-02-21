import App, { NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import 'prism-theme-night-owl';
import React from 'react';
import 'remark-admonitions/styles/classic.css';
import * as gtag from '../lib/gtag';
import { GA_TRACKING_ID } from '../lib/gtag';
import '../public/static/docsearch.min.css';

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

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <link rel="shortcut icon" href="/fav.ico" />

          {/* <link href="/static/docsearch.css" rel="stylesheet"/> */}
          {router.route && (
            <link
              rel="canonical"
              href={`https://the-guild.dev${router.route}`}
            ></link>
          )}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
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
        </Head>
        <script src="/static/crisp.js" />
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
              --colors-text: #292929;
              --colors-dim: #777;
              --colors-dim-dark: #555;
              --colors-accent: #03a6a6;
              --colors-accent-light: #04bfad;
              --colors-error: #bf120d;
              --colors-error-light: #ff3f38;
              --colors-primary: #000;
              --colors-background: #fff;
              --hover-opacity: 0.75;
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
          `}
        </style>
        <Component {...pageProps} />
      </>
    );
  }
}
