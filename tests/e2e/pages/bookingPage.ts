import { Locator, Page, expect } from '@playwright/test';

export class BookingPage {
    readonly roomSelect: Locator;
    readonly bookButton: Locator;
    readonly confirmationMessage: Locator;
    readonly errorAlert: Locator;
    readonly price: Locator;

    constructor(private page: Page) {
        this.roomSelect = this.page.locator('select[name="room"]');
        this.bookButton = this.page.getByRole('button', { name: 'Reserve Now' });
        this.confirmationMessage = this.page.locator('.booking-confirmation');
        this.price = this.page.getByText('Total£-');
        this.errorAlert = this.page.getByRole('alert');
    } 

  async submitBooking(name: string, lastName: string, email: string, phone: string) {
    await this.bookButton.click();
    await this.page.getByRole('textbox', { name: 'Firstname' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Lastname' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Phone' }).fill(phone);
    await this.page.keyboard.press('Home');
    await this.page.getByRole('button', { name: 'Reserve Now' }).click();
  }

  async expectBookingConfirmedMessage() {
    await this.page.keyboard.press('Home');
    await expect(this.page.getByRole('heading', { name: 'Booking Confirmed' })).toBeVisible();
  }

  async expectBookingError(erro: string) {
    await this.page.keyboard.press('Home');
    if(erro === 'name')
      await expect(this.page.getByText('Firstname should not be blank')).toHaveText('Firstname should not be blank');
    else if (erro === 'lastName')
      await expect(this.page.getByText('Lastname should not be blank')).toHaveText('Lastname should not be blank');
    else if (erro === 'email')
       await expect(this.page.getByText('must be a well-formed email address')).toHaveText('must be a well-formed email address');
  }
}
