import { expect } from '@playwright/test';
import { test as setup } from '../po';
import { CONTACT_LIST_USER } from '../data/constants';
import path from 'path';

const authFile = path.join(__dirname, '../data/states/contactListUiAuth.json');

setup.describe('Authenticate via UI form', () => {
  setup.beforeEach(async ({ login }) => {
    await login.goto();
    await login.loginFormVisibilityCheck();
  });

  setup('Log in and save sate', async ({ login, page, contactList }) => {
    await login.login(CONTACT_LIST_USER.user, CONTACT_LIST_USER.password);
    await expect(contactList.header.logoutBtn).toBeVisible();

    await page.context().storageState({ path: authFile });
  });
});
