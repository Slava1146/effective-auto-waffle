import { expect } from '@playwright/test';
import { test } from '../po';
import { CONTACT_LIST_USER } from '../data/constants';
import { errors, loginPage as loginPgContent } from '../data/textData';
import { generateAlphanumericString } from '../../utils/strings';

test.describe('Login UI tests', () => {
  const RANDOM_STRING = generateAlphanumericString(8);

  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginFormVisibilityCheck();
  });

  test('User can log in and log out from UI', async ({ loginPage, contactListPage }) => {
    await loginPage.login(CONTACT_LIST_USER.userLogin, CONTACT_LIST_USER.password);

    await expect(contactListPage.header.logoutBtn).toBeVisible();
    await contactListPage.header.logoutBtn.click();

    await loginPage.loginFormVisibilityCheck();
  });

  test('User cannot log in from UI with incorrect credentials', async ({ loginPage, contactListPage }) => {
    await loginPage.login(`${RANDOM_STRING}@gmail.com`, RANDOM_STRING);

    await expect(contactListPage.header.logoutBtn).not.toBeVisible();
    await expect(loginPage.loginEr).toBeVisible();
    await expect(loginPage.loginEr).toHaveText(errors.loginPage.invalidCredentials);
  });

  test('Default page state', async ({ loginPage }) => {
    await loginPage.loginFormVisibilityCheck();
    await expect(loginPage.emailInpt).toHaveAttribute('placeholder', loginPgContent.loginForm.emailInpt);
    await expect(loginPage.passInpt).toHaveAttribute('placeholder', loginPgContent.loginForm.passInpt);
    await expect(loginPage.submitBtn).toHaveText(loginPgContent.loginForm.submitBtn);
    await expect(loginPage.formHeading).toBeVisible();
    await expect(loginPage.signUpHeading).toBeVisible();
    await expect(loginPage.signUpBtn).toBeVisible();
    await expect(loginPage.welcomeMsg).toBeVisible();
    await expect(loginPage.apiInfoMsg).toBeVisible();
    await expect(loginPage.formHeading).toHaveText(loginPgContent.loginForm.heading);
    await expect(loginPage.signUpHeading).toHaveText(loginPgContent.loginForm.signUpHeading);
    await expect(loginPage.signUpBtn).toHaveText(loginPgContent.loginForm.signUpBtn);
    await expect(loginPage.welcomeMsg).toHaveText(loginPgContent.welcomeMsg);
    await expect(loginPage.apiInfoMsg).toHaveText(loginPgContent.apiInfoMsg);
    await expect(loginPage.linkToApi).toHaveAttribute('href', loginPgContent.linkToApi);
    await loginPage.footer.contentCheck();
    await loginPage.header.contentCheck('login');
  });
});
