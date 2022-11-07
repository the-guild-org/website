import { ReactElement, ReactNode, RefObject, useEffect, useRef, useState } from 'react';

interface ObserverProps {
  /** Fires when IntersectionObserver enters viewport */
  onEnter?: (id?: string) => void;
  children: ReactNode;
}

export const Observer = ({ children, onEnter }: ObserverProps): ReactElement => {
  const ref = useRef<HTMLElement>(null);
  const [isChildVisible, setIsChildVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsChildVisible(true);
          onEnter?.();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, onEnter]);

  return <div ref={ref as RefObject<HTMLDivElement>}>{isChildVisible ? children : null}</div>;
};
