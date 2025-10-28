import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { BookingPage } from '../pages/bookingPage';
import { userData, bookingDates, adminCredentials} from '../fixtures/testData';
import { AdminLoginPage } from '../pages/adminLoginPage';
import { AdminPortalPage } from '../pages/adminPortalPage';

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.goTo();
});

test.describe('Booking - Reservas', async () =>{
   test.describe.configure({mode: 'parallel'});
   test('TC08 - Deve reservar com sucesso', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();  
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.valid.name, userData.valid.lastName, userData.valid.email, userData.valid.phone);
    const response = await page.waitForResponse((res) => res.status()===200);
    const responseBody = await response.json();
    expect(response.status()).toBe('200');
    expect(responseBody.firstname).toBe(userData.valid.name);
    expect(responseBody.lastname).toBe(userData.valid.lastName);
    await booking.expectBookingConfirmedMessage();
    await home.clickAdmin();
    const adminLogin = new AdminLoginPage(page);
    await adminLogin.login(adminCredentials.valid.username, adminCredentials.valid.password);
    const admin = new AdminPortalPage(page);
    await admin.openMessages();

  });

  test('TC09 - Deve checar disponibilidade com data valida', async({ page }) => {
    const home = new HomePage(page);
    await home.fillDates(bookingDates.valid.checkIn, bookingDates.valid.checkOut);
    await home.checkAvailability();
    await home.selectSingleRoom();
    const booking = new BookingPage(page);
    await expect(page.getByText(bookingDates.numberOfNights.single)).toBeVisible();
  });

  test('TC10 - Não deve permitir data de Check In posterior a de Check Out', async({ page }) => {
    const home = new HomePage(page);
    await home.fillDates(bookingDates.invalid.checkIn, bookingDates.invalid.checkOut);
    await home.checkAvailability();
    await home.selectSingleRoom();
    const booking = new BookingPage(page);
    await expect(booking.price).not.toHaveText('£-');

  });

  test('TC11 - Não deve permitir nome em branco', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.invalid.name, userData.valid.lastName, userData.valid.email, userData.valid.phone);
    await booking.expectBookingError('name');
  });

  test('TC12 - Não deve permitir email inválido', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.valid.name, userData.valid.lastName, userData.invalid.email, userData.valid.phone);
    await booking.expectBookingError('email');
  });

  test('TC13 - Não deve permitir sobrenome inválido', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.valid.name, userData.invalid.lastName, userData.valid.email, userData.valid.phone);
    await booking.expectBookingError('lastName');
  });
})
 