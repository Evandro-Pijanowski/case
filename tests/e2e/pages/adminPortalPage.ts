import { Page, expect, Locator } from '@playwright/test';

export class AdminPortalPage {
    readonly page: Page;
    readonly roomsDash: Locator;
    readonly messagesTab: Locator;
    readonly brandingTab: Locator
    readonly messageRows: Locator;
    readonly logOutButton: Locator;
    readonly roomNumField: Locator;
    readonly roomTypeField: Locator;
    readonly roomAccesField: Locator;
    readonly roomPriceField: Locator;
    readonly createRoomButton: Locator;
    readonly roomNumAlertMessage: Locator;
    readonly roomPriceAlertMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.roomsDash = this.page.getByText('Room  ');
        this.messagesTab = this.page.getByRole('link', { name: 'Messages' });
        this.messageRows = this.page.locator('.message-row');
        this.brandingTab = this.page.getByRole('link', { name: 'Branding' });
        this.logOutButton = this.page.getByRole('button', { name: 'Logout' });
        this.roomNumField = this.page.getByTestId('roomName');
        this.roomTypeField = this.page.locator('div').filter({ hasText: /^SingleTwinDoubleFamilySuite$/ });
        this.roomAccesField = this.page.locator('#accessible');
        this.roomPriceField = this.page.locator('#roomPrice');
        this.createRoomButton = this.page.getByRole('button', { name: 'Create' });
        this.roomNumAlertMessage = this.page.locator('div').filter({ hasText: /^Room name must be set$/ });
        this.roomPriceAlertMessage = this.page.locator('div').filter({ hasText: /^must be greater than or equal to 1$/ });
    }

     async goTo() {
        await this.page.goto('https://automationintesting.online/admin/rooms');
    }

    async expectLoggedIn() {
        await expect(this.page.getByRole('link', { name: 'Branding' })).toBeVisible();
    }

    async openMessages() {
        await this.messagesTab.click();
    }

    async expectMessageWithText(content: string) {
        await expect(this.messageRows).toContainText(content);
    }

    async createRoom(roomNum:string, roomType: string, roomAccess: string,
        roomPrice: string, roomDetails: string[]) {
            await this.roomNumField.fill(roomNum);
            await this.page.locator('#type').selectOption(roomType);
            await this.roomAccesField.selectOption(roomAccess);
            await this.roomPriceField.fill(roomPrice);
            for(const details of roomDetails){
                let roomDetailsBox = this.page.getByRole('checkbox', { name: details });
                await roomDetailsBox.click();
            }
            await this.createRoomButton.click();
    }

    async checkCreatedRoom(roomType: string){
           await this.page.locator('div').filter({ hasText: /^400$/ }).click();
           await this.page.getByText(roomType).isVisible();
    }

    async expectNumAlert(){
        await expect(this.roomNumAlertMessage).toBeEnabled();
    }

    async expectPriceAlert(){
        await expect(this.roomPriceAlertMessage).toBeEnabled();
    }

    async logOut(){
        await this.logOutButton.click();
    }
}
