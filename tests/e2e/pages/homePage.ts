import { Page, expect, Locator} from '@playwright/test';

export class HomePage {
    readonly heroSection: Locator;
    readonly contactLink: Locator;
    readonly bookingLink: Locator;
    readonly adminLink: Locator;
    readonly roomsLink: Locator;
    readonly amenitiesLink: Locator;
    readonly locationLink: Locator;
    readonly checkInInput: Locator;
    readonly checkOutInput: Locator;
    readonly checkAvailabilityButton: Locator;


    constructor(private page: Page) {
        this.page = page;
        this.heroSection = page.locator('.hero');
        this.roomsLink = page.locator('#navbarNav').getByRole('link', { name: 'Rooms' });
        this.amenitiesLink = page.getByRole('link', { name: 'Amenities' });
        this.locationLink = page.getByRole('link', { name: 'Location' });
        this.contactLink = page.locator('#navbarNav').getByRole('link', { name: 'Contact' });
        this.bookingLink = page.locator('#navbarNav').getByRole('link', { name: 'Booking' });
        this.adminLink = page.getByRole('link', { name: 'Admin', exact: true });
        this.checkInInput = this.page.getByRole('textbox').first();
        this.checkOutInput = this.page.getByRole('textbox').nth(1);
        this.checkAvailabilityButton = this.page.getByRole('button', { name: 'Check Availability' });
    }
    async goTo() {
        await this.page.goto('https://automationintesting.online/');
    }

    async clickContact() {
        await this.contactLink.click();
    }

    async clickRooms() {
        await this.roomsLink.click();
    }

    async clickAmenities() {
        await this.amenitiesLink.click();
    }

    async clickBooking() {
        await this.bookingLink.click();
    }

    async clickLocation() {
        await this.locationLink.click();
    }     

    async clickAdmin() {
        await this.adminLink.click();
    }

    async validateHeroSectionVisible() {
        await expect(this.heroSection).toBeVisible();
    }

    async expectLoggedOut() {
        await expect(this.bookingLink).toBeVisible();
    }

    async fillDates(checkIn: string, checkOut: string) {
        await this.checkInInput.click();
        await this.checkInInput.fill(checkIn);
        await this.checkOutInput.click();
        await this.checkOutInput.fill(checkOut);
    }

    async selectSingleRoom() {
        await this.page.locator('#navbarNav').getByRole('link', { name: 'Booking' }).click();
        await this.page.getByRole('link', { name: 'Book now' }).nth(1).click();;
    }

    async checkAvailability(){
        await this.checkAvailabilityButton.click();
    }
}