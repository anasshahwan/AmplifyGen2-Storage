import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'MediaStorageApplication',
  access: (allow) => ({
    'usersfiles/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'media/profile-pictures/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['ADMINS']).to(['read', 'delete']),
    ],
  }),
});
