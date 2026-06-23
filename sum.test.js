const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./server");

describe("=== Tests d’intégration ===", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("POST /users/login -> 400", async () => {
    const response = await request(app).post("/users/login").send({
      email: "email_mach_kayn_ga3@gmail.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(400);
  });
});
