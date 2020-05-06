import App from 'next/app';
import React from 'react';
import Router from 'next/router';
import 'prism-theme-night-owl';

import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
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
              --colors-primary: #000;
              --colors-background: #fff;
            }

            /*
            @media (prefers-color-scheme: dark) {
              :root {
                --colors-text: #dedede;
                --colors-dim: #9a9a9a;
                --colors-dim-dark: #666;
                --colors-accent: #03a6a6;
                --colors-accent-light: #04bfad;
                --colors-primary: #fff;
                --colors-background: #000;
              }
            }
            */

            body {
              background-color: var(--colors-background);
              font-family: 'Roboto', sans-serif;
            }

            a {
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
