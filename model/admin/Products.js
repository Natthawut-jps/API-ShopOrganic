const { DataTypes } = require("sequelize");
const { sequelize } = require("../_Database_Connected");

const Product = sequelize.define("produst", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(32, 2),
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
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

module.exports = { Product };
