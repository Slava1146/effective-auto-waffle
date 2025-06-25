import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './Base.page';
import { contactPage } from '../../data/textData';
import { ContactListTable } from '../components/contacListTable';
import { URL_PATH } from '../../data/constants';
import { rowData } from 'utils/helpers';

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

  async rowDataChek(data: TContactData): Promise<void> {
    const rowDataArr = rowData(data);
    const rowNumber = await this.table.findRowNumberByName(rowDataArr[0]);

    for (let i = 0; i < (await this.table.header.count()); i++) {
      await expect(
        this.table.row
          .nth(rowNumber)
          .locator('td')
          .nth(i + 1),
      ).toHaveText(rowDataArr[i]);
    }
  }
}
