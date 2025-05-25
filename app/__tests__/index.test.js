const request = require("supertest");
const app = require("../index");

test("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.body).toEqual({ status: "UP" });
});
