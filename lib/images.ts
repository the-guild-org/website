export function withPlaceholder(src: string) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

  if (!isVideo && src.startsWith('/')) {
    return {
      hasPlaceholder: true,
      placeholder: `${src}?lqip`,
      large: src,
    };
  }

  return {
    hasPlaceholder: false,
    placeholder: src,
    large: src,
  };
}
