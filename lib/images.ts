export function withPlaceholder(src: string) {
  const ext = last(src.toLowerCase().split('.'));
  const skipped = ['mp4', 'webm', 'svg', 'gif'];
  const isSkipped = skipped.includes(ext);

  if (src.startsWith('/') && !isSkipped) {
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

function last<T>(list: T[]): T {
  return list[list.length - 1];
}
