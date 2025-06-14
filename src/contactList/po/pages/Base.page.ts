import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly rootEl: Locator;
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.rootEl = page.locator('.main-content');
  }
}
