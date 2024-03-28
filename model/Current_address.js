const { DataTypes } = require("sequelize");
const { sequelize } = require("./_Database_Connected");

const Current_address = sequelize.define("current_address", {
  first_name_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  street_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  county_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  states_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tambon_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zipCode_c: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  email_c: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_c: {
    type: DataTypes.INTEGER,
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

module.exports = { Current_address };
