import App, { Container } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

const THEME = {
  background: {
    color: '#05050f',
  },
  circle: {
    color: '#031824',
    activeColor: '#00eaff',
    content: '#fff',
  },
  edge: {
    color: '#00eaff',
  },
  oval: {
    color: '#00eaff',
    content: '#fff',
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={THEME}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
