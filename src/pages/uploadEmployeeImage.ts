import { Page } from '@playwright/test';

export class uploadEmployeeImagePage {

    constructor(private page: Page) { };

    async uploadEmployeeImage(imagePath: string): Promise<boolean> {
        try {
            await this.page.waitForLoadState('networkidle');

            // Check if "Record Found" message appears
            const recordFound = await this.page.locator('div').filter({ hasText: /Record Found/ }).first().isVisible();

            if (!recordFound) {
                console.log('❌ No record found message displayed');
                return false;
            }


            // Get edit icon to click on the employee record
            await this.page.locator('div.oxd-table-cell-actions button:nth-child(1)').click();
            await this.page.waitForLoadState('networkidle');

            //click on the profile picture to open the upload dialog
            await this.page.getByRole('img', { name: 'profile picture' }).nth(1).click();

            // Upload the image
            await this.page.locator('button.oxd-icon-button.oxd-icon-button--solid-main.employee-image-action').click();
            await this.page.getByRole('button', { name: 'Choose File' }).setInputFiles(imagePath);
            
            // Click Save button
            await this.page.getByRole('button', { name: 'Save' }).click();

            // Wait for upload to complete
            await this.page.waitForLoadState('networkidle');

            return true;

        } catch (error) {
            console.log('❌ Error uploading employee image:', error);
            return false;
        }
    }
}
