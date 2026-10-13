import { Page } from '@playwright/test';

export class searchEmployeePage {

  constructor(private page: Page) { };

  async navigateToEmployeeRecord() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.waitForLoadState();
  }

  async fillEmployeeDetailsToSearch(firstName: string) {
    // First Name to search
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(firstName);
    // Click on Search button
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyEmployeeFound(firstName: string, lastName: string): Promise<boolean> {
    try {
      await this.page.waitForLoadState('networkidle');

      // Check if "Record Found" message appears
      const recordFound = await this.page.locator('div').filter({ hasText: /Record Found/ }).first().isVisible();

      if (!recordFound) {
        console.log('❌ No record found message displayed');
        return false;
      }

      // Get firstName from 3rd column
    const tableFirstName = await this.page
      .locator("div.oxd-table-body > div > div > div:nth-child(3) > div")
      .textContent();

    // Get lastName from 4th column
    const tableLastName = await this.page
      .locator("div.oxd-table-body > div > div > div:nth-child(4) > div")
      .textContent();

      // Compare with expected values
      if (tableFirstName?.trim() === firstName && tableLastName?.trim() === lastName) {
        console.log(`✓ Employee found: ${firstName} ${lastName}`);
        return true;
      } else {
        console.log(`❌ Expected: ${firstName} ${lastName}, Found: ${tableFirstName} ${tableLastName}`);
        return false;
      }
    } catch (error) {
      console.log('❌ Error verifying employee:', error);
      return false;
    }
  }
}
