import { Locator, Page, expect } from '@playwright/test';
import { footer } from '../../data/textData';

export class Footer {
  readonly author: Locator;

  readonly logo: Locator;

  constructor(page: Page) {
    this.author = page.locator('footer > p');
    this.logo = page.locator('footer > img');
  }

  async contentCheck(): Promise<void> {
    await expect(this.author).toBeVisible();
    await expect(this.author).toHaveText(footer.header);
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toHaveAttribute('src', footer.logo);
  }
}
