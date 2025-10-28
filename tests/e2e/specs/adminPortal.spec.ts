import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/adminLoginPage';
import { AdminPortalPage } from '../pages/adminPortalPage';
import { HomePage } from '../pages/homePage';
import { adminCredentials, roomInfo } from '../fixtures/testData';
import { MessagePage } from '../pages/messagesPage';
import { RoomPage } from '../pages/roomPage';

test.beforeEach(async({ page }) => {
    const adminLogin = new AdminLoginPage(page);
    await adminLogin.goTo();
    await adminLogin.login(adminCredentials.valid.username, adminCredentials.valid.password);
    const adminPortal = new AdminPortalPage(page);
    await adminPortal.expectLoggedIn();
});

test.describe('Admin - Portal', () => {
    test.describe.configure({mode: 'parallel'});
    test('TC16 - Deve exibir a pagina de mensagens', async ({ page }) => {
        const adminPortal = new AdminPortalPage(page);
        await adminPortal.openMessages();
        await expect(page).toHaveURL(/admin\/message/);
        const message = new MessagePage(page);
        await expect(message.subjectField).toBeVisible();
    });

    test('TC17 - Deve criar quarto com dados validos', async({ page }) => {
        const adminPortal = new AdminPortalPage(page);
        const roomNum = Math.floor(Math.random() * (1000 - 400 + 1)) + 400;
        await adminPortal.createRoom(roomNum.toString(), roomInfo.valid.Type, roomInfo.valid.accessible,
            roomInfo.valid.price, [roomInfo.valid.roomDetails.amenities1, roomInfo.valid.roomDetails.amenities2]);
        await adminPortal.checkCreatedRoom(roomNum ,roomInfo.valid.Type);
        const roomPage = new RoomPage(page);
        await roomPage.expectCreateRoom( roomInfo.valid.Type, roomInfo.valid.accessible,
            [roomInfo.valid.roomDetails.amenities1, roomInfo.valid.roomDetails.amenities2], roomInfo.valid.price);
        await adminPortal.goTo();
    });

    test('TC18 - Não deve criar quarto com numero invalido', async({ page }) => {
        const adminPortal = new AdminPortalPage(page);
        await adminPortal.createRoom(roomInfo.invalid.roomNumber ,roomInfo.valid.Type, roomInfo.valid.accessible,
            roomInfo.valid.price, [roomInfo.valid.roomDetails.amenities1, roomInfo.valid.roomDetails.amenities2]);
        await adminPortal.expectNumAlert(); 
    });

    test('TC19 - Não deve criar quarto com preço negativo', async({ page }) => {
        const adminPortal = new AdminPortalPage(page);
        await adminPortal.createRoom(roomInfo.valid.roomNumber, roomInfo.valid.Type, roomInfo.valid.accessible,
            roomInfo.invalid.price, [roomInfo.valid.roomDetails.amenities1, roomInfo.valid.roomDetails.amenities2]);
        await adminPortal.expectPriceAlert(); 
    });

    test('TC20 - logout com sucesso', async ({ page }) => {
        const adminPortal = new AdminPortalPage(page);
        await adminPortal.logOut();
        const home = new HomePage(page);
        await home.expectLoggedOut();
    });
});