import App, { Container } from 'next/app';
import React from 'react';

import { Root } from '../ui/Root';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
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

              .roboto {
                font-family: 'Roboto', sans-serif;
              }
            `}
          </style>
          <Component {...pageProps} />
        </Root>
      </Container>
    );
  }
}
