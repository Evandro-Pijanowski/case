import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/adminLoginPage';
import { AdminPortalPage } from '../pages/adminPortalPage';
import { adminCredentials } from '../fixtures/testData';

test.describe('Admin - Login', () => {
    test.describe.configure({mode: 'parallel'});
    test('TC14 - Deve fazer Login com credenciais validas', async ({ page }) => {
    const admin = new AdminLoginPage(page);
    await admin.goTo();
    await admin.login(adminCredentials.valid.username, adminCredentials.valid.password);
    const admPortal = new AdminPortalPage(page);
    await admPortal.expectLoggedIn();
    });

    test('TC15 - Não deve fazer Login com credenciais invalidas', async ({ page }) => {
    const admin = new AdminLoginPage(page);
    await admin.goTo();
    await admin.login(adminCredentials.invalid.username, adminCredentials.invalid.password);
    await admin.expectLoginError();
    });
});
