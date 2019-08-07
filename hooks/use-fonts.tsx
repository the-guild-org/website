import React from 'react';
import FontFaceObserver from 'fontfaceobserver'

export function useFonts() {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap';
    link.rel = 'stylesheet';

    document.head.appendChild(link);

    const roboto = new FontFaceObserver('Roboto');

    roboto.load().then(() => {
      document.documentElement.classList.add('roboto');
    });
  }, []);
}
