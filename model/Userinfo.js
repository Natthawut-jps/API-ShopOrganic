const { DataTypes } = require("sequelize");
const sequelize = require("./_Database_Connected");

const Userinfo = sequelize.define('userinfo', {
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
});

(async () => {
   await sequelize.sync({ force: false });
  })();
  
  module.exports = { Userinfo };
  