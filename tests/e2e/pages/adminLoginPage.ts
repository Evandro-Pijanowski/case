import { Page, expect, Locator } from '@playwright/test';

export class AdminLoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly logoutButton: Locator;
    readonly errorAlert: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Login' })
        this.logoutButton = page.getByRole('button', { name: 'Logout' })
        this.errorAlert = page.getByText('Invalid credentials');
    }

    async goTo() {
        await this.page.goto('https://automationintesting.online/admin');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async expectLoginError() {
        await expect(this.errorAlert).toBeVisible();
    }
}
