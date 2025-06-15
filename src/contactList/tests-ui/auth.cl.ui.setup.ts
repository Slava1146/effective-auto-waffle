import { expect } from '@playwright/test';
import { test as setup } from '../po';
import { CONTACT_LIST_USER } from '../data/constants';
import path from 'path';

const authFile = path.join(__dirname, '../data/states/contactListUiAuth.json');

setup.describe('Authenticate via UI form', () => {
  setup.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginFormVisibilityCheck();
  });

  setup('Log in and save sate', async ({ loginPage, page, contactListPage }) => {
    await loginPage.login(CONTACT_LIST_USER.user, CONTACT_LIST_USER.password);
    await expect(contactListPage.header.logoutBtn).toBeVisible();

    await page.context().storageState({ path: authFile });
  });
});
