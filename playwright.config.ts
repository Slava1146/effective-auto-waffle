import { defineConfig } from '@playwright/test';
import { getEnv } from './src/utils/env';
import { readJson } from './src/utils/readJson';
import * as dotenv from 'dotenv';

dotenv.config();

const { url } = getEnv();

const apiStorage = readJson('./src/contactList/data/states/contactListAuth.json');

const launchName: string = `${process.env.PROJECT_NAME}`;

const RPconfig = {
  apiKey: process.env.RP_GITHUB_KEY,
  endpoint: 'https://reportportal.epam.com/api/v2',
  project: 'viachaslau_charaukhin_personal',
  launch: launchName,
  mode: 'DEFAULT',
  description: 'https://github.com/Slava1146/effective-auto-waffle',
};

const getReporters = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reporter: any[] = [['html', { open: 'never' }], ['list']];

  if (process.env.USE_REPORTPORTAL === 'true') {
    reporter.push(['@reportportal/agent-js-playwright', RPconfig]);
  }

  return reporter;
};

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: getReporters(),
  use: {
    baseURL: url,
    trace: 'on-first-retry',
  },
  timeout: 90 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  projects: [
    {
      name: 'contactListSetupUi',
      testMatch: 'auth.ui.setup.ts',
    },
    {
      name: 'contactListUi',
      testMatch: '**contactList/tests-ui/**/*.spec.ts',
      use: {
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
          omitBackground: true,
        },
        extraHTTPHeaders: {
          Authorization: `Bearer ${apiStorage.cookies[0].value}`,
        },
      },
      dependencies: ['contactListSetupUi'],
    },
    {
      name: 'contactListSetupApi',
      testMatch: 'auth.api.setup.ts',
    },
    {
      name: 'contactListApi',
      testMatch: '**contactList/tests-api/**/*.spec.ts',
      use: {
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
          omitBackground: true,
        },
        extraHTTPHeaders: {
          Authorization: `Bearer ${apiStorage.cookies[0].value}`,
        },
      },
      dependencies: ['contactListSetupApi'],
    },
  ],
});
