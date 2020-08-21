/// @ts-check
const Crisp = require('node-crisp-api');
const produce = require('immer').default;
const websiteId = 'af9adec5-ddfa-4db9-a4a3-25769daf2fc2';

async function useCatch(fn) {
  try {
    const result = await fn();
    return [result];
  } catch (error) {
    return [, error];
  }
}

/**
 *
 * @param {object} contact
 * @param {string} contact?.name
 * @param {string} contact?.email
 * @param {string} contact?.url
 * @param {string[]} contact?.segments
 * @param {Record<string, any>} contact?.data
 * @returns {Promise<string>}
 */
async function ensureContact(contact) {
  const CrispClient = new Crisp();
  CrispClient.authenticate(process.env.CRISP_ID, process.env.CRISP_TOKEN);

  const { email, name, url, segments, data } = contact;

  const [existingAccount] = await useCatch(() =>
    CrispClient.websitePeople.findByEmail(websiteId, email)
  );

  if (!!existingAccount) {
    const updates = [];

    if (!existingAccount.person.website) {
      updates.push((profile) => {
        profile.person.website = url;
      });
    }

    if (
      !existingAccount.segments ||
      !existingAccount.segments.some(
        (segment) => segment === segments.includes(segment)
      )
    ) {
      updates.push((profile) => {
        profile.segments = []
          .concat(segments)
          .concat(existingAccount.segments)
          .filter(defined)
          .filter(unique);
      });
    }

    if (updates.length) {
      await CrispClient.websitePeople.updatePeopleProfile(
        websiteId,
        existingAccount.people_id,
        produce(existingAccount, (profile) => {
          updates.forEach((update) => update(profile));
        })
      );
    }

    return existingAccount.people_id;
  }

  const createProfile = await CrispClient.websitePeople.createNewPeopleProfile(
    websiteId,
    {
      email,
      person: {
        nickname: name,
        website: url,
      },
      segments,
    }
  );

  return createProfile.people_id;
}

module.exports = {
  ensureContact,
};

function unique(val, i, all) {
  return all.indexOf(val) === i;
}

function defined(val) {
  return !!val;
}
