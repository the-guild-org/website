import { Image } from "@unpic/react";

import { cn } from "../cn";

export interface SmallAvatarProps {
  alt?: string;
  className?: string;
  src: string;
}

export function SmallAvatar({ alt, className, src }: SmallAvatarProps) {
  return (
    <Image
      alt={alt || ""}
      className={cn("size-6 rounded-full object-cover", className)}
      height={24}
      src={src}
      width={24}
    />
  );
}
