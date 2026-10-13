import { Page } from '@playwright/test';

export class checkEmployeeDashboardPage {

    constructor(private page: Page) { };


    // Verify the profile picture is displayed
    async profileImage(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');
        return this.page.locator('img.oxd-userdropdown-img[alt="profile picture"]').isVisible();
        //return this.page.getByRole('img', { name: 'profile picture' }).isVisible();
    }

    // Verify the employee name is displayed
    async findEmployeeName(firstName: string, lastName: string): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');
        //const employeeName = this.page.locator(`p:has-text("${firstName} ${lastName}")`);
        const employeeName = this.page.locator('p.oxd-userdropdown-name', { hasText: `${firstName} ${lastName}` });
        return employeeName.isVisible();
    }

}
