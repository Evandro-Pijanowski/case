import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import fs from 'fs';

test.beforeEach(async({ page }) => {
  const home = new HomePage(page);
  await home.goTo();
});

test.describe('Home - Navegação pagina principal', async () => {
  test.describe.configure({mode: 'parallel'});
  test('TC01 - Deve carregar e exibir seção principal', async ({ page }) => {
    const home = new HomePage(page);
    await home.validateHeroSectionVisible();
  });

  test('TC02 - Deve navegar até a seção Rooms', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickRooms();
    await expect(page.locator('div').filter({ hasText: 'Our RoomsComfortable beds and' }).nth(3)).toBeVisible();
  });

  test('TC03 - Deve navegar até a seção Booking', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickBooking();
    await expect(page).toHaveURL(/#booking/); 
    const buffer = await page.screenshot();
    fs.writeFileSync('tests/e2e/specs/homePage.spec.ts-snapshots/compara.png', buffer)
    expect(await page.screenshot()).toMatchSnapshot('expectedBookingNav.png',{
      maxDiffPixelRatio: 0.1
    });

  });

  test('TC04 - Deve navegar até a seção Amenities', async ({ page }) => {
    const home = new HomePage(page);
    const imageUrl = "https://automationintesting.online/images/rbp-logo.jpg";
    const response = await page.waitForResponse(res => res.url() === imageUrl && res.ok());
    response.finished()
    await home.clickAmenities();
    await expect(page).toHaveURL(/#amenities/);
    home.validateHeroSectionVisible();
    const buffer = await page.screenshot();
    fs.writeFileSync('tests/e2e/specs/homePage.spec.ts-snapshots/compara.png', buffer)
    expect(await page.screenshot()).not.toMatchSnapshot('homePage.png',{
      maxDiffPixelRatio : 0.1
    })
  });

  test('TC05 - Deve navegar até a seção Location', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickLocation();
    await expect(page).toHaveURL(/#location/);
    await expect(page.getByText('Our LocationFind us in the beautiful Newingtonfordburyshire countrysidePigeon')).toBeVisible();
    
  });

  test('TC06 - Deve navegar até a seção Contact', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickContact();
    await expect(page).toHaveURL(/#contact/);
    await expect(page.getByText('Send Us a MessageNameEmailPhoneSubjectMessageSubmit')).toBeVisible();
  });

  test('TC07 - Deve navegar até a seção Admin', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickAdmin();
    await expect(page.locator('div').filter({ hasText: /^UsernamePasswordLogin$/ })).toBeVisible();
  });
});

