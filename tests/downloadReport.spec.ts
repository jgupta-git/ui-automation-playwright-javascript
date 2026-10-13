import { test, expect, Page, BrowserContext } from '@playwright/test';
import { TestData } from '../src/services/input';
import { loginPage } from '../src/pages/login';
import { downloadReportPage } from '../src/pages/downloadReport';

test('@positive - Download Report', async ({ page }) => {
  const loginPageInstance = new loginPage(page);
  const downloadReportPageInstance = new downloadReportPage(page);

  //Login to HRM application using valid credentials
  await loginPageInstance.navigateToLogin();
  await loginPageInstance.login(TestData.VALID_USER.username, TestData.VALID_USER.password);

  // Navigate to the Reports page and view a specific report
  await downloadReportPageInstance.navigateToReports();
  await downloadReportPageInstance.viewReport();

  // Export the report as a PDF
  const pdf =await downloadReportPageInstance.exportAsPDF();
  expect(pdf).toBeTruthy();

});
