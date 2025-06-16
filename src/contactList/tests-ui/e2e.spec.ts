import { expect, Page } from '@playwright/test';
import { test } from '../po';
import { readJson } from '../../utils/readJson';

test.describe('E2E UI tests', () => {
  test.use({ storageState: 'src/contactList/data/states/contactListUiAuth.json' });

  const data = readJson('./src/contactList/data/contactData.json');
  const contactData : TContactData = {
    'birthdate': data.birthdate,
    'city': data.city,
    'country': data.country,
    'email': data.email,
    'firstName': data.firstName,
    'lastName': data.lastName,
    'phone': data.phone,
    'postalCode': data.postalCode,
    'stateProvince': data.stateProvince,
    'street1': data.street1,
    'street2': data.street2,
  }

  test.beforeEach(async ({ contactList }) => {
    await contactList.goto();
  });

  /*When the API will be studied need to split this test in a few smaller and independent tests (TBD):
  - Create contact via UI, check data on contact list and details, delete via API
  - Create contact via API, edit contact via UI, check data on contact list and details, delete via API
  - Create contact via API, delete from UI, check that it is not presented on contact list, check that it was deleted via API*/
  test.only(`- Add new contact
        - Review data on contact list 
        - Review data on contact details
        - Edit data on edit contact
        - Review data on contact list 
        - Review data on contact details
        - Delete created contact`, async ({ addContact, contactList, editContact, contactDetails, page }) => {
    await contactList.addContactBtn.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(addContact.url);

    await addContact.contactForm.fNameInpt.fill(contactData.firstName);
    await addContact.contactForm.lNameInpt.fill(contactData.lastName);
    await addContact.contactForm.birthInpt.fill(contactData.birthdate);
    await addContact.contactForm.emailInpt.fill(contactData.email);
    await addContact.contactForm.phoneInpt.fill(contactData.phone);
    await addContact.contactForm.addressFstInpt.fill(contactData.street1);
    await addContact.contactForm.addressSecInpt.fill(contactData.street2);
    await addContact.contactForm.cityInpt.fill(contactData.city);
    await addContact.contactForm.stateInpt.fill(contactData.stateProvince);
    await addContact.contactForm.postalCodeInpt.fill(contactData.postalCode);
    await addContact.contactForm.countryInpt.fill(contactData.country);
    await addContact.contactForm.submitBtn.click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactList.url);

    // check contact on list
    // check contact on details
    // go to edit page check data there
    // make update
    // check contact list
    // check contact on details
    // delete contact
    // check contact list
  });
});
