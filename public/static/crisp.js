if (typeof window !== 'undefined') {
    const HOST_TO_SEGMENTS = {
    'graphql-code-generator.com': ['codegen'],
    'graphql-modules.com': ['modules'],
    'graphql-tools.com': ['tools'],
    'the-guild.dev': ['guild-website'],
    'graphql-inspector.com': ['inspector'],
    'tortilla.academy': ['tortilla'],
    'graphql-mesh.com': ['mesh'],
    'apollo-angular.com': ['angular'],
    'graphql-cli.com': ['cli'],
    'graphql-scalars.dev': ['scalars'],
    'graphql-hive.com': ['hive']
  };

  window.$crisp = []; window.CRISP_WEBSITE_ID = "af9adec5-ddfa-4db9-a4a3-25769daf2fc2"; (function () { d = document; s = d.createElement("script"); s.src = "https://client.crisp.chat/l.js"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();

  if (HOST_TO_SEGMENTS[window.location.host]) {
    window.$crisp.push(["set", "session:segments", [HOST_TO_SEGMENTS[window.location.host]]])
  }
}
