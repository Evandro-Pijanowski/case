import { test, expect } from "@playwright/test";
import { generateBooking } from "../utils/bookerJson";
import * as credentials from "../utils/credentials.json";

let token: string;
let bookingId: number;
let booking = generateBooking();

test.beforeAll(async ({ request }) => {
  const auth = await request.post("/auth", {
    data: credentials,
  });
  token = (await auth.json()).token;

  const newBooking = await request.post("/booking", {
    data: booking,
  });
  bookingId = (await newBooking.json()).bookingid;
});

test.describe("DELETE /booking/:id", () => {
  test("TC09 - Deve deletar reserva com sucesso", async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(201);
  });

  test("TC10 - Deve falhar ao deletar reserva inexistente", async ({ request }) => {
    const response = await request.delete(`/booking/999999`, {
      headers: { Cookie: `token=${token}` },
    });
    expect([404, 405]).toContain(response.status());
  });

  test("TC11 - Deve falhar sem autenticação", async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`);
    expect(response.status()).toBe(403);
  });
});