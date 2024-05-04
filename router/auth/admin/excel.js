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
        sheet.addRow([
          index + 1,
          `${item_address.dataValues.first_name} ${item_address.dataValues.last_name}`,
          item_address.dataValues.phone,
          `${item_address.dataValues.street} ${item_address.dataValues.tambon} ${item_address.dataValues.states} ${item_address.dataValues.county} ${item_address.dataValues.zipCode}`,
          item_address.zipCode,
          null,
          `#${item.id}`,
        ]);
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

    console.log(order);
    console.log(address);
    if (address && order) {
      sheet.addRow([
        1,
        `${address.dataValues.first_name} ${address.dataValues.last_name}`,
        address.dataValues.phone,
        `${address.dataValues.street} ${address.dataValues.tambon} ${address.dataValues.states} ${address.dataValues.county} ${address.dataValues.zipCode}`,
        address.dataValues.zipCode,
        null,
        `#${order.dataValues.id}`,
      ]);
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
