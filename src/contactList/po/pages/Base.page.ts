import { Page } from '@playwright/test';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export abstract class BasePage {
  readonly page: Page;

  readonly footer: Footer;

  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.footer = new Footer(page);
    this.header = new Header(page);
  }

  async goto(url: string): Promise<void> {
    await Promise.race([this.page.goto(url, { waitUntil: 'networkidle' }), this.page.waitForTimeout(15 * 1000)]);
  }
}
