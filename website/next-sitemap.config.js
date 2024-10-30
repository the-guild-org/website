/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  exclude: ['*/_meta'],
  output: 'export',
};
