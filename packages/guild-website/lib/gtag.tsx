/* eslint-disable @typescript-eslint/no-explicit-any */

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value, non_interaction }: Record<string, any>) {
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    non_interaction,
  });
}
