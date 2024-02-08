const { DataTypes } = require("sequelize");
const sequelize = require("./_Database_Connected");

const Transaction = sequelize.define('userinfo', {
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

(async () => {
    sequelize.sync({ force: false });
  })();
  
  module.exports = { Transaction };
  