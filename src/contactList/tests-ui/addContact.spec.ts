import { expect } from '@playwright/test';
import { test } from '../po';
import { contactForm } from '../data/textData';

test.describe('AddContact UI tests', () => {
  test.use({ storageState: 'src/contactList/data/states/contactListUiAuth.json' });
  test.beforeEach(async ({ addContact }) => {
    await addContact.goto();
  });

  test('Default page state', async ({ addContact }) => {
    const arrLocators = [
      addContact.contactForm.submitBtn,
      addContact.contactForm.fNameLbl,
      addContact.contactForm.fNameInpt,
      addContact.contactForm.lNameLbl,
      addContact.contactForm.lNameInpt,
      addContact.contactForm.emailLbl,
      addContact.contactForm.emailInpt,
      addContact.contactForm.birthLbl,
      addContact.contactForm.birthInpt,
      addContact.contactForm.addressFstLbl,
      addContact.contactForm.addressFstInpt,
      addContact.contactForm.phoneLbl,
      addContact.contactForm.phoneInpt,
      addContact.contactForm.addressSecLbl,
      addContact.contactForm.addressSecInpt,
      addContact.contactForm.cityLbl,
      addContact.contactForm.cityInpt,
      addContact.contactForm.stateLbl,
      addContact.contactForm.stateInpt,
      addContact.contactForm.countryLbl,
      addContact.contactForm.countryInpt,
      addContact.contactForm.postalCodeLbl,
      addContact.contactForm.postalCodeInpt,
    ];
    arrLocators.forEach(async el => await expect(el).toBeVisible());

    await expect(addContact.contactForm.submitBtn).toHaveText(contactForm.submitBtn);
    await expect(addContact.contactForm.cancelBtn).toHaveText(contactForm.cancelBtn);
    await expect(addContact.contactForm.fNameLbl).toHaveText(contactForm.fistName.label);
    await expect(addContact.contactForm.lNameLbl).toHaveText(contactForm.lastName.label);
    await expect(addContact.contactForm.cityLbl).toHaveText(contactForm.city.label);
    await expect(addContact.contactForm.birthLbl).toHaveText(contactForm.birthDay.label);
    await expect(addContact.contactForm.emailLbl).toHaveText(contactForm.email.label);
    await expect(addContact.contactForm.phoneLbl).toHaveText(contactForm.phone.label);
    await expect(addContact.contactForm.stateLbl).toHaveText(contactForm.state.label);
    await expect(addContact.contactForm.countryLbl).toHaveText(contactForm.country.label);
    await expect(addContact.contactForm.addressFstLbl).toHaveText(contactForm.addressFirst.label);
    await expect(addContact.contactForm.addressSecLbl).toHaveText(contactForm.addressSecond.label);
    await expect(addContact.contactForm.postalCodeLbl).toHaveText(contactForm.postalCode.label);

    await expect(addContact.contactForm.cityInpt).toHaveAttribute('placeholder', contactForm.city.input);
    await expect(addContact.contactForm.birthInpt).toHaveAttribute('placeholder', contactForm.birthDay.input);
    await expect(addContact.contactForm.emailInpt).toHaveAttribute('placeholder', contactForm.email.input);
    await expect(addContact.contactForm.fNameInpt).toHaveAttribute('placeholder', contactForm.fistName.input);
    await expect(addContact.contactForm.lNameInpt).toHaveAttribute('placeholder', contactForm.lastName.input);
    await expect(addContact.contactForm.phoneInpt).toHaveAttribute('placeholder', contactForm.phone.input);
    await expect(addContact.contactForm.stateInpt).toHaveAttribute('placeholder', contactForm.state.input);
    await expect(addContact.contactForm.countryInpt).toHaveAttribute('placeholder', contactForm.country.input);
    await expect(addContact.contactForm.addressFstInpt).toHaveAttribute('placeholder', contactForm.addressFirst.input);
    await expect(addContact.contactForm.addressSecInpt).toHaveAttribute('placeholder', contactForm.addressSecond.input);
    await expect(addContact.contactForm.postalCodeInpt).toHaveAttribute('placeholder', contactForm.postalCode.input);

    await addContact.footer.contentCheck();
    await addContact.header.contentCheck('addContact');
  });
});
