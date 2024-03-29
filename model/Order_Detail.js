const { DataTypes } = require("sequelize");
const { sequelize } = require("./_Database_Connected");

const Order_Detail = sequelize.define("order_detail", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    field: "createdAt",
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  updatedAt: {
    field: "updatedAt",
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
});
(async () => {
  await sequelize.sync({ force: false });
})();
module.exports = { Order_Detail };
