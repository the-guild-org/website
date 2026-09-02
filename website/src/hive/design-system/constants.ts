const siteBaseUrl = "https://the-guild.dev";

/**
 * Used in header and footer links to either have 'https://the-guild.dev prefix or ''
 */
export const siteOrigin =
  typeof process !== "undefined" && process.env["SITE_URL"] === siteBaseUrl
    ? ""
    : siteBaseUrl;
