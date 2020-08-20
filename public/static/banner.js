const logoUrl = "https://the-guild.dev/static/logo.png";
const linkUrl = "https://the-guild.dev";
const title = "The Guild - Open Source";
const docusaurusId = "__docusaurus";

if (document.getElementById(docusaurusId)) {
  init();
} else {
  window.addEventListener("load", init);
}

function init() {
  const container = document.createElement("div");
  const logoLink = document.createElement("a");
  const stackLink = document.createElement("a");
  const logo = document.createElement("img");

  // container
  container.style.backgroundColor = "#000";
  container.style.width = "100%";
  container.style.height = "50px";
  container.style.paddingLeft = "16px";
  container.style.paddingRight = "16px";
  container.style.boxSizing = "border-box";
  container.style.display = "flex";
  container.style.justifyContent = "space-between";
  container.style.alignItems = "center";

  // set logo
  logoLink.href = linkUrl;
  logoLink.title = title;
  logoLink.style.height = "30px";
  logo.src = logoUrl;
  logo.alt = "The Guild logo";
  logo.style.height = "30px";

  // link
  stackLink.href = linkUrl;
  stackLink.title = title;
  stackLink.innerText = "Developed by The Guild - Visit our website";
  stackLink.style.color = "#fff";
  stackLink.style.fontSize = "16px";
  stackLink.style.fontFamily = `-apple-system, 'Roboto', 'Ubuntu', 'Helvetica Neue', sans-serif`;

  logoLink.append(logo);
  container.append(logoLink, stackLink);
  document.body.prepend(container);
}

const HOST_TO_SEGMENTS = {
  'graphql-code-generator.com': ['codegen'],
  'graphql-modules.com': ['modules'],
  'graphql-tools.com': ['tools'],
  'the-guild.dev': ['guild-website'],
  'graphql-inspector.com': ['inspector'],
  'tortilla.academy': ['tortilla'],
  'graphql-mesh.com': ['mesh'],
  'apollo-angular.com': ['angular']
};

if (typeof window !== 'undefined') {
  window.$crisp = []; window.CRISP_WEBSITE_ID = "af9adec5-ddfa-4db9-a4a3-25769daf2fc2"; (function () { d = document; s = d.createElement("script"); s.src = "https://client.crisp.chat/l.js"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();

  if (HOST_TO_SEGMENTS[window.location.host]) {
    window.$crisp.push(["set", "session:segments", [HOST_TO_SEGMENTS[window.location.host]]])
  }
}
