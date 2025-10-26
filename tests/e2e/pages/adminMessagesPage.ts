import { Page, expect, Locator } from '@playwright/test';
import { userData } from '../fixtures/testData';

export class AdminMessagesPage {
    readonly name: Locator;
    readonly subject: Locator;

    constructor(private page: Page){
        this.page = page;
        const fullName = userData.valid.name+userData.valid.lastName;
        this.name = this.page.getByText(fullName);
        this.subject = this.page.getByText('You have a new booking!');
    }

    async expectBookingMessage(){
        const fullName = userData.valid.name+userData.valid.lastName;
        await expect(this.name).toHaveText(fullName);
        await expect(this.subject).toHaveText('You have a new booking!');
        await this.name.click();
    }
}