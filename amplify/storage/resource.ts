import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'MediaStorageApplication',
  access: (allow) => ({
    'usersfiles/*': [allow.guest.to(['read', 'write', 'delete'])],
    'examples/*': [allow.guest.to(['read', 'write'])],
  }),
});
