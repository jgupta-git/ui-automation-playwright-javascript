import { Page } from '@playwright/test';

export class downloadReportPage {

    constructor(private page: Page) { };


    // Navigate to Reports
    async navigateToReports() {
        await this.page.getByRole('link', { name: 'PIM' }).click();
        await this.page.locator('text=Reports').click();
        await this.page.waitForLoadState('networkidle');
    }

    // View the report
    async viewReport() {
        await this.page.locator('button:has(i.bi-file-text-fill)').first().click();
        await this.page.waitForLoadState('networkidle');
    }

    // Export as PDF
    async exportAsPDF() {
        const pdf = await this.page.pdf({ path: 'downloads/report.pdf' });
        return pdf;
    }

}
