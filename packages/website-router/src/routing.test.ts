/// <reference types="node" />

import { equal } from 'node:assert/strict';
import { test } from 'node:test';
import { shouldHandleFavicon } from './favicon/handler';
import { shouldHandleFeed } from './feed/handler';
import { shouldHandleRobotsTxt } from './robots/handler';
import { buildUpstreamUrl, canonicalizeUrl, isLeakedRouteTemplate } from './routing';

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

test('canonicalizeUrl strips www and trailing slashes in one hop', () => {
  equal(canonicalizeUrl(new URL('https://the-guild.dev/docs')), null);
  equal(canonicalizeUrl(new URL('https://the-guild.dev/')), null);
  equal(canonicalizeUrl(new URL('https://the-guild.dev/docs/')), 'https://the-guild.dev/docs');
  equal(canonicalizeUrl(new URL('https://www.the-guild.dev/docs/')), 'https://the-guild.dev/docs');
  equal(
    canonicalizeUrl(new URL('https://the-guild.dev/docs/?utm=x')),
    'https://the-guild.dev/docs?utm=x',
  );
  equal(canonicalizeUrl(new URL('https://www.the-guild.dev/')), 'https://the-guild.dev/');
});

test('special-route predicates anchor on path segments', () => {
  equal(shouldHandleRobotsTxt(new URL('https://x.dev/graphql/hive/robots.txt')), true);
  equal(shouldHandleRobotsTxt(new URL('https://x.dev/robots.txt')), false);
  equal(shouldHandleRobotsTxt(new URL('https://x.dev/foorobots.txt')), false);
  equal(shouldHandleFavicon(new URL('https://x.dev/graphql/yoga/favicon.ico')), true);
  equal(shouldHandleFavicon(new URL('https://x.dev/my-favicon.ico')), false);
  equal(shouldHandleFeed(new URL('https://x.dev/graphql/codegen/feed')), true);
  equal(shouldHandleFeed(new URL('https://x.dev/myfeed')), false);
});
