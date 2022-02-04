const extname = (filename: string): string =>
  filename.slice(filename.lastIndexOf('.'));

const SKIPPED_EXTENSIONS = new Set(['.mp4', '.webm', '.svg', '.gif']);

export function withPlaceholder(src: string) {
  const ext = extname(src.toLowerCase());
  if (src.startsWith('/') && !SKIPPED_EXTENSIONS.has(ext)) {
    return {
      // createRequire(import.meta.url) don't work
      /* eslint-disable unicorn/prefer-module */
      placeholder: require(`Public/${src.substr(1)}?lqip`),
      large: require(`Public/${src.substr(1)}`),
      hasPlaceholder: true,
    };
  }

  return {
    hasPlaceholder: false,
    placeholder: src,
    large: src,
  };
}
