const size = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1080px',
};

const gt: Record<keyof typeof size, string> = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
};
const lt: Record<keyof typeof size, string> = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
};

export const device = {
  gt,
  lt,
  mobile: lt.tablet,
  tablet: and(gt.tablet, lt.laptop),
  laptop: gt.laptop,
};

function and(...queries: string[]): string {
  return queries.join(' and ');
}
