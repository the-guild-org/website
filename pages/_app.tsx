import App from "next/app";
import React from "react";
import Router from "next/router";
import "prism-theme-night-owl";

import { Root } from "../ui/Root";
import * as gtag from "../lib/gtag";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Root>
        <style global jsx>
          {`
            html,
            body,
            #__next {
              margin: 0;
              width: 100%;
              height: 100%;
            }

            .Moda-1-hex { color: #010326; }
            .Moda-2-hex { color: #022859; }
            .Moda-3-hex { color: #03A6A6; }
            .Moda-4-hex { color: #5FD9D9; }
            .Moda-5-hex { color: #04BFAD; }

            a {
              text-decoration: none;
              transition: all 0.2s ease 0s;
            }

            .roboto {
              font-family: "Roboto", sans-serif;
            }
          `}
        </style>
        <Component {...pageProps} />
      </Root>
    );
  }
}
