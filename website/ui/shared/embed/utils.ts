/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
let isTwttrScriptAdded = false;

export const twttrClassNames = [
  '.twitter-tweet',
  '.twitter-timeline',
  '.twitter-follow-button',
  '.twitter-mention-button',
  '.twitter-hashtag-button',
].join(',');

const twttrEmbedScript = `
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs")
`;

const twttrLoad = () => {
  if (
    typeof (window as any).twttr !== 'undefined' &&
    (window as any).twttr.widgets &&
    typeof (window as any).twttr.widgets.load === 'function'
  ) {
    (window as any).twttr.widgets.load(document.getElementById('___gatsby'));
  }
};

export const handleTwttrLoad = () => {
  if (document.querySelector(twttrClassNames) !== null && !isTwttrScriptAdded) {
    createScriptTag(null, twttrEmbedScript);
    isTwttrScriptAdded = true;
  }
  twttrLoad();
};

export const createScriptTag = (
  providerEmbedUrl: string | null,
  providerEmbedScript: string | null,
) => {
  const script = document.createElement('script');

  script.type = 'text/javascript';

  if (providerEmbedUrl) {
    script.src = providerEmbedUrl;
  }

  if (providerEmbedScript) {
    script.innerText = providerEmbedScript;
  }

  script.onerror = error => {
    console.error(`MdxEmbedProvider ${(error as any).type}`, error);
  };

  document.getElementsByTagName('head')[0].appendChild(script);
};

export const createStyleSheet = (href: string) => {
  const link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = href;

  document.getElementsByTagName('head')[0].appendChild(link);
};
