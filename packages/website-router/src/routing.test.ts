/// <reference types="node" />

import { equal } from 'node:assert/strict';
import { test } from 'node:test';
import { shouldHandleFavicon } from './favicon/handler';
import { shouldHandleFeed } from './feed/handler';
import { shouldHandleRobotsTxt } from './robots/handler';
import {
  buildUpstreamUrl,
  canonicalizeUrl,
  isLeakedRouteTemplate,
  markdownTwinCanonical,
  withMarkdownCanonical,
} from './routing';

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

test('Markdown twins point at their HTML page', () => {
  const md = 'text/markdown; charset=utf-8';
  equal(
    markdownTwinCanonical('https://the-guild.dev/graphql/scalars/docs/usage.md', md),
    'https://the-guild.dev/graphql/scalars/docs/usage',
  );
  equal(
    markdownTwinCanonical('https://the-guild.dev/graphql/hive/docs.md?ref=x', 'Text/Markdown'),
    'https://the-guild.dev/graphql/hive/docs',
  );
  equal(markdownTwinCanonical('https://the-guild.dev/graphql/hive/llms.txt', md), null);
  equal(markdownTwinCanonical('https://the-guild.dev/a.md', 'text/html; charset=utf-8'), null);
  equal(markdownTwinCanonical('https://the-guild.dev/a.md', null), null);
});

test('the canonical header is added per request, not to the shared response', () => {
  const md = { 'content-type': 'text/markdown; charset=utf-8' };
  const cached = new Response('# Usage', { headers: md });

  const lower = withMarkdownCanonical(cached, 'https://the-guild.dev/docs/usage.md');
  equal(lower.headers.get('link'), '<https://the-guild.dev/docs/usage>; rel="canonical"');
  equal(cached.headers.get('link'), null);

  const retried = withMarkdownCanonical(
    new Response('# Usage', { headers: md }),
    'https://the-guild.dev/Docs/usage.md',
    true,
  );
  equal(retried.headers.get('link'), '<https://the-guild.dev/docs/usage>; rel="canonical"');

  const notFound = new Response('', { status: 404, headers: md });
  equal(withMarkdownCanonical(notFound, 'https://the-guild.dev/a.md'), notFound);
  const html = new Response('', { headers: { 'content-type': 'text/html' } });
  equal(withMarkdownCanonical(html, 'https://the-guild.dev/a.md'), html);
});
