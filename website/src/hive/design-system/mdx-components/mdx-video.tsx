import { cn } from "../cn";
import { prefixBasePath } from "./prefix-base-path";

export function MdxVideo({
  alt,
  className,
  src,
}: {
  alt?: string;
  className?: string;
  src: string;
}) {
  return (
    <figure className={cn("my-4", className)}>
      <video autoPlay loop muted playsInline>
        <source src={prefixBasePath(src)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {alt && (
        <figcaption className="text-center text-sm italic">{alt}</figcaption>
      )}
    </figure>
  );
}
