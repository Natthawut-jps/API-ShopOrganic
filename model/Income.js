const { DataTypes } = require("sequelize");
const {sequelize} = require("./_Database_Connected");

const Income = sequelize.define('income', {
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
});

(async () => {
   await sequelize.sync({ force: false });
  })();
  
  module.exports = { Income };
  