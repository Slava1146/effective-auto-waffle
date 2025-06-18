import { ENVs } from '../contactList/data/constants';

export const getEnv = () => {
  switch (process.env.ENV) {
    case 'contactList':
      return ENVs.contactList;
    default:
      return ENVs.contactList;
  }
};
