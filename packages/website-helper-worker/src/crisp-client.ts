export interface CrispUser {
  people_id?: string;
  email?: string | null;
  person?: {
    nickname?: string | null;
  };
}

export type CrispEventColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black';

export function createCrispClient(options: { token: string; websiteId: string }) {
  const crispHeaders = {
    authorization: `Basic ${options.token}`,
    'X-Crisp-Tier': 'plugin',
  };

  return {
    websiteId: options.websiteId,
    async addCrispUserEvent(
      peopleIdOrEmail?: string,
      data?: {
        text: string;
        data?: Record<string, unknown>;
        color?: CrispEventColor;
      },
    ): Promise<Response> {
      const res = await fetch(
        `https://api.crisp.chat/v1/website/${options.websiteId}/people/events/${peopleIdOrEmail}`,
        {
          method: 'POST',
          headers: {
            ...crispHeaders,
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        throw new Error(
          `Crisp responded with ${res.status}: ${res.statusText} - From addCrispUserEvent `,
        );
      }

      return await res.json();
    },
    async addNewCrispUser(user: CrispUser): Promise<CrispUser> {
      const res = await fetch(
        `https://api.crisp.chat/v1/website/${options.websiteId}/people/profile`,
        {
          method: 'POST',
          headers: {
            ...crispHeaders,
            'content-type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );
      if (!res.ok) {
        throw new Error(
          `Crisp responded with ${res.status}: ${res.statusText} - From addNewCrispUser`,
        );
      }

      const response: { data: CrispUser } = await res.json();

      return response.data;
    },
    async getCrispUser(peopleIdOrEmail: string): Promise<CrispUser | null> {
      const res = await fetch(
        `https://api.crisp.chat/v1/website/${options.websiteId}/people/profile/${peopleIdOrEmail}`,
        {
          method: 'GET',
          headers: crispHeaders,
        },
      );

      if (res.status === 404) {
        return null;
      }

      if (!res.ok) {
        throw new Error(
          `Crisp responded with ${res.status}: ${res.statusText} - From getCrispUser `,
        );
      }

      const body: { data: CrispUser } = await res.json();

      return body.data;
    },
  };
}

export type CrispClient = ReturnType<typeof createCrispClient>;
