/* eslint-disable no-console */
/* eslint-disable no-undef */
const jsonConfig = JSON.parse(JSON_CONFIG);
const {
  mappings,
  crispWebsiteId,
  gaTrackingId,
  slackChannelId,
  clientToWorkerMaxAge,
  cfFetchCacheTtl,
  cacheStorageId,
} = jsonConfig;
const KEYS = Object.keys(mappings);

function createSlackClient(token) {
  return {
    sendMessage: async (slackChannel, text, header) => {
      const body = {
        channel: slackChannel,
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: header || '',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text,
            },
          },
        ],
      };

      console.debug(`Built Slack message object:`, body);

      const rawResponse = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response = await rawResponse.json();
      console.debug(`Got response from sending Slack message:`, response);

      return response;
    },
  };
}

function handleErrorResponse(event, requestedEndpoint, endpoint, response) {
  console.error(`Failed to fetch ${endpoint}`, response.status, response);

  const shouldReport = response.status >= 400;

  // We notify Slack on some user/server errors, this is useful for debugging and making sure we always on top of broken links.
  if (shouldReport && SLACK_TOKEN && slackChannelId) {
    console.error(`notifing Slack on 404 error ${endpoint}, channel id: ${slackChannelId}`, response.status);

    const client = createSlackClient(SLACK_TOKEN);

    event.waitUntil(
      client
        .sendMessage(
          slackChannelId,
          `\`\`\`client request url: ${requestedEndpoint}\nupstream hostname: ${endpoint}\`\`\``,
          `:boom: Website visitor encountered a ${response.status} error`
        )
        .then(console.info)
        .catch(e => {
          console.error(`Failed to send Slack notification`, e, e.message, JSON.stringify(console.error));
        })
    );
  }

  return response;
}

class HeadElementHandler {
  constructor(websiteRecord) {
    this.websiteRecord = websiteRecord;
  }

  element(element) {
    if (crispWebsiteId) {
      element.append(
        `<script>
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = '${crispWebsiteId}';
          (function () {
            d = document;
            s = d.createElement('script');
            s.src = 'https://client.crisp.chat/l.js';
            s.async = 1;
            d.getElementsByTagName('head')[0].appendChild(s);
          })();
          ${
            this.websiteRecord.crispSegments && this.websiteRecord.crispSegments.length > 0
              ? `
            window.$crisp.push([
              'set',
              'session:segments',
              [${JSON.stringify(this.websiteRecord.crispSegments)}],
            ]);
            `
              : ''
          }
        </script>`,
        { html: true }
      );
    }

    if (gaTrackingId) {
      element.append(
        `
        <script async src="https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}" />
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaTrackingId}');
        </script>`,
        { html: true }
      );
    }
  }
}

function applyHtmlTransformations(record, response) {
  if (response && response.headers && response.headers.get('content-type').startsWith('text/html')) {
    return new HTMLRewriter().on('head', new HeadElementHandler(record)).transform(response);
  }

  return response;
}

async function handleEvent(event) {
  const { request } = event;
  const parsedUrl = new URL(request.url);
  const match = KEYS.find(key => parsedUrl.pathname.startsWith(key));

  if (match) {
    const record = mappings[match];

    if (record.rewrite) {
      // Rebuilds the actual remote URL. Note that basePath in the website must be configured for remote loading, otherwise you'll have
      // issues with assets.
      const url = `https://${record.rewrite}${parsedUrl.pathname.replace(match, '')}`;
      console.debug(`Rewriting ${request.url} to ${url}`);
      const cacheKey = new Request(url, request);
      const cache = await caches.open(cacheStorageId);
      let response = await cache.match(cacheKey);

      if (!response) {
        const freshResponse = await fetch(url, {
          // This cache will force caching between the CF Worker and the upstream website, based on Cache-Control headers that are
          // being set by Vercel or CloudFlare Pages.
          cf: {
            cacheTtl: cfFetchCacheTtl,
            cacheEverything: true,
          },
        });

        // In case of an error from an upstream, we are going to return the original request, and avoid caching.
        if (freshResponse.status >= 400) {
          // This error handler captures an error from the origin.
          return handleErrorResponse(event, request.url, url, freshResponse);
        }

        response = applyHtmlTransformations(record, freshResponse);

        // Modify response and add client side caching headers
        response = new Response(response.body, response);

        // TODO: Are they any special headers we need to consider to add? SEO-related?
        response.headers.append('Cache-Control', `s-maxage=${clientToWorkerMaxAge}`);

        // Make sure the worker wait behind the scenes, for the Response content.
        event.waitUntil(cache.put(cacheKey, response.clone()));
      }

      // TODO: Should we have a generic solution for injecting meta tags into HTML pages? we can use HTMLRewriter to do this.
      return response;
    }

    if (record.redirect) {
      // Handle redirects for external links
      return new Response(null, {
        status: 301,
        headers: { Location: record.redirect },
      });
    }
  }

  // This error handler will capture non-found websites or mappings.
  return handleErrorResponse(
    event,
    request.url,
    request.url,
    new Response(
      { error: 'website not found' },
      {
        status: 404,
      }
    )
  );
}

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});
