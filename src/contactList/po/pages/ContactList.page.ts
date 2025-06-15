import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './Base.page';
import { contactTableHeader, contactPage } from '../../data/textData';

export class ContactListPage extends BasePage {
  readonly addContactBtn: Locator;

  readonly tableHeader: Locator;

  constructor(
    page: Page,
    readonly url: string = '/contactlist',
  ) {
    super(page);
    this.addContactBtn = this.page.locator('#add-contact');
    this.tableHeader = this.page.locator('.contactTableHead th');
  }

  async goto(url = this.url) {
    await super.goto(url);
  }

  async defaultElVisibilityCheck(): Promise<void> {
    await expect(this.addContactBtn).toBeVisible();
    await expect(this.addContactBtn).toHaveText(contactPage.addBtn);
    await expect(this.tableHeader.first()).toBeVisible();
    for (let i = 0; i < (await this.tableHeader.count()); i++) {
      await expect(this.tableHeader.nth(i)).toHaveText(contactTableHeader[i]);
    }
  }
}
