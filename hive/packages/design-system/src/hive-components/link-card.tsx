import { Image } from "@unpic/react";

import { Anchor } from "../anchor";
import { cn } from "../cn";

// Type for static image imports (Vite/webpack)
type StaticImageData = {
  blurDataURL?: string;
  height: number;
  src: string;
  width: number;
};

export interface LinkCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  alt?: string;
  description?: string;
  href: string;
  src: StaticImageData | string;
  title?: string;
}

export function LinkCard({
  alt,
  className,
  description,
  href,
  src,
  title,
  ...rest
}: LinkCardProps) {
  const imgSrc = typeof src === "string" ? src : src.src;

  if (!title && !description) {
    return (
      <Anchor
        className="border-beige-200 mt-6 block overflow-hidden rounded-2xl border dark:border-neutral-800"
        href={href}
      >
        <Image alt={alt || ""} layout="fullWidth" src={imgSrc} />
      </Anchor>
    );
  }

  return (
    <a
      className={cn(
        "bg-beige-100 mt-6 flex gap-2 overflow-hidden rounded-2xl dark:bg-neutral-900",
        className,
      )}
      href={href}
      {...rest}
    >
      <span className="flex flex-col gap-1 p-6">
        <strong>{title}</strong>
        <p className="text-sm">{description}</p>
      </span>
      <Image
        alt={alt || ""}
        className="rounded-none"
        height={160}
        role="presentation"
        src={imgSrc}
        width={286}
      />
    </a>
  );
}
