/* eslint-disable react-hooks/rules-of-hooks */
import { Crisp } from 'node-crisp-api';
import { produce } from 'immer';

const WEBSITE_ID = 'af9adec5-ddfa-4db9-a4a3-25769daf2fc2';

async function useCatch(fn) {
  try {
    const result = await fn();
    return [result];
  } catch (error) {
    return [undefined, error];
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
export async function ensureContact(contact) {
  const CrispClient = new Crisp();
  CrispClient.authenticate(process.env.CRISP_ID, process.env.CRISP_TOKEN);

  const { email, name, url, segments } = contact;

  const [existingAccount] = await useCatch(() => CrispClient.websitePeople.findByEmail(WEBSITE_ID, email));

  if (existingAccount) {
    const updates = [];

    if (!existingAccount.person.website) {
      updates.push(profile => {
        profile.person.website = url;
      });
    }

    if (
      !existingAccount.segments ||
      !existingAccount.segments.some(segment => segment === segments.includes(segment))
    ) {
      updates.push(profile => {
        profile.segments = [].concat(segments).concat(existingAccount.segments).filter(Boolean).filter(unique);
      });
    }

    if (updates.length) {
      await CrispClient.websitePeople.updatePeopleProfile(
        WEBSITE_ID,
        existingAccount.people_id,
        produce(existingAccount, profile => {
          updates.forEach(update => update(profile));
        })
      );
    }

    return existingAccount.people_id;
  }

  const createProfile = await CrispClient.websitePeople.createNewPeopleProfile(WEBSITE_ID, {
    email,
    person: {
      nickname: name,
      website: url,
    },
    segments,
  });

  return createProfile.people_id;
}

function unique(val, i, all) {
  return all.indexOf(val) === i;
}
