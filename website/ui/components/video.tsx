import { ReactElement } from 'react';
import { clsx } from 'clsx';

export const Video = ({ src, title, className }: { src: string; title?: string; className?: string }): ReactElement => {
  if (src.startsWith('https://')) {
    return (
      <iframe
        className={clsx('mt-6 h-[400px] w-full', className)}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video className={clsx('mx-auto mt-6', className)} playsInline autoPlay loop muted>
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};
