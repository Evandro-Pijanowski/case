import { Page, expect, Locator } from '@playwright/test';

export class MessagePage{
    readonly page: Page;
    readonly subjectField: Locator;

    constructor(page: Page){
        this.page = page;
        this.subjectField = page.getByText('Subject');
    }
    async goTo() {
        await this.page.goto('https://automationintesting.online/admin/messages');
    }
}