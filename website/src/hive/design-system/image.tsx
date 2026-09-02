import {
  Image as UnpicImage,
  ImageProps as UnpicImageProps,
} from "@unpic/react";

/** Type for static image imports (bundler) */
export type StaticImageData = {
  blurDataURL?: string;
  height: number;
  src: string;
  width: number;
};

/** Base props shared across all layouts */
type BaseImageProps = Omit<
  UnpicImageProps,
  "background" | "height" | "layout" | "src" | "width"
> & {
  /** Blur placeholder URL (or use StaticImageData.blurDataURL) */
  placeholder?: string;
};

/** Props when using StaticImageData - dimensions come from the import */
type StaticImageProps = BaseImageProps & {
  height?: number;
  layout?: "constrained" | "fixed";
  src: StaticImageData;
  width?: number;
};

/** Props for fullWidth layout - no width allowed */
type FullWidthImageProps = BaseImageProps & {
  aspectRatio?: number;
  height?: number;
  layout: "fullWidth";
  src: StaticImageData | string;
  width?: never;
};

/** Props for constrained/fixed layout with string src - dimensions required */
type ConstrainedImageProps = BaseImageProps & {
  layout?: "constrained" | "fixed";
  src: string;
} & (
    | { aspectRatio: number; height: number; width?: never }
    | { aspectRatio: number; height?: never; width: number }
    | { aspectRatio?: never; height: number; width: number }
  );

export type ImageProps =
  | ConstrainedImageProps
  | FullWidthImageProps
  | StaticImageProps;

/**
 * Optimized image component built on @unpic/react.
 * - Automatic srcset/sizes generation
 * - CDN detection and optimization
 * - WebP/AVIF when supported
 * - Supports static imports with blur placeholders
 */
export function Image(props: ImageProps) {
  const {
    aspectRatio,
    height: heightProp,
    layout,
    placeholder,
    src,
    width: widthProp,
    ...rest
  } = props as ImageProps & {
    aspectRatio?: number;
    height?: number;
    width?: number;
  };

  const imgSrc = typeof src === "string" ? src : src.src;
  const background =
    placeholder ?? (typeof src === "object" ? src.blurDataURL : undefined);

  // For static imports, use dimensions from the import if not overridden
  const width = widthProp ?? (typeof src === "object" ? src.width : undefined);
  const height =
    heightProp ?? (typeof src === "object" ? src.height : undefined);

  if (layout === "fullWidth") {
    return (
      <UnpicImage
        {...rest}
        aspectRatio={aspectRatio}
        background={background}
        height={height}
        layout="fullWidth"
        src={imgSrc}
      />
    );
  }

  // For fixed/constrained: need to respect the dimension union
  // Only pass aspectRatio if we don't have both width and height
  const dimensionProps =
    width !== undefined && height !== undefined
      ? { height, width }
      : aspectRatio !== undefined && width !== undefined
        ? { aspectRatio, width }
        : aspectRatio !== undefined && height !== undefined
          ? { aspectRatio, height }
          : { height: height!, width: width! };

  if (layout === "fixed") {
    return (
      <UnpicImage
        {...rest}
        background={background}
        layout="fixed"
        src={imgSrc}
        {...dimensionProps}
      />
    );
  }

  // constrained layout (default)
  return (
    <UnpicImage
      {...rest}
      background={background}
      layout="constrained"
      src={imgSrc}
      {...dimensionProps}
    />
  );
}
