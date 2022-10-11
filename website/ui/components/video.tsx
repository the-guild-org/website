import { ReactElement } from 'react';

export const Video = ({ src, title }: { src: string; title?: string }): ReactElement => {
  if (src.startsWith('https://')) {
    return (
      <iframe
        className="mt-6 h-[400px] w-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video className="mx-auto mt-6" playsInline autoPlay loop muted>
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};
