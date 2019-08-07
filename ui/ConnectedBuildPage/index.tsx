import React from 'react';
import Head from 'next/head';
import { ThemeProvider, ThemeConsumer } from 'styled-components';

import { Background } from './Background';
import { Hero } from './Hero';
import { Infrastructure } from './Infrastructure';
import { HowItWorks } from './HowItWorks';
import { Contact } from './Contact';

const THEME = {
  background: {
    color: '#0b0b17',
  },
  hero: {
    titleColor: '#fff',
    highlightColor: '#00eaff',
  },
  logo: {
    color: '#fff',
  },
  bar: {
    textColor: '#fff',
  },
};

const ConnectedBuildPage: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={THEME}>
      <ThemeConsumer>
        {theme => {
          return (
            <>
              <Head>
                <title>Connected Build - The Guild</title>
                <meta name='theme-color' content={theme.background.color} />
                <meta
                  name='Description'
                  content='Connected Build - The Guild'
                />
              </Head>
              <Background>
                <Hero />
                <Infrastructure />
                <HowItWorks />
                <Contact />
              </Background>
            </>
          );
        }}
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default ConnectedBuildPage;
