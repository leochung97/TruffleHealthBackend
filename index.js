const express = require("express");
const app = express();
app.use(express.json());

let bills = [];

app.get("/items", (req, res) => {
  res.status(200).json(bills);
});

app.post("/items", (req, res) => {
  const {
    patientName,
    patientAddress,
    hospitalName,
    dateOfService,
    billAmount,
  } = req.body;

  if (
    !patientName ||
    !patientAddress ||
    !hospitalName ||
    !dateOfService ||
    !billAmount
  ) {
    return res.status(400).json({ error: "Missing items on the medical bill" });
  }

  bills.push({
    patientName,
    patientAddress,
    hospitalName,
    dateOfService,
    billAmount,
  });

  res.status(200).json({ message: "Bill has successfully been added!" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Medical bill upload service is up and listening on port ${port}`);
});

module.exports = app;
