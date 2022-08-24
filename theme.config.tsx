import { DocsThemeConfig } from 'nextra-theme-docs';

const SITE_NAME = 'The Guild';

const config: DocsThemeConfig = {
  titleSuffix: ` – ${SITE_NAME}`,
  projectLink: 'https://github.com/the-guild-org/the-guild-website', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/the-guild-org/the-guild-website/tree/master/pages', // base URL for the docs repository
  nextLinks: true,
  prevLinks: true,
  search: false,
  floatTOC: true,
  darkMode: true,
  footer: false,
  footerEditLink: 'Edit this page on GitHub',
  logo: null,
  head: () => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={`${SITE_NAME}: Modern API Platform and Ecosystem that scales`} />
      <meta name="og:title" content={SITE_NAME} />
    </>
  ),
  gitTimestamp: 'Last updated on',
  defaultMenuCollapsed: true,
  feedbackLink: 'Question? Give us feedback →',
  feedbackLabels: 'kind/docs',
};

export default config;
