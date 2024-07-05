/* eslint react/no-unknown-property: ['error', { ignore: ['global', 'jsx'] }] */
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { globalStyles } from '../styles/global';
import '@theguild/components/style.css';
import './globals.css';

export default function App({ Component, pageProps, router }: AppProps) {
  globalStyles();
  return (
    <>
      <style global jsx>{`
        :root {
          --colors-text: white;
          --colors-dim: #777;
          --colors-accent: #1cc8ee;
          --colors-primary: white;
          --colors-background: #0b0d11;
          --hover-opacity: 0.75;
        }
        html,
        body,
        #__next {
          margin: 0;
          width: 100%;
          height: 100%;
        }
        ${router.route === '/'
          ? "/* For smooth scrolling effect when click on '#' hash links */ html { scroll-behavior: smooth }"
          : ''}
        body {
          z-index: -1; /* needs for blue and pink circles */
        }
        footer {
          background: transparent !important;
        }
        a {
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease 0s;
        }
        @media (min-width: 768px) {
          header,
          header ul > nav {
            background: transparent !important;
          }
        }
        // Remove autocomplete color in Chrome
        input:-webkit-autofill {
          -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
          -webkit-transition-delay: 9999s;
        }
      `}</style>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
