const request = require("supertest");
const app = require("./index");

describe("Medical Bill Upload Service", () => {
  describe("GET /items", () => {
    it("should return an empty array if there are no medical bills", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    it("should return an array of medical bills", async () => {
      const bill = {
        patientName: "John Doe",
        patientAddress: "123 Main St",
        hospitalName: "Hospital A",
        dateOfService: "2022-01-01",
        billAmount: 1000,
      };

      await request(app).post("/items").send(bill).expect(200);

      const res = await request(app).get("/items");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([bill]);
    });
  });

  describe("POST /items", () => {
    it("should return an error if required fields are missing", async () => {
      const res = await request(app).post("/items").send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ error: "Bad Request" });
    });

    it("should return a list of bills", async () => {
      const bill = {
        patientName: "John Doe",
        patientAddress: "123 Main St",
        hospitalName: "Hospital A",
        dateOfService: "2022-01-01",
        billAmount: 1000,
      };

      await request(app).post("/items").send(bill).expect(200);

      const response = await request(app).get("/items");
      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual(bill);
    });
  });
});
