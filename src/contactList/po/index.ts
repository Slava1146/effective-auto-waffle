import { test as baseTest } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { ContactListPage } from './pages/ContactList.page';
import { AddContactPage } from './pages/AddContact.page';
import { EditContactPage } from './pages/EditContact.page';
import { ContactDetailsPage } from './pages/ContactDetails.page';

export type TestType = typeof baseTest & {
  login: LoginPage;
  contactList: ContactListPage;
  addContact: AddContactPage;
  editContact: EditContactPage;
  contactDetails: ContactDetailsPage;
};

export const test = baseTest.extend<TestType>({
  login: async ({ page }, use) => {
    // Set up the fixture.
    const login = new LoginPage(page);
    // Use the fixture value in the test.
    await use(login);
  },
  contactList: async ({ page }, use) => {
    const contactList = new ContactListPage(page);
    await use(contactList);
  },
  addContact: async ({ page }, use) => {
    const addContact = new AddContactPage(page);
    await use(addContact);
  },
  editContact: async ({ page }, use) => {
    const editContact = new EditContactPage(page);
    await use(editContact);
  },
  contactDetails: async ({ page }, use) => {
    const contactDetails = new ContactDetailsPage(page);
    await use(contactDetails);
  },
});
