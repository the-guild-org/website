import { createSearchAPI, type SearchAPI } from "fumadocs-core/search/server";

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const searchServers = new Map<string, Promise<SearchAPI>>();
const loadedAtByIndex = new Map<string, string>();

type SearchApiEnv = {
  SEARCH_INDEX: {
    get(key: string): Promise<{ json(): Promise<unknown> } | null>;
  };
};

function getCacheKey(request: Request, searchIndexKey: string) {
  const url = new URL(request.url);

  url.pathname = `/__search-cache/v3/${searchIndexKey}${url.pathname}`;
  url.search = new URLSearchParams(url.searchParams).toString();

  return new Request(url.toString(), {
    method: request.method,
    headers: {
      accept: request.headers.get("accept") ?? "",
    },
  });
}

function cacheableResponse(response: Response) {
  const headers = new Headers(response.headers);

  headers.set(
    "Cache-Control",
    `public, max-age=${CACHE_TTL_SECONDS}, s-maxage=${CACHE_TTL_SECONDS}, immutable`,
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function json(data: any, init: ResponseInit = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

function withCors(response: Response) {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function getSearchIndexKey(request: Request): string | null {
  const indexKey = request.headers.get("x-search-index-key");

  return indexKey ? `search/${indexKey}.json` : null;
}

async function getSearchServer(env: SearchApiEnv, searchIndexKey: string) {
  let searchServerPromise = searchServers.get(searchIndexKey);

  if (!searchServerPromise) {
    searchServerPromise = env.SEARCH_INDEX.get(searchIndexKey)
      .then(async (blob) => {
        if (!blob) {
          throw new Error(`${searchIndexKey} not found in R2`);
        }

        const indexes = await blob.json();
        const server = createSearchAPI("advanced", {
          indexes,
          language: "english",
        });

        loadedAtByIndex.set(searchIndexKey, new Date().toISOString());

        return server;
      })
      .catch((error) => {
        searchServers.delete(searchIndexKey);
        loadedAtByIndex.delete(searchIndexKey);
        throw error;
      });
    searchServers.set(searchIndexKey, searchServerPromise);
  }

  return searchServerPromise;
}

export default {
  async fetch(request: Request, env: SearchApiEnv, ctx: any) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    const searchIndexKey = getSearchIndexKey(request);
    if (!searchIndexKey) {
      return json(
        {
          ok: false,
          error: "Missing x-search-index-key header",
        },
        { status: 400 },
      );
    }

    const requestURL = new URL(request.url);
    const hasQuery = requestURL.searchParams.has("query");

    const cache = caches.default;
    const cacheKey = getCacheKey(request, searchIndexKey);

    if (hasQuery) {
      const cached = await cache.match(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const server = await getSearchServer(env, searchIndexKey);
      const response = withCors(await server.GET(request));

      if (!hasQuery) {
        return response;
      }

      const responseToReturn = cacheableResponse(response);

      if (responseToReturn.ok) {
        ctx.waitUntil(cache.put(cacheKey, responseToReturn.clone()));
      }

      return responseToReturn;
    } catch (error) {
      return json(
        {
          ok: false,
          error: error instanceof Error ? error.message : String(error),
          loadedAt: loadedAtByIndex.get(searchIndexKey) ?? null,
        },
        { status: 500 },
      );
    }
  },
};
