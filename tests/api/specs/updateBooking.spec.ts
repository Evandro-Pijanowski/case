import { test, expect } from "@playwright/test";
import * as credentials from "../utils/credentials.json"
import { generateBooking } from "../utils/bookerJson";

let token: string;
let bookingId: number;
let booking = generateBooking(); 

test.beforeAll(async ({ request }) => {
  const auth = await request.post("/auth", {
    data: credentials,
  });
  token = (await auth.json()).token;
  const newBooking = await request.post("/booking", { data: booking });
  bookingId = (await newBooking.json()).bookingid;
});

test.describe("PUT /booking/:id", () => {
  test("TC07 - Deve atualizar reserva com sucesso", async ({ request }) => {
    
    booking.firstname = "Carla";
    const response = await request.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
      data: booking,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe("Carla");
  });

  test("TC08 -  Deve falhar sem token de autorização", async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      data: booking,
    });
    expect(response.status()).toBe(403);
  });
});
