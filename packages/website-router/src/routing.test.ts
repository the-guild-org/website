/// <reference types="node" />

import { equal } from 'node:assert/strict';
import { test } from 'node:test';
import { buildUpstreamUrl, isLeakedRouteTemplate } from './routing';

test('preserveSearch keeps the original query string', () => {
  const upstreamUrl = buildUpstreamUrl({
    request: new Request(
      'https://the-guild.dev/graphql/hive/_serverFn/test?payload=%7B%22foo%22%3A1%7D',
    ),
    record: {
      preserveSearch: true,
      rewrite: 'hive-platform-docs.theguild.workers.dev',
    },
    upstreamPath: '/_serverFn/test',
  });

  equal(
    upstreamUrl.toString(),
    'https://hive-platform-docs.theguild.workers.dev/_serverFn/test?payload=%7B%22foo%22%3A1%7D',
  );
});

test('default rewrite behavior still drops search params', () => {
  const upstreamUrl = buildUpstreamUrl({
    request: new Request(
      'https://the-guild.dev/graphql/hive/_serverFn/test?payload=%7B%22foo%22%3A1%7D',
    ),
    record: {
      rewrite: 'hive-platform-docs.theguild.workers.dev',
    },
    upstreamPath: '/_serverFn/test',
  });

  equal(upstreamUrl.toString(), 'https://hive-platform-docs.theguild.workers.dev/_serverFn/test');
});

test('leaked route templates are recognised', () => {
  equal(isLeakedRouteTemplate('/_landing/blog/$/blog/some-post'), true);
  equal(isLeakedRouteTemplate('/docs/$/docs/gateway'), true);
  equal(isLeakedRouteTemplate('/blog/$'), true);
  equal(isLeakedRouteTemplate('/graphql/hive/docs/gateway'), false);
  equal(isLeakedRouteTemplate('/blog/price-of-graphql'), false);
  equal(isLeakedRouteTemplate('/'), false);
});
