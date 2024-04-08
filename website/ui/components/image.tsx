import { ReactElement } from 'react';

export const Image = ({
  alt,
  src,
  className,
}: {
  alt?: string;
  src: string;
  className?: string;
}): ReactElement | null => {
  if (!src) {
    return null;
  }

  const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');

  if (isVideo) {
    return (
      <video className={className} playsInline autoPlay loop muted>
        <source src={src} type={src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
      </video>
    );
  }

  return <img className={className} src={src} alt={alt} />;
};
