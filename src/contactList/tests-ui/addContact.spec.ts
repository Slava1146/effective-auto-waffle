import { expect } from '@playwright/test';
import { test } from '../po';
import { contactForm } from '../data/textData';

test.describe('AddContact UI tests', () => {
  test.use({ storageState: 'src/contactList/data/states/contactListUiAuth.json' });
  test.beforeEach(async ({ addContactPage }) => {
    await addContactPage.goto();
  });

  test('Default page state', async ({ addContactPage }) => {
    const arrLocators = [
      addContactPage.submitBtn,
      addContactPage.fNameLbl,
      addContactPage.fNameInpt,
      addContactPage.lNameLbl,
      addContactPage.lNameInpt,
      addContactPage.emailLbl,
      addContactPage.emailInpt,
      addContactPage.birthLbl,
      addContactPage.birthInpt,
      addContactPage.addressFstLbl,
      addContactPage.addressFstInpt,
      addContactPage.phoneLbl,
      addContactPage.phoneInpt,
      addContactPage.addressSecLbl,
      addContactPage.addressSecInpt,
      addContactPage.cityLbl,
      addContactPage.cityInpt,
      addContactPage.stateLbl,
      addContactPage.stateInpt,
      addContactPage.countryLbl,
      addContactPage.countryInpt,
      addContactPage.postalCodeLbl,
      addContactPage.postalCodeInpt,
    ];
    arrLocators.forEach(async el => await expect(el).toBeVisible());

    await expect(addContactPage.submitBtn).toHaveText(contactForm.submitBtn);
    await expect(addContactPage.cancelBtn).toHaveText(contactForm.cancelBtn);
    await expect(addContactPage.fNameLbl).toHaveText(contactForm.fistName.label);
    await expect(addContactPage.lNameLbl).toHaveText(contactForm.lastName.label);
    await expect(addContactPage.cityLbl).toHaveText(contactForm.city.label);
    await expect(addContactPage.birthLbl).toHaveText(contactForm.birthDay.label);
    await expect(addContactPage.emailLbl).toHaveText(contactForm.email.label);
    await expect(addContactPage.phoneLbl).toHaveText(contactForm.phone.label);
    await expect(addContactPage.stateLbl).toHaveText(contactForm.state.label);
    await expect(addContactPage.countryLbl).toHaveText(contactForm.country.label);
    await expect(addContactPage.addressFstLbl).toHaveText(contactForm.addressFirst.label);
    await expect(addContactPage.addressSecLbl).toHaveText(contactForm.addressSecond.label);
    await expect(addContactPage.postalCodeLbl).toHaveText(contactForm.postalCode.label);

    await expect(addContactPage.cityInpt).toHaveAttribute('placeholder', contactForm.city.input);
    await expect(addContactPage.birthInpt).toHaveAttribute('placeholder', contactForm.birthDay.input);
    await expect(addContactPage.emailInpt).toHaveAttribute('placeholder', contactForm.email.input);
    await expect(addContactPage.fNameInpt).toHaveAttribute('placeholder', contactForm.fistName.input);
    await expect(addContactPage.lNameInpt).toHaveAttribute('placeholder', contactForm.lastName.input);
    await expect(addContactPage.phoneInpt).toHaveAttribute('placeholder', contactForm.phone.input);
    await expect(addContactPage.stateInpt).toHaveAttribute('placeholder', contactForm.state.input);
    await expect(addContactPage.countryInpt).toHaveAttribute('placeholder', contactForm.country.input);
    await expect(addContactPage.addressFstInpt).toHaveAttribute('placeholder', contactForm.addressFirst.input);
    await expect(addContactPage.addressSecInpt).toHaveAttribute('placeholder', contactForm.addressSecond.input);
    await expect(addContactPage.postalCodeInpt).toHaveAttribute('placeholder', contactForm.postalCode.input);

    await addContactPage.footer.contentCheck();
    await addContactPage.header.contentCheck('addContact');
  });
});
