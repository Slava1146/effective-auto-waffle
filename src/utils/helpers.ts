import { Page, TestInfo } from '@playwright/test';

export async function addScreenshot(page: Page, testInfo: TestInfo, screenshotName: string): Promise<void> {
  const creenshotPath = 'playwright-report/data/';
  const screenshot = await page.screenshot({ path: creenshotPath + screenshotName });
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
}

export function rowData(data: TContactData): Array<string> {
  return [
    `${data.firstName} ${data.lastName}`,
    data.birthdate,
    data.email,
    data.phone,
    `${data.street1} ${data.street2}`,
    `${data.city} ${data.stateProvince} ${data.postalCode}`,
    data.country,
  ];
}
