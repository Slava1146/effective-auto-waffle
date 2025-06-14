import { expect } from '@playwright/test';
import { test } from '../po';
import { CONTACT_LIST_USER } from '../data/constants';
import { errors, loginPage as loginPageText } from '../data/textData';
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

    await expect(contactListPage.logoutBtn).toBeVisible();
    await contactListPage.logoutBtn.click();

    await loginPage.loginFormVisibilityCheck();
  });

  test('User cannot log in from UI with incorrect credentials', async ({ loginPage, contactListPage }) => {
    await loginPage.login(`${RANDOM_STRING}@gmail.com`, RANDOM_STRING);

    await expect(contactListPage.logoutBtn).not.toBeVisible();
    await expect(loginPage.loginEr).toBeVisible();
    await expect(loginPage.loginEr).toHaveText(errors.loginPage.invalidCredentials);
  });

  test('Default page state', async ({ loginPage }) => {
    await loginPage.loginFormVisibilityCheck();
    await expect(loginPage.emailInpt).toHaveAttribute('placeholder', loginPageText.loginForm.emailInpt);
    await expect(loginPage.passInpt).toHaveAttribute('placeholder', loginPageText.loginForm.passInpt);
    await expect(loginPage.submitBtn).toHaveText(loginPageText.loginForm.submitBtn);
    await expect(loginPage.pageHeading).toBeVisible();
    await expect(loginPage.formHeading).toBeVisible();
    await expect(loginPage.signUpHeading).toBeVisible();
    await expect(loginPage.signUpBtn).toBeVisible();
    await expect(loginPage.welcomeMsg).toBeVisible();
    await expect(loginPage.apiInfoMsg).toBeVisible();
    await expect(loginPage.pageHeading).toHaveText(loginPageText.heading);
    await expect(loginPage.formHeading).toHaveText(loginPageText.loginForm.heading);
    await expect(loginPage.signUpHeading).toHaveText(loginPageText.loginForm.signUpHeading);
    await expect(loginPage.signUpBtn).toHaveText(loginPageText.loginForm.signUpBtn);
    await expect(loginPage.welcomeMsg).toHaveText(loginPageText.welcomeMsg);
    await expect(loginPage.apiInfoMsg).toHaveText(loginPageText.apiInfoMsg);
    await expect(loginPage.linkToApi).toHaveAttribute('href', loginPageText.linkToApi);
  });
});
