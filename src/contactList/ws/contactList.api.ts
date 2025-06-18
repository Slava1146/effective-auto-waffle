import { Page, expect } from '@playwright/test';
import { URL_PATH } from '../data/constants';

export class ContactListAPI {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async createContact(data: object): Promise<TContactData> {
    const response = await this.page.request.post(URL_PATH.contactList.api.addContact, { data: data });
    expect(response.status()).toEqual(201);
    const responseBody = await response.text();

    return JSON.parse(responseBody);
  }

  async getContact(contactId: string) {
    const response = await this.page.request.get(URL_PATH.contactList.api.getContact + contactId);
    const statusCode = response.status();
    const responseBody = await response.text();
    switch (statusCode) {
      case 200:
        return JSON.parse(responseBody);
      case 404:
        return responseBody;
      default:
        throw new Error('No valid option was provided');
    }
  }

  async upadateContactPart(contactId: string, data: object): Promise<TContactData> {
    const response = await this.page.request.patch(URL_PATH.contactList.api.updateContact + contactId, { data: data });
    expect(response.status()).toEqual(200);
    const responseBody = await response.text();

    return JSON.parse(responseBody);
  }

  async upadateContact(contactId: string, data: object): Promise<TContactData> {
    const response = await this.page.request.put(URL_PATH.contactList.api.updateContact + contactId, { data: data });
    expect(response.status()).toEqual(200);
    const responseBody = await response.text();

    return JSON.parse(responseBody);
  }

  async deleteContact(contactId: string): Promise<string> {
    const response = await this.page.request.delete(URL_PATH.contactList.api.deleteContact + contactId);
    expect(response.status()).toEqual(200);
    const responseBody = await response.text();

    return responseBody;
  }

  async checkContactData(actualData: TContactData, expectedData: TContactData): Promise<void> {
    expect(actualData.firstName).toEqual(expectedData.firstName);
    expect(actualData.lastName).toEqual(expectedData.lastName);
    expect(actualData.email).toEqual(expectedData.email);
    expect(actualData.birthdate).toEqual(expectedData.birthdate);
    expect(actualData.phone).toEqual(expectedData.phone);
    expect(actualData.city).toEqual(expectedData.city);
    expect(actualData.country).toEqual(expectedData.country);
    expect(actualData.postalCode).toEqual(expectedData.postalCode);
    expect(actualData.street1).toEqual(expectedData.street1);
    expect(actualData.street2).toEqual(expectedData.street2);
    expect(actualData.stateProvince).toEqual(expectedData.stateProvince);
  }
}
