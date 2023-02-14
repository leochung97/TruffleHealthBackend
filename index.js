const express = require("express");
const app = express();
app.use(express.json());

// Initiate bills array for in-space memory
let bills = [];

// GET Request - Return all bills
app.get("/items", (req, res) => {
  res.status(200).json(bills);
});

// GET Request - Return specific bill
app.get("/items/:id", (req, res) => {
  const bill = bills.find((bill) => bill.id === parseInt(req.params.id));

  if (!bill) {
    return res.status(404).json({ error: "Bill not found" });
  }

  res.status(200).json(bill);
});

// POST Request - Add a new bill only if all required fields are present and fields are valid
app.post("/items", (req, res) => {
  // Destructure the request body to get the required fields
  const {
    patientName,
    patientAddress,
    hospitalName,
    dateOfService,
    billAmount,
  } = req.body;

  // If there are any empty fields, we can return an error stating that there are missing items
  if (
    !patientName ||
    !patientAddress ||
    !hospitalName ||
    !dateOfService ||
    !billAmount
  ) {
    return res.status(400).json({ error: "Missing items on the medical bill" });
  }

  // Individual tests for each field to ensure that they are valid return types
  if (typeof patientName !== "string" || typeof patientAddress !== "string" || typeof hospitalName !== "string" || typeof dateOfService !== "string" || typeof billAmount !== "number") {
    return res.status(400).json({ error: "Invalid field type" });
  }

  // If bill is valid, we can push to bills
  const id = bills.length + 1;
  bills.push({
    id,
    patientName,
    patientAddress,
    hospitalName,
    dateOfService,
    billAmount,
  });

  // Return message that the bill was successfully added.
  res.status(200).json({ message: "Bill has successfully been added!" });
});

// Listening on port 3000
const port = 3000;
app.listen(port, () => {
  // Log to console that the service is up and running
  console.log(`Listening on port ${port}`);
});

module.exports = app;
