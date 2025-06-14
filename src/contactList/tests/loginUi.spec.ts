import { expect } from '@playwright/test';
import { test } from '../po';
import { CONTACT_LIST_USER } from '../data/constants';

test.describe('Login UI tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Verify that user can log in and log out from UI', async ({ loginPage, contactListPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passInput).toBeVisible();
    await expect(loginPage.submitBtn).toBeVisible();

    await loginPage.emailInput.fill(CONTACT_LIST_USER.user);
    await loginPage.passInput.fill(CONTACT_LIST_USER.password);
    await loginPage.submitBtn.click();

    await expect(contactListPage.logoutBtn).toBeVisible();
    await contactListPage.logoutBtn.click();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passInput).toBeVisible();
    await expect(loginPage.submitBtn).toBeVisible();
  });
});
