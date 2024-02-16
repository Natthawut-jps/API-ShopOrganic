const { DataTypes } = require("sequelize");
const sequelize = require("./_Database_Connected");

const Shipping_address = sequelize.define("shipping_address", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  county: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  states: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tambon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zipCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  satus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = { Shipping_address };
