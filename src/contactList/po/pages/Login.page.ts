import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;

  readonly passInput: Locator;

  readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator('#email');
    this.passInput = this.page.locator('#password');
    this.submitBtn = this.page.locator('#submit');
  }

  async goto() {
    await this.page.goto('/');
  }
}
