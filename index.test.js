const request = require("supertest");
const app = require("./index");

describe("Medical Bill Upload Service", () => {
  describe("GET /items", () => {
    it("should return a list of medical bills on GET /items", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    it("should return a 400 Bad Request error when missing properties in POST /items", async () => {
      const res = await request(app).post("/items").send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ error: "Bad Request" });
    });
  });

  describe("POST /items", () => {
    it("should create a new medical bill on POST /items", async () => {
      const bill = {
        patientName: "John Doe",
        patientAddress: "123 Main St",
        hospitalName: "General Hospital",
        dateOfService: "2022-12-25",
        billAmount: 100,
      };

      const res = await request(app).post("/items").send(bill);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: "Bill added successfully" });

      const listRes = await request(app).get("/items");
      expect(listRes.statusCode).toEqual(200);
      expect(listRes.body).toEqual([bill]);
    });
  });
});
