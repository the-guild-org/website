import { cn } from "./cn";

export function YoutubeIframe({
  className,
  id,
  src,
  title,
}: {
  className?: string;
  id?: string;
  src?: string;
  title: string;
}) {
  return (
    // I'm not sure if this is not a false positive, and it YouTube
    // iframes don't work without both allow-same-origin and allow-scripts
    // eslint-disable-next-line react/iframe-missing-sandbox
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={cn("mt-6 h-100 w-full", className)}
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-presentation allow-same-origin allow-popups"
      src={src || `https://www.youtube.com/embed/${id}`}
      title={title}
    />
  );
}
