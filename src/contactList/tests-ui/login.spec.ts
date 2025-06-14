import { expect } from '@playwright/test';
import { test } from '../po';
import { CONTACT_LIST_USER } from '../data/constants';
import { ERRORS } from '../data/textData';
import { generateAlphanumericString } from '../../utils/strings';

test.describe('Login UI tests', () => {
  const RANDOM_STRING = generateAlphanumericString(8);

  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.defaultElVisibilityCheck();
  });

  test('Verify that user can log in and log out from UI', async ({ loginPage, contactListPage }) => {
    await loginPage.login(CONTACT_LIST_USER.userLogin, CONTACT_LIST_USER.password);

    await expect(contactListPage.logoutBtn).toBeVisible();
    await contactListPage.logoutBtn.click();

    await loginPage.defaultElVisibilityCheck();
  });

  test('Verify that user cannot log in from UI with incorrect credentials', async ({ loginPage, contactListPage }) => {
    await loginPage.login(`${RANDOM_STRING}@gmail.com`, RANDOM_STRING);

    await expect(contactListPage.logoutBtn).not.toBeVisible();
    await expect(loginPage.loginEr).toBeVisible();
    await expect(loginPage.loginEr).toHaveText(ERRORS.loginPage.invalidCredentials);
  });
});
