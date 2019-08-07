import React from 'react';
import Head from 'next/head';
import { ThemeConsumer } from 'styled-components';
import { Background } from './Background';

export const Root: React.FunctionComponent = ({ children }) => {
  return (
    <ThemeConsumer>
      {theme => {
        return (
          <>
            <Head>
              <title>The Guild</title>
              <meta name='theme-color' content={theme.background.color} />
            </Head>
            <style global jsx>
              {`
                html,
                body,
                #__next {
                  margin: 0;
                  width: 100%;
                  height: 100%;
                }
              `}
            </style>
            <Background>{children}</Background>
          </>
        );
      }}
    </ThemeConsumer>
  );
};
