import { test as baseTest } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { ContactListPage } from './pages/ContactList.page';

export type TestType = typeof baseTest & {
  loginPage: LoginPage;
  contactListPage: ContactListPage;
};

export const test = baseTest.extend<TestType>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);
    // Use the fixture value in the test.
    await use(loginPage);
  },
  contactListPage: async ({ page }, use) => {
    // Set up the fixture.
    const contactListPage = new ContactListPage(page);
    // Use the fixture value in the test.
    await use(contactListPage);
  },
});
