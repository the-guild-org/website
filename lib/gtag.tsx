export const GA_TRACKING_ID = 'G-VN2KZS6FK4';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url: string) {
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({
  action,
  category,
  label,
  value,
  non_interaction,
}: Record<string, any>) {
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    non_interaction,
  });
}
