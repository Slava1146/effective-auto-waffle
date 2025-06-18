import { expect } from '@playwright/test';
import { test } from '../po';
import { generateAlphanumericString } from '../../utils/strings';
import { readJson } from '../../utils/readJson';

const contactData = readJson('./src/contactList/data/contactData.json');

const RANDOM_STRING = generateAlphanumericString(8);

const partUpdate = {
    firstName: `${contactData.firstName}_${RANDOM_STRING}`,
}

test.describe('API E2E test', () => {
  test('Create, read, update, delete contact', async ({ contactListApi }) => {
    const newContact = await contactListApi.createContact(contactData);
    const contactId = newContact._id;

    await contactListApi.checkContactData(contactData, newContact);

    let getContact = await contactListApi.getContact(contactId);

    await contactListApi.checkContactData(contactData, getContact);

    await contactListApi.upadateContactPart(contactId, partUpdate);

    getContact = await contactListApi.getContact(contactId);

    expect(getContact.firstName).toEqual(partUpdate.firstName);

    await contactListApi.upadateContact(contactId, contactData);

    getContact = await contactListApi.getContact(contactId);

    await contactListApi.checkContactData(contactData, getContact);

    await contactListApi.deleteContact(contactId);

    getContact = await contactListApi.getContact(contactId);

    expect(getContact).toEqual('');
  });
});
