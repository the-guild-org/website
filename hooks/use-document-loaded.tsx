import { useEffect } from 'react';

export const useDocumentLoaded = (onLoad: () => void) => {
  useEffect(() => {
    if (!window) {
      return;
    }

    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, [onLoad]);
};
