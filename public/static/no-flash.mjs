// https://github.com/donavon/use-dark-mode/blob/8f016f4cdcfe799606b75d45bad7ced50f424ada/noflash.js.txt
// Insert this script in your index.html right after the <body> tag
// This will help to prevent a flash if dark mode is the default

(function () {
  const STORAGE_KEY = 'chakra-ui-color-mode';

  function setThemeOnHTML(darkMode) {
    const htmlEl = document.documentElement;
    htmlEl.dataset.theme = darkMode ? 'dark' : 'light';
  }

  let localStorageTheme = localStorage.getItem(STORAGE_KEY);

  // Determine from localStorage
  if (localStorageTheme) {
    setThemeOnHTML(localStorageTheme === 'dark');
    return;
  }

  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const mql = window.matchMedia(preferDarkQuery);
  const supportsColorSchemeQuery = mql.media === preferDarkQuery;

  // Determine from system
  if (supportsColorSchemeQuery) {
    setThemeOnHTML(mql.matches);
    localStorage.setItem(STORAGE_KEY, mql.matches ? 'dark' : 'light');
    return;
  }

  // Set dark by default
  localStorage.setItem(STORAGE_KEY, 'dark');
})();
