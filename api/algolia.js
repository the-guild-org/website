const qs = require('querystring');
const express = require('express');
const cors = require('cors');
const algoliasearch = require('algoliasearch/lite');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
    verify(req, _, buf) {
      req.rawBody = buf;
    },
  })
);
app.use(cors());
app.use((req, res) => {
  console.log('Hit!');
  const body = JSON.parse(req.rawBody.toString());
  console.log('Body', body);
  const input = body.requests[0];
  const client = algoliasearch(
    req.query['x-algolia-application-id'],
    req.query['x-algolia-api-key']
  );
  const index = client.initIndex(input.indexName);

  index
    .search(input.query, qs.parse(input.params))
    .then((result) => {
      const referer = normalizeUrl(req.header('Referer'));

      res.json({
        results: [
          {
            ...result,
            hits: modifyHits(sortHits(result.hits, referer), referer),
          },
        ],
      });
    })
    .catch((reason) => {
      console.log('reason', reason);
      res.status(500).send(reason);
    });
});

module.exports = app;

function sortHits(hits, referer) {
  return hits.sort((left, right) => {
    const leftIsReferer = normalizeUrl(left.url).startsWith(referer);
    const rightIsReferer = normalizeUrl(right.url).startsWith(referer);

    if (rightIsReferer && !leftIsReferer) {
      return 1;
    }

    if (leftIsReferer && !rightIsReferer) {
      return -1;
    }

    return 0;
  });
}

function modifyHits(hits, referer) {
  return hits.map((hit) => {
    const normalizedUrl = normalizeUrl(hit.url);
    if (normalizedUrl.startsWith(referer)) {
      return hit;
    }

    const lvl0 = usePrefix(hit.url, hit.hierarchy.lvl0);

    try {
      hit.hierarchy.lvl0 = lvl0;
      hit._highlightResult.hierarchy.lvl0.value = lvl0;
      hit._highlightResult.hierarchy_camel[0].lvl0.value = lvl0;
    } catch (error) {
      console.log(hit);
      console.error(error);
    }

    return hit;
  });
}

function normalizeUrl(url) {
  return url.replace('http:', 'https:').replace('//www.', '//');
}

function usePrefix(url, value) {
  return `[${pickPrefix(normalizeUrl(url))}] - ${value}`;
}

function pickPrefix(url) {
  if (url.startsWith('https://graphql-tools.com')) {
    return 'GraphQL Tools';
  }

  if (url.startsWith('https://graphql-inspector.com')) {
    return 'GraphQL Inspector';
  }

  if (url.startsWith('https://graphql-code-generator.com')) {
    return 'GraphQL Codegen';
  }

  if (url.startsWith('https://graphql-mesh.com')) {
    return 'GraphQL Mesh';
  }

  if (url.startsWith('https://graphql-config.com')) {
    return 'GraphQL Config';
  }

  if (url.startsWith('https://graphql-modules.com')) {
    return 'GraphQL Modules';
  }

  if (url.startsWith('https://apollo-angular.com')) {
    return 'Apollo Angular';
  }

  if (url.startsWith('https://graphql-cli.com')) {
    return 'GraphQL CLI';
  }

  if (url.startsWith('https://graphql-scalars.dev')) {
    return 'GraphQL Scalars';
  }

  if (url.startsWith('https://envelop.dev')) {
    return 'Envelop';
  }

  if (url.startsWith('https://swift-graphql.com')) {
    return 'Swift GraphQL';
  }

  if (url.startsWith('https://graphql-shield.com')) {
    return 'GraphQL Shield';
  }

  if (url.startsWith('https://the-guild.dev/blog')) {
    return 'The Guild Blog';
  }

  if (url.startsWith('https://the-guild.dev')) {
    return 'The Guild Website';
  }

  return 'External';
}
