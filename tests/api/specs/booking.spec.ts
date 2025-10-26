import { test, expect } from "@playwright/test";
import { generateBooking } from "../utils/bookerJson";
import { validateSchema, bookingSchema } from "../utils/schemaValidator";
import * as bookingData from "../utils/booking.json";

test.describe("POST /booking", ()=>{
    test("TC03 - Criar uma reserva com sucesso", async({ request }) => {
        const response = await request.post("/booking", {
            data : bookingData
        })

        expect (response.status()).toBe(200);
        const body = await response.json();
        expect (body.bookingid).toBeDefined();
        expect(validateSchema(bookingSchema, body.booking)).toBeTruthy();
    });

    test("TC04 - Falhar ao criar reserva com payload vazio", async ({ request }) => {
    const response = await request.post("/booking", { data: {} });
    expect(response.status()).toBe(500);
  });

    test("TC05 - Falhar ao criar reserva com valor da reserva negativo", async({ request }) => {
        const reqBody = generateBooking();
        reqBody.totalprice = -1000
        const response = await request.post("/booking", {
            data : reqBody,
        })

        expect (response.status()).not.toBe(200);
        expect([400, 500]).toContain(response.status());
    });

    test("TC06 - Falhar ao criar reserva com checkIn posterior ao checkOut", async({ request }) => {
        const reqBody = generateBooking();
        reqBody.bookingdates.checkin = "2026-01-01"
        const response = await request.post("/booking", {
            data : reqBody,
        })

        expect (response.status()).not.toBe(200);
    });
});
