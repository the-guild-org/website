export interface CrispUser {
  people_id?: string;
  email?: string | null;
  person?: {
    nickname?: string | null;
  };
}

export type CrispEventColor =
  'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'brown' | 'grey' | 'black';

export function createCrispClient(options: { token: string; websiteId: string }) {
  const baseUrl = `https://api.crisp.chat/v1/website/${options.websiteId}`;
  const crispHeaders = {
    authorization: `Basic ${options.token}`,
    'X-Crisp-Tier': 'plugin',
  };

  async function crispFetch(
    path: string,
    caller: string,
    init?: RequestInit & { allow404?: boolean },
  ): Promise<Response> {
    const { allow404, ...requestInit } = init ?? {};
    const res = await fetch(`${baseUrl}${path}`, {
      ...requestInit,
      headers: {
        ...crispHeaders,
        ...(init?.body ? { 'content-type': 'application/json' } : {}),
      },
    });
    // 404 is a meaningful answer only for lookups; a mutation that 404s
    // did not happen and must not be reported as success.
    if (!res.ok && !(allow404 && res.status === 404)) {
      throw new Error(`Crisp responded with ${res.status}: ${res.statusText} - from ${caller}`);
    }
    return res;
  }

  return {
    websiteId: options.websiteId,
    async addCrispUserEvent(
      peopleIdOrEmail?: string,
      data?: {
        text: string;
        data?: Record<string, unknown>;
        color?: CrispEventColor;
      },
    ): Promise<unknown> {
      const res = await crispFetch(`/people/events/${peopleIdOrEmail}`, 'addCrispUserEvent', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    async addNewCrispUser(user: CrispUser): Promise<CrispUser> {
      const res = await crispFetch('/people/profile', 'addNewCrispUser', {
        method: 'POST',
        body: JSON.stringify(user),
      });
      const response: { data: CrispUser } = await res.json();
      return response.data;
    },
    async getCrispUser(peopleIdOrEmail: string): Promise<CrispUser | null> {
      const res = await crispFetch(`/people/profile/${peopleIdOrEmail}`, 'getCrispUser', {
        method: 'GET',
        allow404: true,
      });
      if (res.status === 404) {
        return null;
      }
      const body: { data: CrispUser } = await res.json();
      return body.data;
    },
  };
}

export type CrispClient = ReturnType<typeof createCrispClient>;
