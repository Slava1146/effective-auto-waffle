import { Locator, Page } from '@playwright/test';

export class ContactForm {
  readonly submitBtn: Locator;

  readonly fNameLbl: Locator;

  readonly fNameInpt: Locator;

  readonly lNameLbl: Locator;

  readonly lNameInpt: Locator;

  readonly birthLbl: Locator;

  readonly birthInpt: Locator;

  readonly emailLbl: Locator;

  readonly emailInpt: Locator;

  readonly phoneLbl: Locator;

  readonly phoneInpt: Locator;

  readonly addressFstLbl: Locator;

  readonly addressFstInpt: Locator;

  readonly addressSecLbl: Locator;

  readonly addressSecInpt: Locator;

  readonly cityLbl: Locator;

  readonly cityInpt: Locator;

  readonly stateLbl: Locator;

  readonly stateInpt: Locator;

  readonly postalCodeLbl: Locator;

  readonly postalCodeInpt: Locator;

  readonly countryLbl: Locator;

  readonly countryInpt: Locator;

  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.submitBtn = page.locator('#submit');
    this.cancelBtn = page.locator('#cancel');
    this.fNameLbl = page.locator('label[for="firstName"]');
    this.fNameInpt = page.locator('#firstName');
    this.lNameLbl = page.locator('label[for="lastName"]');
    this.lNameInpt = page.locator('#lastName');
    this.birthLbl = page.locator('label[for="birthdate"]');
    this.birthInpt = page.locator('#birthdate');
    this.emailLbl = page.locator('label[for="email"]');
    this.emailInpt = page.locator('#email');
    this.phoneLbl = page.locator('label[for="phone"]');
    this.phoneInpt = page.locator('#phone');
    this.addressFstLbl = page.locator('label[for="street1"]');
    this.addressFstInpt = page.locator('#street1');
    this.addressSecLbl = page.locator('label[for="street2"]');
    this.addressSecInpt = page.locator('#street2');
    this.cityLbl = page.locator('label[for="city"]');
    this.cityInpt = page.locator('#city');
    this.stateLbl = page.locator('label[for="stateProvince"]');
    this.stateInpt = page.locator('#stateProvince');
    this.postalCodeLbl = page.locator('label[for="postalCode"]');
    this.postalCodeInpt = page.locator('#postalCode');
    this.countryLbl = page.locator('label[for="country"]');
    this.countryInpt = page.locator('#country');
  }
}
