import { useCallback } from 'react';

export function useScrollTo() {
  return useCallback((id: string) => {
    if (!document) {
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop,
      });
    }
  }, []);
}
