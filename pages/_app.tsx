import App, { NextWebVitalsMetric } from 'next/app';
import Router from 'next/router';
import Script from 'next/script';
import Head from 'next/head';
import { FooterExtended, Header, ThemeProvider } from '@theguild/components';
import * as gtag from '../lib/gtag';
import { globalStyles } from '../styles/global';
import 'guild-docs/style.css';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
  gtag.event({
    action: name,
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id,
    non_interaction: true,
  });
}

// const defaultSeo: AppSeoProps = {
//   title: 'The Guild',
//   description: 'Modern API Platform and Ecosystem that scales',
//   logo: {
//     url: 'https://guild.dev/static/logo.svg',
//   },
// };

export default class MyApp extends App {
  render() {
    globalStyles();
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <style global jsx>{`
          :root {
            --colors-text: white;
            --colors-dim: #777;
            --colors-accent: #1cc8ee;
            --colors-primary: white;
            --colors-background: #0b0d11;
            --hover-opacity: 0.75;
          }

          html,
          body,
          #__next {
            margin: 0;
            width: 100%;
            height: 100%;
          }

          html {
            /* For smooth scrolling effect when click on '#' hash links */
            scroll-behavior: smooth;
          }

          body {
            z-index: -1; /* needs for blue and pink circles */
          }

          footer {
            background: transparent !important;
          }

          a {
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s ease 0s;
          }

          @media (min-width: 768px) {
            header,
            header ul > nav {
              background: transparent !important;
            }
          }

          // Remove autocomplete color in Chrome
          input:-webkit-autofill {
            -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
            -webkit-transition-delay: 9999s;
          }
          .nextra-nav-container {
            display: none;
          }
        `}</style>

        <Script async src="/static/crisp.js" />
        <ThemeProvider>
          <Header
            sameSite
            activeLink={router.asPath}
            accentColor="var(--colors-accent)"
            searchBarProps={{ version: 'v2' }}
            themeSwitch
            transformLinks={links => [
              ...links,
              {
                href: 'https://the-guild.dev/contact',
                label: 'Contact',
                title: 'Get in touch',
              },
            ]}
            className="[&_ul>div]:right-32"
          />
          <Component {...pageProps} />
          <FooterExtended
            sameSite
            resources={[
              { children: 'Blog', title: 'Blog', href: '/blog' },
              { children: 'Services', title: 'Services', href: '/services' },
              { children: 'Newsletter', title: 'Newsletter', href: '/newsletter' },
              { children: 'Logos', title: 'Logos', href: '/logos' },
            ]}
          />
        </ThemeProvider>
      </>
    );
  }
}
