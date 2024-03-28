const express = require("express");
const route = express.Router();
const { Order } = require("../../../model/Order");

route.get("/sales", async (req, res) => {
  const order = await Order.findAll();
  const year = order.map((item) => item.createdAt.slice(0, 4) === req.query.year);
  if (year) {
    if (order) {
      const data = {
        Jan: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "01" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Feb: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "02" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Mar: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "03" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Apr: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "04" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        May: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "05" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Jun: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "06" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Jul: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "07" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Aug: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "08" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Sep: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "09" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Oct: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "10" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Nov: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "11" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
        Dec: order
          .map(
            (item) =>
              item.createdAt.slice(5, 7) === "12" && parseInt(item.amount_total)
          )
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ),
      };
      return res.status(200).json(data);
    }
  }
});

module.exports = route;
