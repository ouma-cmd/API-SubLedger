const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./server");

describe("=== Tests SubLedger ===", () => {
  let token;

  const uniqueSuffix = Date.now();

  const testUser = {
    name: "Oumaima Test",
    email: `oumaima_${uniqueSuffix}@gmail.com`,
    password: "12345678",
  };

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("POST /register", async () => {
    const response = await request(app).post("/users/register").send(testUser);

    console.log("REGISTER:");
    console.log(response.statusCode);
    console.log(response.body);

    expect([200, 201]).toContain(response.statusCode);
  });
  test("POST /login success", async () => {
    const response = await request(app).post("/users/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    console.log("LOGIN:");
    console.log(response.statusCode);
    console.log(response.body);

    expect(response.statusCode).toBe(200);
  });

  test("POST /login success", async () => {
    const response = await request(app).post("/users/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    console.log(response.body);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("token");

    token = response.body.token;
  });

  test("GET /admin", async () => {
    const response = await request(app)
      .get("/users/admin")
      .set("Authorization", `Bearer ${token}`);

    expect([200, 401, 403]).toContain(response.statusCode);
  });

  test("POST /subscriptions/post", async () => {
    const response = await request(app)
      .post("/abn/post")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Netflix Premium",
        price: 120,
        currency: "MAD",
        billingCycle: "monthly",
      });

    console.log(response.body);

    expect([200, 201]).toContain(response.statusCode);
  });

  test("GET /subscriptions/my", async () => {
    const response = await request(app)
      .get("/abn/my")
      .set("Authorization", `Bearer ${token}`);

    console.log(response.body);

    expect(response.statusCode).toBe(200);
  });
});
