import { test as setup } from '@playwright/test';
import { CONTACT_LIST_USER, URL_PATH } from '../data/constants';
import { getEnv } from '../../utils/env';
import path from 'path';

const { url: BASE_URL } = getEnv();

const authFile = path.join(__dirname, '../data/states/contactListApiAuth.json');

setup('Authenticate via API', async ({ request }) => {
  await request.post(BASE_URL + URL_PATH.contactList.api.login, {
    data: {
      email: CONTACT_LIST_USER.user,
      password: CONTACT_LIST_USER.password,
    },
  });
  await request.storageState({ path: authFile });
});
