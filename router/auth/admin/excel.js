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
    const byOrder = new Date(date.setDate(date.getDate() - 1)).toISOString();
    const sheet = workbook.getWorksheet(1);
    const order = await Order.findAll({
      where: { createdAt: byOrder.slice(0, 10) },
    });
    const address_id = order.map((item) => item.address_id);
    const address = await Shipping_address.findAll({
      where: { id: address_id },
    });
    order.map((item, index) => {
      const item_address = address.find(
        (item_a) => item_a.id === item.address_id
      );
      if (item_address.id === item.address_id) {
        const row = [];
        row[1] = index + 1;
        row[2] = `${item_address.dataValues.first_name} ${item_address.dataValues.last_name}`;
        row[3] = item_address.dataValues.phone;
        row[4] = `${item_address.dataValues.street} ${item_address.dataValues.tambon} ${item_address.dataValues.states} ${item_address.dataValues.county} ${item_address.dataValues.zipCode}`;
        row[5] = item_address.dataValues.zipCode;
        row[13] = `#${item.id}`;
        sheet.addRow(row);
      } else {
        console.log("error item incorrect!!");
      }
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

route.post("/order/one", async (req, res) => {
  const workbook = new excel.Workbook();
  const file = await workbook.xlsx.readFile(
    "./public/doc/KerryExpressImportTemplate.xlsx"
  );
  if (file) {
    const sheet = workbook.getWorksheet(1);
    const order = await Order.findOne({ where: { id: req.body.id } });
    const address = await Shipping_address.findOne({
      where: { id: order.dataValues.address_id },
    });

    if (address && order) {
      const row = [];
      row[1] = 1;
      row[2] = `${address.dataValues.first_name} ${address.dataValues.last_name}`;
      row[3] = address.dataValues.phone;
      row[4] = `${address.dataValues.street} ${address.dataValues.tambon} ${address.dataValues.states} ${address.dataValues.county} ${address.dataValues.zipCode}`;
      row[5] = address.dataValues.zipCode;
      row[13] = `#${order.dataValues.id}`;
      sheet.addRow(row);
    } else {
      console.log("error item incorrect!!");
    }
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
