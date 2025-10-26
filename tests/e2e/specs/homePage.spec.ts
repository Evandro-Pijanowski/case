import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
//import { compareVisualSnapshot } from '../helpers/visualHelper';

test('Home - deve carregar e exibir seção principal', async ({ page }) => {
  const home = new HomePage(page);
  await home.goTo();
  await home.validateHeroSectionVisible();
});

test('Home - deve navegar corretamente entre páginas', async ({ page }) => {
  const home = new HomePage(page);
  await home.goTo();
  await home.clickRooms();
  await expect(page).toHaveURL(/#rooms/);
  await home.clickRooms();
  await expect(page).toHaveURL(/#rooms/);
  await home.clickContact();
  await expect(page).toHaveURL(/#contact/);
  await home.goTo();
  await home.clickBooking();
  await expect(page).toHaveURL(/#booking/);
  await home.goTo();
  await home.clickAdmin();
  await expect(page).toHaveURL(/admin/);
  await page.goBack();
});


