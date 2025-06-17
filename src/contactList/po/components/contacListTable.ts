import { Locator, Page, expect } from '@playwright/test';
import { contactTableHeader } from '../../data/textData';

export class ContactListTable {
  readonly header: Locator;

  readonly row: Locator;

  constructor(page: Page) {
    this.header = page.locator('.contactTableHead th');
    this.row = page.locator('tr.contactTableBodyRow');
  }

  async tableHeaderCheck(): Promise<void> {
    for (let i = 0; i < (await this.header.count()); i++) {
      await expect(this.header.nth(i)).toHaveText(contactTableHeader[i]);
    }
  }

  async findRowNumberByName(name: string): Promise<number> {
    let number;
    await this.row.first().waitFor({ state: 'visible' });
    for (let i = 0; i < (await this.row.count()); i++) {
      const nameInTheRow = await this.row.nth(i).locator('td').nth(1).innerText();

      if (name === nameInTheRow) {
        number = i;
        break;
      }
    }
    return number;
  }
}
