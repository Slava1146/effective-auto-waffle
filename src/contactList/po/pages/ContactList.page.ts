import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './Base.page';
import { contactPage } from '../../data/textData';
import { ContactListTable } from '../components/contacListTable';
import { URL_PATH } from '../../data/constants';

export class ContactListPage extends BasePage {
  readonly addContactBtn: Locator;

  readonly table: ContactListTable;

  constructor(
    page: Page,
    readonly url: string = URL_PATH.contactList.pages.CONTACT_LIST_PAGE_URL,
  ) {
    super(page);
    this.addContactBtn = this.page.locator('#add-contact');
    this.table = new ContactListTable(page);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async defaultElVisibilityCheck(): Promise<void> {
    await expect(this.addContactBtn).toBeVisible();
    await expect(this.addContactBtn).toHaveText(contactPage.addBtn);
    await expect(this.table.header.first()).toBeVisible();
    await this.table.tableHeaderCheck();
  }
}
