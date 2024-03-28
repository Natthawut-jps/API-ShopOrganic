const { DataTypes } = require("sequelize");
const { server_sequelize } = require("../_Database_Connected");

const Categories = server_sequelize.define("categories", {
  category_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: true,
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
  await server_sequelize.sync({ force: false });
})();

module.exports = { Categories };
