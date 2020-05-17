import React from 'react';
import Head from 'next/head';
import { ThemeProvider, ThemeConsumer } from 'styled-components';
import { Background } from './Background';
import { Hero } from './Hero';
import { Infrastructure } from './Infrastructure';
import { HowItWorks } from './HowItWorks';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { THEME } from './theme';

const ConnectedBuildPage: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={THEME}>
      <ThemeConsumer>
        {(theme) => {
          return (
            <>
              <Head>
                <title>Connected Build - The Guild</title>
                <meta name="theme-color" content={theme.background.color} />
                <meta
                  name="Description"
                  content="Connected Build - The Guild"
                />
              </Head>
              <Background>
                <Hero />
                <Infrastructure />
                <HowItWorks />
                <Contact />
                <Footer />
              </Background>
            </>
          );
        }}
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default ConnectedBuildPage;
