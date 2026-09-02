declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.svg?svgr" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module "*.png";

interface Window {
  $crisp?: {
    push(cmd: string[]): void;
  };
}

declare module "*.webp?url" {
  const src: string;
  export default src;
}
