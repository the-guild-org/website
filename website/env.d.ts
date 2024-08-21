declare module '.next/static/chunks/nextra-page-map-.mjs' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reexport PageMapItem from nextra in components
  let pageMap: any[];
  export { pageMap };
}

declare module '*/[tag].mdx' {
  let getStaticPaths: () => Promise<{ paths: { params: { tag: string } }[] }>;

  export { getStaticPaths };
}
