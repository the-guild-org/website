import qs from 'node:querystring';
import { NextApiRequest, NextApiResponse } from 'next';

import algoliasearch from 'algoliasearch/lite';
import { getRawBody } from '../../../lib/getRawBody';

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    return res
      .status(200)
      .setHeader('Content-Length', '0')
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Request-Headers', 'Vary')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .end();
  }

  res
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Request-Headers', 'Vary')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  const { query } = req;
  const rawBody = await getRawBody(req);
  console.log('Hit!');
  const client = algoliasearch(
    query['x-algolia-application-id'] as string,
    query['x-algolia-api-key'] as string
  );
  const body = JSON.parse(rawBody.toString());
  const input = body.requests[0];
  console.log('Body', input);
  const index = client.initIndex(input.indexName);

  try {
    const result = await index.search(input.query, qs.parse(input.params));
    const referer = normalizeUrl(req.headers.referer);

    res.json({
      results: [
        {
          ...result,
          hits: modifyHits(sortHits(result.hits, referer), referer),
        },
      ],
    });
  } catch (reason) {
    console.log('reason', reason);
    res.status(500).send(reason);
  }
};

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

  if (url.startsWith('https://graphql-yoga.com')) {
    return 'GraphQL Yoga';
  }

  if (url.startsWith('https://kitql.dev')) {
    return 'KitQL';
  }

  if (url.startsWith('https://the-guild.dev/blog')) {
    return 'The Guild Blog';
  }

  if (url.startsWith('https://the-guild.dev')) {
    return 'The Guild Website';
  }

  return 'External';
}
