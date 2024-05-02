const express = require("express");
const route = express.Router();
const excel = require("exceljs");
const { Shipping_address } = require("../../..//model/Shipping_address");
const { Order } = require("../../../model/Order");

route.get("/order", async (req, res) => {
  const workbook = new excel.Workbook();
  const file = await workbook.xlsx.readFile(
    "./public/doc/KerryExpressImportTemplate.xlsx"
  );
  if (file) {
    const date = new Date();
    const byOrder = new Date(date.setDate(date.getDate())).toISOString();
    const sheet = workbook.getWorksheet(1);
    const order = await Order.findAll({
      where: { createdAt: byOrder.slice(0, 10) },
    });
    const address_id = order.map((item) => item.address_id);
    const address = await Shipping_address.findAll({
      where: { id: address_id },
    });
    address.map((item, index) => {
      sheet.addRow([
        index + 1,
        `${item.dataValues.first_name} ${item.dataValues.last_name}`,
        item.dataValues.phone,
        `${item.dataValues.street} ${item.dataValues.tambon} ${item.dataValues.states} ${item.dataValues.county} ${item.dataValues.zipCode}`,
        item.zipCode,
        600,
        null,
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
