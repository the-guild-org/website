import { extname } from 'path';

const SKIPPED_EXTENSIONS = new Set(['.mp4', '.webm', '.svg', '.gif']);

export function withPlaceholder(src: string) {
  const ext = extname(src.toLowerCase());

  // TODO: Figure out why don't work with NextJS v12
  // if (src.startsWith('/') && !SKIPPED_EXTENSIONS.has(ext)) {
  //   return {
  //     hasPlaceholder: true,
  //     placeholder: require(`Public/${src.substr(1)}?lqip`),
  //     large: require(`Public/${src.substr(1)}`),
  //   };
  // }

  return {
    hasPlaceholder: false,
    placeholder: src,
    large: src,
  };
}
