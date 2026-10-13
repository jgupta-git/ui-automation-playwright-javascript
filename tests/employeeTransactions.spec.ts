import { test } from '../src/services/employee-test';
import { expect } from '@playwright/test';
import { TestData } from '../src/services/input';
import { createEmployeePage } from '../src/pages/createEmployee';
import { searchEmployeePage } from '../src/pages/searchEmployee';
import { logoutPage } from '../src/pages/logout';
import { loginPage } from '../src/pages/login';
import { uploadEmployeeImagePage } from '../src/pages/uploadEmployeeImage';
import { checkEmployeeDashboardPage } from '../src/pages/checkEmployeeDashboard';
import path from 'path';

test.describe.serial('@positive - Employee Transactions', () => {

  test('createEmployee', async ({ page, employeeData }) => {
    const employeePage = new createEmployeePage(page);
    const loginPageInstance = new loginPage(page);

    //Login to HRM application using valid credentials
    await loginPageInstance.navigateToLogin();
    await loginPageInstance.login(TestData.VALID_USER.username, TestData.VALID_USER.password);

    // Navigate to Employee Creation Page and fill in the employee details
    await employeePage.navigateToEmployeeCreation();
    await employeePage.fillEmployeeDetails(
      employeeData.firstName,
      employeeData.lastName,
      employeeData.username,
      employeeData.password,
      employeeData.id
    );
    // Save the employee and verify success message
    await employeePage.saveEmployee();
    await employeePage.saveEmployeeProfile();

    // Logout from the application
    const logoutPageInstance = new logoutPage(page);
    await logoutPageInstance.navigateToLogout();

    // Verify that the user is redirected to the login page after logout
    await expect(page).toHaveURL(/login/);

  });

  test('searchEmployee', async ({ page, employeeData }) => {
    const searchEmployee = new searchEmployeePage(page);
    const loginPageInstance = new loginPage(page);

    //Login to HRM application using valid credentials
    await loginPageInstance.navigateToLogin();
    await loginPageInstance.login(TestData.VALID_USER.username, TestData.VALID_USER.password);

    // Navigate to Employee Creation Page and fill in the employee details
    await searchEmployee.navigateToEmployeeRecord();

    // Fill in the employee details to search
    await searchEmployee.fillEmployeeDetailsToSearch(employeeData.firstName);

    await page.waitForTimeout(10000); // Wait for 2 seconds to allow search results to load
    await searchEmployee.verifyEmployeeFound(employeeData.firstName, employeeData.lastName);
  });

  test('Upload Employee Image', async ({ page, employeeData }) => {
    const searchEmployee = new searchEmployeePage(page);
    const loginPageInstance = new loginPage(page);
    const uploadEmployeeImageInstance = new uploadEmployeeImagePage(page);

    //Login to HRM application using valid credentials
    await loginPageInstance.navigateToLogin();
    await loginPageInstance.login(TestData.VALID_USER.username, TestData.VALID_USER.password);

    // Navigate to Employee Creation Page and fill in the employee details
    await searchEmployee.navigateToEmployeeRecord();

    // Fill in the employee details to search
    await searchEmployee.fillEmployeeDetailsToSearch(employeeData.firstName);

    await page.waitForTimeout(10000); // Wait for 2 seconds to allow search results to load
    const photoPath = 'C:\\Users\\jigya\\Downloads\\OrangeHRM\\src\\assets\\av1.png';
    await uploadEmployeeImageInstance.uploadEmployeeImage(photoPath);
  });

  test('Login as new employee, check the uploaded image', async ({ page, employeeData }) => {
    const loginPageInstance = new loginPage(page);
    const checkEmployeeDashboardInstance = new checkEmployeeDashboardPage(page);

    //Login to HRM application using valid credentials

    await loginPageInstance.navigateToLogin();
    await loginPageInstance.login(employeeData.username, employeeData.password);
    //await loginPageInstance.login('johndoe86609', 'password123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // Check if the uploaded image is displayed on the employee dashboard
    const checkProfileImage = await checkEmployeeDashboardInstance.profileImage();
    expect(checkProfileImage).toBeTruthy();
    const employeeNameVisible = await checkEmployeeDashboardInstance.findEmployeeName(employeeData.firstName, employeeData.lastName);
    //const employeeNameVisible = await checkEmployeeDashboardInstance.findEmployeeName('John86609', 'Doe86609');
    expect(employeeNameVisible).toBeTruthy();

  });
});