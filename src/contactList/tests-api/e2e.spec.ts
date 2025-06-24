import { expect } from '@playwright/test';
import { test } from '../po';
import { generateAlphanumericString } from '../../utils/strings';
import { readJson } from '../../utils/readJson';

const contactData = readJson('./src/contactList/data/contactData.json');

const RANDOM_STRING = generateAlphanumericString(8);

const partUpdate = {
  firstName: `${contactData.firstName}_${RANDOM_STRING}`,
};

let contactId: string;

test.describe('API E2E tests', {tag: '@smoke'}, () => {
  let newContact: TContactData;

  test.beforeEach(async ({ contactListApi }) => {
    newContact = await contactListApi.createContact(contactData);
    contactId = newContact._id;
  });

  test.afterEach(async ({ contactListApi }) => {
    if (contactId !== undefined) await contactListApi.deleteContact(contactId);
  });

  test('Create contact', async ({ contactListApi }) => {
    await contactListApi.checkContactData(contactData, newContact);

    const getContact = await contactListApi.getContact(contactId);

    await contactListApi.checkContactData(contactData, getContact);
  });

  test('Contact partial update', async ({ contactListApi }) => {
    await contactListApi.upadateContactPart(contactId, partUpdate);

    const getContact = await contactListApi.getContact(contactId);

    expect(getContact.firstName).toEqual(partUpdate.firstName);
  });

  test('Contact full update', async ({ contactListApi }) => {
    await contactListApi.upadateContact(contactId, contactData);

    const getContact = await contactListApi.getContact(contactId);

    await contactListApi.checkContactData(contactData, getContact);
  });

  test('Delete contact', async ({ contactListApi }) => {
    await contactListApi.deleteContact(contactId);

    const getContact = await contactListApi.getContact(contactId);

    expect(getContact).toEqual('');

    contactId = undefined;
  });
});
