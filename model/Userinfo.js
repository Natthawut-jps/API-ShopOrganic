const { DataTypes } = require("sequelize");
const { sequelize } = require("./_Database_Connected");

const Userinfo = sequelize.define("userinfo", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accept: {
    type: DataTypes.INTEGER,
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
  await sequelize.sync({ force: false });
})();

module.exports = { Userinfo };
