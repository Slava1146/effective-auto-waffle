import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { ContactForm } from '../components/contactForm';

export class ContactDetailsPage extends BasePage {
  readonly editBtn: Locator;

  readonly deleteBtn: Locator;

  readonly backToListBtn: Locator;

  readonly contactForm: ContactForm;

  constructor(
    page: Page,
    readonly url: string = '/contactDetails',
  ) {
    super(page);
    this.editBtn = this.page.locator('#edit-contact');
    this.deleteBtn = this.page.locator('#delete');
    this.backToListBtn = this.page.locator('#return');
    this.contactForm = new ContactForm(page);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
