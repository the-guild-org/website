export type Env = {
  SENTRY_DSN: string;
  /** Cloudflare Web Analytics site token; unset disables the beacon. */
  CF_WEB_ANALYTICS_TOKEN?: string;
};
