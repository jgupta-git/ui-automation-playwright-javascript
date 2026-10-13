import { Page } from '@playwright/test';

export class createEmployeePage {

    constructor(private page: Page) {};

    async navigateToEmployeeCreation() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.waitForLoadState();
  }

  async fillEmployeeDetails(firstName: string, lastName: string, username: string, password: string, empId: string) {
    await this.page.locator(':text-is("Add Employee")').click();
    // First Name
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);

    // Last Name
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);

    // Enable Login Credentials
    await this.page.locator('.oxd-switch-input').click();

    // Username
    await this.page.getByRole('textbox').nth(5).fill(username);
    // Password
    const passwordFields = this.page.locator('input[type="password"]');
    await passwordFields.first().fill(password);
    await passwordFields.nth(1).fill(password);

    // Employee ID
    await this.page.getByRole('textbox').nth(4).fill(empId);
  }

   async saveEmployee() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForLoadState();
  }

   async saveEmployeeProfile() {
    await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
    await this.page.waitForLoadState();
  }

  async isSuccessMessageVisible() {
    return await this.page.getByText('Success', { exact: true }).isVisible();
  }
}
