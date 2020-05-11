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
  stackLink.innerText = "Explore our Tech Stack";
  stackLink.style.color = "#fff";
  stackLink.style.fontSize = "16px";
  stackLink.style.fontFamily = `-apple-system, 'Roboto', 'Ubuntu', 'Helvetica Neue', sans-serif`;

  logoLink.append(logo);
  container.append(logoLink, stackLink);
  document.body.prepend(container);
}
