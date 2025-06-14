import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './Base.page';

export class LoginPage extends BasePage {
  readonly emailInpt: Locator;

  readonly passInpt: Locator;

  readonly submitBtn: Locator;

  readonly loginEr: Locator;

  readonly pageHeading: Locator;

  readonly formHeading: Locator;

  readonly signUpHeading: Locator;

  readonly signUpBtn: Locator;

  readonly welcomeMsg: Locator;

  readonly apiInfoMsg: Locator;

  readonly linkToApi: Locator;

  constructor(
    page: Page,
    readonly url: string = '/',
  ) {
    super(page);
    this.emailInpt = this.page.locator('#email');
    this.passInpt = this.page.locator('#password');
    this.submitBtn = this.page.locator('#submit');
    this.loginEr = this.page.locator('#error');
    this.pageHeading = this.page.locator('h1');
    this.formHeading = this.page.locator('.main-content > p:first-child');
    this.signUpHeading = this.page.locator('.main-content > p').last();
    this.signUpBtn = this.page.locator('#signup');
    this.welcomeMsg = this.page.locator('.welcome-message').first();
    this.apiInfoMsg = this.page.locator('.welcome-message').last();
    this.linkToApi = this.page.locator('.welcome-message > a');
  }

  async goto(url = this.url) {
    await super.goto(url);
  }

  async loginFormVisibilityCheck(): Promise<void> {
    await expect(this.emailInpt).toBeVisible();
    await expect(this.passInpt).toBeVisible();
    await expect(this.submitBtn).toBeVisible();
  }

  async login(login: string, password: string): Promise<void> {
    await this.emailInpt.fill(login);
    await this.passInpt.fill(password);
    await this.submitBtn.click();
  }
}
