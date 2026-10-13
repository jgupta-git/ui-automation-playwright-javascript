import { Page } from '@playwright/test';

export class logoutPage {
    constructor(private page: Page) {};
    
    async navigateToLogout() {
        await this.page.locator('.oxd-userdropdown-img').click();
        await this.page.getByText('Logout').click();
        await this.page.waitForLoadState(); // Ensure it's fully loaded
    }
}