import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { ContactForm } from '../components/contactForm';
import { URL_PATH } from '../../data/constants';

export class ContactDetailsPage extends BasePage {
  readonly editBtn: Locator;

  readonly deleteBtn: Locator;

  readonly backToListBtn: Locator;

  readonly contactForm: ContactForm;

  constructor(
    page: Page,
    readonly url: string = URL_PATH.contactList.pages.CONTACT_DETAILS_PAGE_URL,
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

  async confirmPopup(action: TPopup): Promise<void> {
    switch (action) {
      case 'accept':
        this.page.on('dialog', dialog => dialog.accept());
        await this.deleteBtn.click();
        break;
      case 'decline':
        this.page.on('dialog', dialog => dialog.dismiss());
        await this.deleteBtn.click();
        break;
      default:
        throw new Error('No valid option was provided.');
    }
  }
}
