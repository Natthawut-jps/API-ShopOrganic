const { DataTypes } = require("sequelize");
const { sequelize } = require("./_Database_Connected");

const Product = sequelize.define(
  "produst",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
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
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  { createdAt: true, updatedAt: true, timestamps: true }
);
(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = { Product };
