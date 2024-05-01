const express = require("express");
const route = express.Router();
const excel = require("exceljs");
const { Shipping_address } = require("../../..//model/Shipping_address");

route.get("/order", async (req, res) => {
  const workbook = new excel.Workbook();
  const file = await workbook.xlsx.readFile("./public/doc/test.xlsx");
  if (file) {
    const sheet = workbook.getWorksheet(1);
    const address = await Shipping_address.findAll();
    address.map((item, index) => {
      sheet.addRow([
        index,
        `${item.dataValues.first_name} ${item.dataValues.last_name}`,
        item.dataValues.phone,
        `${item.dataValues.street} ${item.dataValues.tambon} ${item.dataValues.states} ${item.dataValues.county} ${item.dataValues.zipCode}`,
        item.zipCode,
        600,
      ]);
    });
    // Set up the response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Write the workbook to the response object
    workbook.xlsx.write(res).then(() => res.status(200).end());
  }
});

module.exports = route;
