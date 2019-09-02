import App, { Container } from 'next/app';
import React, { Component } from 'react';
import Router from 'next/router';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

import { Root } from '../ui/Root';
import * as gtag from '../lib/gtag';

const bugsnagClient = bugsnag(process.env.BUGSNAG_API);

bugsnagClient.use(bugsnagReact, React);

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

const ErrorBoundary = bugsnagClient.getPlugin('react');

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ErrorBoundary>
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
                }

                .roboto {
                  font-family: 'Roboto', sans-serif;
                }
              `}
            </style>
            <Component {...pageProps} />
          </Root>
        </ErrorBoundary>
      </Container>
    );
  }
}
