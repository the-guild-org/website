/// <reference types="node" />

import { equal } from 'node:assert/strict';
import { test } from 'node:test';
import { buildUpstreamUrl } from './routing';

test('preserveSearch keeps the original query string', () => {
  const upstreamUrl = buildUpstreamUrl({
    request: new Request(
      'https://the-guild.dev/graphql/hive-testing/_serverFn/test?payload=%7B%22foo%22%3A1%7D',
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
      'https://the-guild.dev/graphql/hive-testing/_serverFn/test?payload=%7B%22foo%22%3A1%7D',
    ),
    record: {
      rewrite: 'hive-platform-docs.theguild.workers.dev',
    },
    upstreamPath: '/_serverFn/test',
  });

  equal(upstreamUrl.toString(), 'https://hive-platform-docs.theguild.workers.dev/_serverFn/test');
});
