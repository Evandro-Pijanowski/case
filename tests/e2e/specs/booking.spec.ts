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

test.describe('Booking tests', async () =>{
   test('Booking - reserva com sucesso', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();  
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.valid.name, userData.valid.lastName, userData.valid.email, userData.valid.phone);
    await booking.expectBookingConfirmedMessage();
    await home.clickAdmin();
    const adminLogin = new AdminLoginPage(page);
    await adminLogin.login(adminCredentials.valid.username, adminCredentials.valid.password);
    const admin = new AdminPortalPage(page);
    await admin.openMessages();

  });

  test('Booking - data valida check availability', async({ page }) => {
    const home = new HomePage(page);
    await home.fillDates(bookingDates.valid.checkIn, bookingDates.valid.checkOut);
    await home.checkAvailability();
    await home.selectSingleRoom();
    const booking = new BookingPage(page);
    await expect(page.getByText(bookingDates.numberOfNights.single)).toBeVisible();
  });

  test('Booking - data invalida', async({ page }) => {
    const home = new HomePage(page);
    await home.fillDates(bookingDates.invalid.checkIn, bookingDates.invalid.checkOut);
    await home.checkAvailability();
    await home.selectSingleRoom();
    const booking = new BookingPage(page);
    await expect(booking.price).not.toHaveText('£-');

  });

  test('Booking - erro nome em branco', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.invalid.name, userData.valid.lastName, userData.valid.email, userData.valid.phone);
    await booking.expectBookingError('name');
  });

  test('Booking - erro email invalido', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.valid.name, userData.valid.lastName, userData.invalid.email, userData.valid.phone);
    await booking.expectBookingError('email');
  });

  test('Booking - erro sobrenome invalido', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();
    const booking = new BookingPage(page);
    await home.selectSingleRoom();
    await booking.submitBooking(userData.valid.name, userData.invalid.lastName, userData.valid.email, userData.valid.phone);
    await booking.expectBookingError('lastName');
  });
})
 