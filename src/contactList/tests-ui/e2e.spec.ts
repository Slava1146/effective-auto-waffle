import { expect } from '@playwright/test';
import { test } from '../po';
import { readJson } from '../../utils/readJson';
import { generateAlphabeticString } from '../../utils/strings';
import { addScreenshot } from 'utils/helpers';

test.describe('E2E UI tests', { tag: '@smoke' }, () => {
  test.use({ storageState: 'src/contactList/data/states/contactListAuth.json' });

  const data = readJson('./src/contactList/data/contactData.json');

  const contactData: TContactData = {
    birthdate: data.birthdate,
    city: data.city,
    country: data.country,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    postalCode: data.postalCode,
    stateProvince: data.stateProvince,
    street1: data.street1,
    street2: data.street2,
  };

  const contactDataUpd: TContactData = {
    birthdate: '1980-07-12',
    city: data.city + 1,
    country: data.country + 1,
    email: 'adam-jensenp1@fake.com',
    firstName: `${contactData.firstName}1`,
    lastName: `${contactData.lastName}1`,
    phone: data.phone + 1,
    postalCode: data.postalCode + 1,
    stateProvince: data.stateProvince + 1,
    street1: data.street1 + 1,
    street2: data.street2 + 1,
  };

  test.beforeEach(async ({ contactList }) => {
    await contactList.goto();
  });

  test('User can create contact', async ({
    addContact,
    contactList,
    contactDetails,
    contactListApi,
    page,
  }, testInfo) => {
    // Add new contact
    await contactList.addContactBtn.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(addContact.url);

    await addContact.contactForm.fillForm(contactData);

    await addScreenshot(addContact.page, testInfo, 'filled-form.png');

    await addContact.contactForm.submitBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactList.url);

    // Review created contact on the contact list
    const rowNumber = await contactList.table.findRowNumberByName(`${contactData.firstName} ${contactData.lastName}`);

    const contactId = await contactList.table.row.nth(rowNumber).locator('td').nth(0).innerText();

    await contactList.rowDataChek(contactData);

    await addScreenshot(addContact.page, testInfo, 'created-contact-on-listing.png');

    // Review created contact on the contact details page
    await contactList.table.row.nth(rowNumber).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactDetails.url);

    await expect(contactDetails.contactForm.fNameInpt).toHaveText(contactData.firstName);
    await expect(contactDetails.contactForm.lNameInpt).toHaveText(contactData.lastName);
    await expect(contactDetails.contactForm.birthInpt).toHaveText(contactData.birthdate);
    await expect(contactDetails.contactForm.emailInpt).toHaveText(contactData.email);
    await expect(contactDetails.contactForm.phoneInpt).toHaveText(contactData.phone);
    await expect(contactDetails.contactForm.addressFstInpt).toHaveText(contactData.street1);
    await expect(contactDetails.contactForm.addressFstInpt).toHaveText(contactData.street1);
    await expect(contactDetails.contactForm.cityInpt).toHaveText(contactData.city);
    await expect(contactDetails.contactForm.stateInpt).toHaveText(contactData.stateProvince);
    await expect(contactDetails.contactForm.postalCodeInpt).toHaveText(contactData.postalCode);
    await expect(contactDetails.contactForm.countryInpt).toHaveText(contactData.country);

    await addScreenshot(addContact.page, testInfo, 'contact-on-details-page.png');

    await contactListApi.deleteContact(contactId);
  });

  test('User can edit contact', async ({
    addContact,
    contactList,
    contactDetails,
    editContact,
    contactListApi,
    page,
  }, testInfo) => {
    const postfix = generateAlphabeticString(8);
    contactData.firstName = `${data.firstName}_${postfix}`;
    contactData.lastName = `${data.lastName}_${postfix}`;

    const newContact = await contactListApi.createContact(contactData);
    const contactId = newContact._id;

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page).toHaveURL(contactList.url);

    // Review created contact on the contact list
    const rowNumber = await contactList.table.findRowNumberByName(`${contactData.firstName} ${contactData.lastName}`);

    await contactList.rowDataChek(contactData);

    await addScreenshot(addContact.page, testInfo, 'created-contact-on-listing.png');

    // Review created contact on the contact details page
    await contactList.table.row.nth(rowNumber).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactDetails.url);

    // Open Edit page and make update
    await contactDetails.editBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(editContact.url);

    await editContact.contactForm.fillForm(contactDataUpd);

    await addScreenshot(addContact.page, testInfo, 'updated-contact.png');

    await editContact.contactForm.submitBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactDetails.url);

    // Review updated contact on the contact details page
    await expect(contactDetails.contactForm.fNameInpt).toHaveText(contactDataUpd.firstName);
    await expect(contactDetails.contactForm.lNameInpt).toHaveText(contactDataUpd.lastName);
    await expect(contactDetails.contactForm.birthInpt).toHaveText(contactDataUpd.birthdate);
    await expect(contactDetails.contactForm.emailInpt).toHaveText(contactDataUpd.email);
    await expect(contactDetails.contactForm.phoneInpt).toHaveText(contactDataUpd.phone);
    await expect(contactDetails.contactForm.addressFstInpt).toHaveText(contactDataUpd.street1);
    await expect(contactDetails.contactForm.addressFstInpt).toHaveText(contactDataUpd.street1);
    await expect(contactDetails.contactForm.cityInpt).toHaveText(contactDataUpd.city);
    await expect(contactDetails.contactForm.stateInpt).toHaveText(contactDataUpd.stateProvince);
    await expect(contactDetails.contactForm.postalCodeInpt).toHaveText(contactDataUpd.postalCode);
    await expect(contactDetails.contactForm.countryInpt).toHaveText(contactDataUpd.country);

    await addScreenshot(addContact.page, testInfo, 'updated-contact-on-details-page.png');

    await contactDetails.backToListBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactList.url);

    // Review updated contact on the contact list
    await contactList.rowDataChek(contactDataUpd);

    await addScreenshot(addContact.page, testInfo, 'updated-contact-on-listing.png');

    await contactListApi.deleteContact(contactId);
  });

  test('User can delete contact', async ({
    addContact,
    contactList,
    contactDetails,
    contactListApi,
    page,
  }, testInfo) => {
    const postfix = generateAlphabeticString(8);
    contactData.firstName = `${data.firstName}_${postfix}`;
    contactData.lastName = `${data.lastName}_${postfix}`;

    const newContact = await contactListApi.createContact(contactData);
    const contactId = newContact._id;

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page).toHaveURL(contactList.url);

    await addScreenshot(addContact.page, testInfo, 'created-contact-on-listing.png');

    const rowNumber = await contactList.table.findRowNumberByName(`${contactData.firstName} ${contactData.lastName}`);

    // Delete created contact
    await contactList.table.row.nth(rowNumber).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactDetails.url);

    await expect(contactDetails.contactForm.fNameInpt).toHaveText(contactData.firstName);

    await contactDetails.confirmPopup('accept');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactList.url);

    // Verify that deleted contact is not presented on the page
    await expect(page.getByText(`${contactData.firstName} ${contactData.lastName}`)).not.toBeVisible();
    await addScreenshot(addContact.page, testInfo, 'listing-after-contact-deletion.png');

    const getContact = await contactListApi.getContact(contactId);
    expect(getContact).toEqual('');
  });
});
