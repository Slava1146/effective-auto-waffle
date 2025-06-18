export const CONTACT_LIST_USER = {
  user: process.env.CONTACT_LIST_USER as string,
  userLogin: process.env.CONTACT_LIST_USER_LOGIN as string,
  password: process.env.CONTACT_LIST_PASS as string,
};

export const ENVs = {
  contactList: {
    url: 'https://thinking-tester-contact-list.herokuapp.com/',
  },
};

export const URL_PATH = {
  contactList: {
    pages: {
      CONTACT_LIST_PAGE_URL: '/contactList',
      ADD_CONTACT_PAGE_URL: '/addContact',
      EDIT_CONTACT_PAGE_URL: '/editContact',
      CONTACT_DETAILS_PAGE_URL: '/contactDetails',
      LOGIN_PAGE: '/',
    },
    api: {
      login: 'users/login',
      addContact: 'contacts',
      updateContact: 'contacts/',
      getContact: 'contacts/',
      getContactList: 'contacts',
      deleteContact: 'contacts/',
    },
  },
};
