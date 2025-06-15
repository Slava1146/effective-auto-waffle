import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';

export class AddContactPage extends BasePage {
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

  constructor(
    page: Page,
    readonly url: string = '/addContact',
  ) {
    super(page);
    this.submitBtn = this.page.locator('#submit');
    this.cancelBtn = this.page.locator('#cancel');
    this.fNameLbl = this.page.locator('label[for="firstName"]');
    this.fNameInpt = this.page.locator('#firstName');
    this.lNameLbl = this.page.locator('label[for="lastName"]');
    this.lNameInpt = this.page.locator('#lastName');
    this.birthLbl = this.page.locator('label[for="birthdate"]');
    this.birthInpt = this.page.locator('#birthdate');
    this.emailLbl = this.page.locator('label[for="email"]');
    this.emailInpt = this.page.locator('#email');
    this.phoneLbl = this.page.locator('label[for="phone"]');
    this.phoneInpt = this.page.locator('#phone');
    this.addressFstLbl = this.page.locator('label[for="street1"]');
    this.addressFstInpt = this.page.locator('#street1');
    this.addressSecLbl = this.page.locator('label[for="street2"]');
    this.addressSecInpt = this.page.locator('#street2');
    this.cityLbl = this.page.locator('label[for="city"]');
    this.cityInpt = this.page.locator('#city');
    this.stateLbl = this.page.locator('label[for="stateProvince"]');
    this.stateInpt = this.page.locator('#stateProvince');
    this.postalCodeLbl = this.page.locator('label[for="postalCode"]');
    this.postalCodeInpt = this.page.locator('#postalCode');
    this.countryLbl = this.page.locator('label[for="country"]');
    this.countryInpt = this.page.locator('#country');
  }

  async goto(url = this.url) {
    await super.goto(url);
  }
}
