const nextMDX = require("@next/mdx");
const rehypePrism = require("@mapbox/rehype-prism");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
});

module.exports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ["tsx", "md", "mdx"],
  })
);