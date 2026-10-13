import { Page} from '@playwright/test';

export class loginPage {
    constructor(private page: Page) {};

    async navigateToLogin() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await this.page.waitForLoadState();
    }

    async login(username: string, password: string) {
        await this.page.locator("//input[@placeholder='Username']").fill(username);
        await this.page.locator("input[placeholder='Password']").fill(password);
        await this.page.locator('button:has-text("Login")').click();
    } 
}
