import { Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { ContactForm } from '../components/contactForm';

export class EditContactPage extends BasePage {
  readonly contactForm: ContactForm;

  constructor(
    page: Page,
    readonly url: string = '/editContact',
  ) {
    super(page);
    this.contactForm = new ContactForm(page);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
