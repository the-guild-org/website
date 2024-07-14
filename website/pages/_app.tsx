/* eslint react/no-unknown-property: ['error', { ignore: ['global', 'jsx'] }] */
import { AppProps } from 'next/app';
import { IBM_Plex_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '@theguild/components/style.css';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <style global jsx>{`
        :root {
          --colors-text: white;
          --colors-dim: #777;
          --colors-accent: #1cc8ee;
          --colors-primary: white;
          --hover-opacity: 0.75;
        }
        html,
        body,
        #__next {
          margin: 0;
          width: 100%;
          height: 100%;
        }
        html {
          font-family: ${ibmPlexSans.style.fontFamily};
        }
        ${router.route === '/'
          ? "/* For smooth scrolling effect when click on '#' hash links */ html { scroll-behavior: smooth }"
          : ''}
        body {
          z-index: -1; /* needs for blue and pink circles */
        }
        a {
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease 0s;
        }
        // Remove autocomplete color in Chrome
        input:-webkit-autofill {
          -webkit-transition:
            color 9999s ease-out,
            background-color 9999s ease-out;
          -webkit-transition-delay: 9999s;
        }
      `}</style>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
