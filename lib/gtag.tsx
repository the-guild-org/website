export const GA_TRACKING_ID = 'UA-125180910-3';

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
}: Record<string, string>) {
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
