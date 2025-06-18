import { defineConfig } from '@playwright/test';
import { getEnv } from './src/utils/env';
import * as dotenv from 'dotenv';

dotenv.config();

const { url } = getEnv();

export default defineConfig({
  // testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: url,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'contactListSetupUi',
      testMatch: 'auth.cl.ui.setup.ts',
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
      },
      dependencies: ['contactListSetupUi'],
    },
    {
      name: 'contactListSetupApi',
      testMatch: 'auth.cl.api.setup.ts',
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
      },
      dependencies: ['contactListSetupApi'],
    },
  ],
  timeout: 90 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
});
