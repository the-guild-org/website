import App, { Container } from 'next/app';
import React, { Component } from 'react';
import Router from 'next/router';
import * as Sentry from '@sentry/browser';

import { Root } from '../ui/Root';
import * as gtag from '../lib/gtag';

Sentry.init({
  dsn: process.env.SENTRY_API,
});

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

class ErrorSentryBoundary extends Component<any, any> {
  componentDidCatch(error: any, errorInfo: any) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  render() {
    return this.props.children;
  }
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ErrorSentryBoundary>
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
        </ErrorSentryBoundary>
      </Container>
    );
  }
}
