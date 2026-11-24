export interface Env {
  CRISP_TOKEN: string;
  CRISP_WEBSITE_ID: string;
  SENTRY_DSN: string;
  BEEHIIV_API_KEY: string;
  // Secret key of the contact form's Turnstile widget (wrangler secret).
  TURNSTILE_SECRET_KEY: string;
  EMAIL_SENDER: SendEmail;
}
