import { Locator, Page, expect } from '@playwright/test';

export class RoomPage {
    //readonly 

    constructor(private page: Page){
        this.page = page;
    }
    async expectCreateRoom(roomType: string, roomAccess: string, roomDetails: string[], roomPrice: string){
        await expect(this.page.getByText(roomType)).toBeVisible();
        await expect(this.page.getByText(roomAccess)).toBeVisible();
        let amenitiesValidation = '';
        for (const details in roomDetails){
            amenitiesValidation = amenitiesValidation.concat(roomDetails[details]);
            amenitiesValidation += ', ';
        }
        amenitiesValidation = amenitiesValidation.slice(0,-2);
        await expect(this.page.getByText(amenitiesValidation)).toBeVisible();
        await expect(this.page.getByText(roomPrice)).toBeVisible();
    }

}