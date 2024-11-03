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

export const handleTwttrLoad = (): void => {
  if (document.querySelector(twttrClassNames) !== null && !isTwttrScriptAdded) {
    createScriptTag(null, twttrEmbedScript);
    isTwttrScriptAdded = true;
  }
  window.twttr?.widgets.load(document.getElementById('___gatsby'));
};

const createScriptTag = (providerEmbedUrl: null, providerEmbedScript: string): void => {
  const script = document.createElement('script');

  script.type = 'text/javascript';

  if (providerEmbedUrl) {
    script.src = providerEmbedUrl;
  }

  if (providerEmbedScript) {
    script.innerText = providerEmbedScript;
  }

  script.onerror = error => {
    // eslint-disable-next-line no-console
    console.error('MdxEmbedProvider', error);
  };

  document.getElementsByTagName('head')[0].appendChild(script);
};
