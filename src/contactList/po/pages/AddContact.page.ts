import { Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { ContactForm } from '../components/contactForm';
import { URL_PATH } from '../../data/constants';

export class AddContactPage extends BasePage {
  readonly contactForm: ContactForm;

  constructor(
    page: Page,
    readonly url: string = URL_PATH.contactList.pages.ADD_CONTACT_PAGE_URL,
  ) {
    super(page);
    this.contactForm = new ContactForm(page);
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }
}
