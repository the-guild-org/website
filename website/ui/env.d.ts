interface Window {
  twttr?: {
    widgets: {
      load(el: HTMLElement | null): void;
    };
  };
}
