const { DataTypes } = require("sequelize");
const { sequelize } = require("./_Database_Connected");

const Income = sequelize.define("income", {
  emp_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emp_salary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order_name: {
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
  await sequelize.sync({ force: false });
})();

module.exports = { Income };
