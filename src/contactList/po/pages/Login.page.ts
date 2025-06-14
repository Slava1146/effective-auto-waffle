import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './Base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;

  readonly passInput: Locator;

  readonly submitBtn: Locator;

  readonly loginEr: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator('#email');
    this.passInput = this.page.locator('#password');
    this.submitBtn = this.page.locator('#submit');
    this.loginEr = this.page.locator('#error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async defaultElVisibilityCheck(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passInput).toBeVisible();
    await expect(this.submitBtn).toBeVisible();
  }

  async login(login: string, password: string): Promise<void> {
    await this.emailInput.fill(login);
    await this.passInput.fill(password);
    await this.submitBtn.click();
  }
}
