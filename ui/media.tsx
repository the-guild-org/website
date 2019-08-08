const size = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
};

export const device = {
  min: {
    mobile: `(min-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
  },
  max: {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
  }
};
