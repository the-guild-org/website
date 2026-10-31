/// <reference types="node" />

import { equal, match, ok } from 'node:assert/strict';
import { test } from 'node:test';
import vm from 'node:vm';
import { CrispHandler, crispSnippet } from './crisp';
import { WebAnalyticsHandler } from './web-analytics';

/** Captures what a handler appends to <head>. */
function fakeHead() {
  const appended: string[] = [];
  const element = { append: (content: string) => appended.push(content) } as unknown as Element;
  return { appended, element };
}

/** Runs the inline script of a snippet against a minimal window. */
function runSnippet(snippet: string) {
  const script = snippet.replace(/^<script>|<\/script>$/g, '');
  const created: { src?: string; async?: boolean }[] = [];
  let idleCallback: (() => void) | undefined;
  const window: Record<string, unknown> = {
    requestIdleCallback: (cb: () => void) => {
      idleCallback = cb;
    },
  };
  const document = {
    createElement: () => {
      const el: { src?: string; async?: boolean } = {};
      created.push(el);
      return el;
    },
    head: { appendChild: () => {} },
  };
  vm.runInNewContext(script, { window, document, requestIdleCallback: window.requestIdleCallback });
  return {
    created,
    idle: () => idleCallback?.(),
    window: window as { $crisp: unknown[]; CRISP_WEBSITE_ID: string },
  };
}

test('web analytics beacon is injected only when a token is configured', () => {
  const without = fakeHead();
  new WebAnalyticsHandler(undefined).element(without.element);
  equal(without.appended.length, 0);

  const withToken = fakeHead();
  new WebAnalyticsHandler('abc123').element(withToken.element);
  equal(withToken.appended.length, 1);
  match(withToken.appended[0], /static\.cloudflareinsights\.com\/beacon\.min\.js/);
  match(withToken.appended[0], /data-cf-beacon='\{"token":"abc123"\}'/);
});

test('crisp is only injected for routes that opt in', () => {
  const head = fakeHead();
  new CrispHandler('site-id', { rewrite: 'x.pages.dev' }).element(head.element);
  equal(head.appended.length, 0);

  new CrispHandler('site-id', {
    rewrite: 'x.pages.dev',
    crisp: { segments: ['guild-website'] },
  }).element(head.element);
  equal(head.appended.length, 1);
});

test('crisp snippet sets the site id, the segments and loads the widget when idle', () => {
  const { created, window, idle } = runSnippet(crispSnippet('site-id', ['guild-website']));
  equal(window.CRISP_WEBSITE_ID, 'site-id');
  const queued = window.$crisp as unknown[][];
  equal(queued.length, 1);
  equal(queued[0][0], 'set');
  equal(queued[0][1], 'session:segments');
  equal(created.length, 0, 'the script waits for an idle callback');

  idle();
  equal(created.length, 1);
  equal(created[0].src, 'https://client.crisp.chat/l.js');
  ok(created[0].async);
});
