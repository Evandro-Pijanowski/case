import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/adminLoginPage';
import { AdminPortalPage } from '../pages/adminPortalPage';
import { adminCredentials } from '../fixtures/testData';

test.describe('Teste da pagina Login Admin', () => {
    test('Admin - login com sucesso', async ({ page }) => {
    const admin = new AdminLoginPage(page);
    await admin.goTo();
    await admin.login(adminCredentials.valid.username, adminCredentials.valid.password);
    const admPortal = new AdminPortalPage(page);
    await admPortal.expectLoggedIn();
    });

    test('Admin - login inválido', async ({ page }) => {
    const admin = new AdminLoginPage(page);
    await admin.goTo();
    await admin.login(adminCredentials.invalid.username, adminCredentials.invalid.password);
    await admin.expectLoginError();
    });

    test('Admin - logout', async ({ page }) => {
    const admin = new AdminLoginPage(page);
    await admin.goTo();
    await admin.login(adminCredentials.valid.username, adminCredentials.valid.password);
    const admPortal = new AdminPortalPage(page);
    await admPortal.expectLoggedIn();
    await admin.logoutButton.click();
    await expect(page).toHaveURL(/admin\/rooms/);
    });
});
