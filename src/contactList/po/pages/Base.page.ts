import { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await Promise.race([this.page.goto(url, { waitUntil: 'networkidle' }), this.page.waitForTimeout(15 * 1000)]);
  }
}
