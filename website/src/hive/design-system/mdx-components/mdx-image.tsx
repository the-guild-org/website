"use client";

import type { ImgHTMLAttributes } from "react";

import Zoom from "react-medium-image-zoom";

import { cn } from "../cn";
import "./image-zoom.css";

export function MdxImage({
  alt,
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Zoom
      wrapElement="span"
      zoomImg={{ sizes: undefined, src: props.src }}
      zoomMargin={20}
    >
      <img
        alt={alt}
        className={cn("rounded-lg", className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
        {...props}
      />
    </Zoom>
  );
}
