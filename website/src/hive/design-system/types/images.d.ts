declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.svg?svgr" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module "*.jpg" {
  const content: {
    blurDataURL?: string;
    height: number;
    src: string;
    width: number;
  };
  export default content;
}

declare module "*.jpeg" {
  const content: {
    blurDataURL?: string;
    height: number;
    src: string;
    width: number;
  };
  export default content;
}

declare module "*.png" {
  const content: {
    blurDataURL?: string;
    height: number;
    src: string;
    width: number;
  };
  export default content;
}

declare module "*.webp" {
  const content: {
    blurDataURL?: string;
    height: number;
    src: string;
    width: number;
  };
  export default content;
}

declare module "*.gif" {
  const content: { height: number; src: string; width: number };
  export default content;
}

declare module "*.mdx" {
  import { ComponentType } from "react";
  const MDXComponent: ComponentType<{
    components?: Record<string, ComponentType>;
  }>;
  export default MDXComponent;
}

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
