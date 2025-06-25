import { Page, TestInfo } from '@playwright/test';

export async function addScreenshot(page: Page, testInfo: TestInfo, screenshotName: string): Promise<void> {
  const creenshotPath = 'playwright-report/data/';  
  const screenshot = await page.screenshot({ path: creenshotPath + screenshotName });
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
}
