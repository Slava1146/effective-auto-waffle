// import { expect } from '@playwright/test';
import { test } from '../po';

test.describe('ContactList UI tests', () => {
  test.use({ storageState: 'src/contactList/data/states/contactListUiAuth.json' });
  test.beforeEach(async ({ contactListPage }) => {
    await contactListPage.goto();
    await contactListPage.defaultElVisibilityCheck();
  });

  test('Default page state', async ({ contactListPage }) => {
    await contactListPage.defaultElVisibilityCheck();
    await contactListPage.footer.contentCheck();
    await contactListPage.header.contentCheck('list');
  });
});
