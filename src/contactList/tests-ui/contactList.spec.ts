// import { expect } from '@playwright/test';
import { test } from '../po';

test.describe('ContactList UI tests', { tag: '@listingUI' }, () => {
  test.use({ storageState: 'src/contactList/data/states/contactListAuth.json' });
  test.beforeEach(async ({ contactList }) => {
    await contactList.goto();
    await contactList.defaultElVisibilityCheck();
  });

  test('Default page state', async ({ contactList }) => {
    await contactList.defaultElVisibilityCheck();
    await contactList.footer.contentCheck();
    await contactList.header.contentCheck('list');
  });
});
