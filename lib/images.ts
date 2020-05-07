export function withPlaceholder(src: string) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

  if (!isVideo && src.startsWith('/')) {
    return {
      hasPlaceholder: true,
      placeholder: require(`Public/${src.substr(1)}?lqip`),
      large: require(`Public/${src.substr(1)}`),
    };
  }

  return {
    hasPlaceholder: false,
    placeholder: src,
    large: src,
  };
}
