import { expect } from '@playwright/test';
import { test } from '../po';
import { CONTACT_LIST_USER } from '../data/constants';
import { errors, loginPage as loginPgContent } from '../data/textData';
import { generateAlphanumericString } from '../../utils/strings';

test.describe('Login UI tests', () => {
  const RANDOM_STRING = generateAlphanumericString(8);

  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ login }) => {
    await login.goto();
    await login.loginFormVisibilityCheck();
  });

  test('User can log in and log out from UI', async ({ login, contactList }) => {
    await login.login(CONTACT_LIST_USER.userLogin, CONTACT_LIST_USER.password);

    await expect(contactList.header.logoutBtn).toBeVisible();
    await contactList.header.logoutBtn.click();

    await login.loginFormVisibilityCheck();
  });

  test('User cannot log in from UI with incorrect credentials', async ({ login, contactList }) => {
    await login.login(`${RANDOM_STRING}@gmail.com`, RANDOM_STRING);

    await expect(contactList.header.logoutBtn).not.toBeVisible();
    await expect(login.loginEr).toBeVisible();
    await expect(login.loginEr).toHaveText(errors.loginPage.invalidCredentials);
  });

  test('Default page state', async ({ login }) => {
    await login.loginFormVisibilityCheck();
    await expect(login.emailInpt).toHaveAttribute('placeholder', loginPgContent.loginForm.emailInpt);
    await expect(login.passInpt).toHaveAttribute('placeholder', loginPgContent.loginForm.passInpt);
    await expect(login.submitBtn).toHaveText(loginPgContent.loginForm.submitBtn);
    await expect(login.formHeading).toBeVisible();
    await expect(login.signUpHeading).toBeVisible();
    await expect(login.signUpBtn).toBeVisible();
    await expect(login.welcomeMsg).toBeVisible();
    await expect(login.apiInfoMsg).toBeVisible();
    await expect(login.formHeading).toHaveText(loginPgContent.loginForm.heading);
    await expect(login.signUpHeading).toHaveText(loginPgContent.loginForm.signUpHeading);
    await expect(login.signUpBtn).toHaveText(loginPgContent.loginForm.signUpBtn);
    await expect(login.welcomeMsg).toHaveText(loginPgContent.welcomeMsg);
    await expect(login.apiInfoMsg).toHaveText(loginPgContent.apiInfoMsg);
    await expect(login.linkToApi).toHaveAttribute('href', loginPgContent.linkToApi);
    await login.footer.contentCheck();
    await login.header.contentCheck('login');
  });
});
