export const errors = {
  loginPage: {
    invalidCredentials: 'Incorrect username or password',
  },
};

export const footer = {
  header: 'Created by Kristin Jackvony, Copyright 2021',
  logo: '/img/thinkingTesterLogo.png',
};

export const header = {
  logoutBtn: 'Logout',
  pageHeading: {
    login: 'Contact List App',
    list: 'Contact List',
    addContact: 'Add Contact',
    editContact: 'Edit Contact',
    contactDetails: 'Contact Details',
  },
};

export const loginPage = {
  welcomeMsg:
    'Welcome! This application is for testing purposes only. The database will be purged as needed to keep costs down.',
  apiInfoMsg: 'The API documentation can be found here.',
  linkToApi: 'https://documenter.getpostman.com/view/4012288/TzK2bEa8',
  loginForm: {
    heading: 'Log In:',
    emailInpt: 'Email',
    passInpt: 'Password',
    submitBtn: 'Submit',
    signUpHeading: 'Not yet a user? Click here to sign up!',
    signUpBtn: 'Sign up',
  },
};

export const contactTableHeader = [
  'Name',
  'Birthdate',
  'Email',
  'Phone',
  'Address',
  'City, State/Province, Postal Code',
  'Country',
];

export const contactPage = {
  subHeading: 'Click on any contact to view the Contact Details',
  addBtn: 'Add a New Contact',
};

export const contactForm = {
  fistName: {
    label: /First Name:/,
    input: 'First Name',
  },
  lastName: {
    label: /Last Name:/,
    input: 'Last Name',
  },
  birthDay: {
    label: 'Date of Birth:',
    input: 'yyyy-MM-dd',
  },
  email: {
    label: 'Email:',
    input: 'example@email.com',
  },
  phone: {
    label: 'Phone:',
    input: '8005551234',
  },
  addressFirst: {
    label: 'Street Address 1:',
    input: 'Address 1',
  },
  addressSecond: {
    label: 'Street Address 2:',
    input: 'Address 2',
  },
  city: {
    label: 'City:',
    input: 'City',
  },
  state: {
    label: 'State or Province:',
    input: 'State or Province',
  },
  postalCode: {
    label: 'Postal Code:',
    input: 'Postal Code',
  },
  country: {
    label: 'Country:',
    input: 'Country',
  },
  submitBtn: 'Submit',
  cancelBtn: 'Cancel',
};
