import { Locator, Page, expect } from '@playwright/test';
import { header } from '../../data/textData';

export class Header {
  readonly logoutBtn: Locator;

  readonly heading: Locator;

  constructor(page: Page) {
    this.heading = page.locator('h1');
    this.logoutBtn = page.locator('#logout');
  }

  async contentCheck(pageType: TPage): Promise<void> {
    switch (pageType) {
      case 'login':
        await expect(this.heading).toBeVisible();
        await expect(this.heading).toHaveText(header.pageHeading.login);
        break;
      case 'list':
        await expect(this.heading).toBeVisible();
        await expect(this.logoutBtn).toBeVisible();
        await expect(this.heading).toHaveText(header.pageHeading.list);
        await expect(this.logoutBtn).toHaveText(header.logoutBtn);
        break;
      case 'addContact':
        await expect(this.heading).toBeVisible();
        await expect(this.logoutBtn).toBeVisible();
        await expect(this.heading).toHaveText(header.pageHeading.addContact);
        await expect(this.logoutBtn).toHaveText(header.logoutBtn);
        break;
      default:
        throw Error('No  valid option was provided');
    }
  }
}
