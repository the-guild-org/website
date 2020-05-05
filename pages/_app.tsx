import App from "next/app";
import React from "react";
import Router from "next/router";

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
