import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';

export class ContactListPage extends BasePage {
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutBtn = this.page.locator('.logout');
  }

  async goto() {
    await this.page.goto('/contactlist');
  }
}
