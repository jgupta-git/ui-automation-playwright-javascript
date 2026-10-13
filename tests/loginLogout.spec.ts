import { test, expect, Page, BrowserContext } from '@playwright/test';
import { TestData } from '../src/services/input';
import { loginPage } from '../src/pages/login';
import { logoutPage } from '../src/pages/logout';

test('@negative - Login and Logout', async ({ page }) => {
  const loginPageInstance = new loginPage(page);

  //Login to HRM application using valid credentials
  await loginPageInstance.navigateToLogin();
  await loginPageInstance.login(TestData.VALID_USER.username, TestData.VALID_USER.password);

  // Logout from the application
  const logoutPageInstance = new logoutPage(page);
  await logoutPageInstance.navigateToLogout();

  // Verify that the user is redirected to the login page after logout
  await expect(page).toHaveURL(/login/);

});
test ('@negative - Invalid Login', async ({ page }) => {
  const loginPageInstance = new loginPage(page);

  //Login to HRM application using invalid credentials
  await loginPageInstance.navigateToLogin();
  await loginPageInstance.login(TestData.INVALID_USER.username, TestData.INVALID_USER.password);
  await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');

});