import { test, expect } from "@playwright/test";
import * as credentials from "../utils/credentials.json"

test.describe("POST /auth - Autenticação", () => {
  test("TC01 - Deve autenticar com credenciais válidas", async ({ request }) => {
    const response = await request.post("/auth", {
      data: credentials,
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
  });

  test("TC02 - Deve falhar com senha incorreta", async ({ request }) => {
    const response = await request.post("/auth", {
      data: { username: "admin", password: "errada" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toContain("Bad credentials");
  });
});