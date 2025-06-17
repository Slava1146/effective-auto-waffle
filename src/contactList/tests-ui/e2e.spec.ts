import { expect } from '@playwright/test';
import { test } from '../po';
import { readJson } from '../../utils/readJson';
import { generateAlphabeticString } from '../../utils/strings';

test.describe('E2E UI tests', () => {
  test.use({ storageState: 'src/contactList/data/states/contactListUiAuth.json' });

  const data = readJson('./src/contactList/data/contactData.json');

  const postfix = generateAlphabeticString(8);

  const contactData: TContactData = {
    birthdate: data.birthdate,
    city: data.city,
    country: data.country,
    email: data.email,
    firstName: `${data.firstName}_${postfix}`,
    lastName: `${data.lastName}_${postfix}`,
    phone: data.phone,
    postalCode: data.postalCode,
    stateProvince: data.stateProvince,
    street1: data.street1,
    street2: data.street2,
  };

  const rowDataArr = [
    `${contactData.firstName} ${contactData.lastName}`,
    contactData.birthdate,
    contactData.email,
    contactData.phone,
    `${contactData.street1} ${contactData.street2}`,
    `${contactData.city} ${contactData.stateProvince} ${contactData.postalCode}`,
    contactData.country,
  ];

  const contactDataUpd: TContactData = {
    birthdate: '1980-07-12',
    city: data.city + 1,
    country: data.country + 1,
    email: 'adam-jensenp1@fake.com',
    firstName: `${data.firstName}_${postfix}1`,
    lastName: `${data.lastName}_${postfix}1`,
    phone: data.phone + 1,
    postalCode: data.postalCode + 1,
    stateProvince: data.stateProvince + 1,
    street1: data.street1 + 1,
    street2: data.street2 + 1,
  };

  const rowDataUpdArr = [
    `${contactDataUpd.firstName} ${contactDataUpd.lastName}`,
    contactDataUpd.birthdate,
    contactDataUpd.email,
    contactDataUpd.phone,
    `${contactDataUpd.street1} ${contactDataUpd.street2}`,
    `${contactDataUpd.city} ${contactDataUpd.stateProvince} ${contactDataUpd.postalCode}`,
    contactDataUpd.country,
  ];

  test.beforeEach(async ({ contactList }) => {
    await contactList.goto();
  });

  /*When the API will be studied need to split this test in a few smaller and independent tests (TBD):
  - Create contact via UI, check data on contact list and details, delete via API
  - Create contact via API, edit contact via UI, check data on contact list and details, delete via API
  - Create contact via API, delete from UI, check that it is not presented on contact list, check that it was deleted via API*/
  test('End-to-end', async ({ addContact, contactList, editContact, contactDetails, page }) => {
    // Add new contact
    await contactList.addContactBtn.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(addContact.url);

    await addContact.contactForm.fillForm(contactData);
    await addContact.contactForm.submitBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactList.url);

    // Review created contact on the contact list
    let rowNumber = await contactList.table.findRowNumberByName(`${contactData.firstName} ${contactData.lastName}`);

    for (let i = 0; i < (await contactList.table.header.count()); i++) {
      await expect(
        contactList.table.row
          .nth(rowNumber)
          .locator('td')
          .nth(i + 1),
      ).toHaveText(rowDataArr[i]);
    }

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

    // Open Edit page and make update
    await contactDetails.editBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(editContact.url);

    await editContact.contactForm.fillForm(contactDataUpd);
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

    await contactDetails.backToListBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactList.url);

    // Review updated contact on the contact list
    rowNumber = await contactList.table.findRowNumberByName(`${contactDataUpd.firstName} ${contactDataUpd.lastName}`);

    for (let i = 0; i < (await contactList.table.header.count()); i++) {
      await expect(
        contactList.table.row
          .nth(rowNumber)
          .locator('td')
          .nth(i + 1),
      ).toHaveText(rowDataUpdArr[i]);
    }

    // Delete created contact
    await contactList.table.row.nth(rowNumber).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactDetails.url);

    await expect(contactDetails.contactForm.fNameInpt).toHaveText(contactDataUpd.firstName);

    await contactDetails.confirmPopup('accept');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(contactList.url);

    // Verify that deleted contact is not presented on the page
    await expect(page.getByText(`${contactDataUpd.firstName} ${contactDataUpd.lastName}`)).not.toBeVisible();
  });
});
