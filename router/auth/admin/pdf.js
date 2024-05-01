const express = require("express");
const route = express.Router();
const PDFDocument = require("pdfkit");

route.get("/order", async (req, res) => {
  const doc = new PDFDocument({ size: "A4" });
  doc.text(
    "test some successtest some successtest some successtest some success",
    {
      columns: { x: 2, y: 3 },
    }
  );
  doc.pipe(res);
  doc.end();
});

module.exports = route;
