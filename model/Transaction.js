const { DataTypes } = require("sequelize");
const {sequelize} = require("./_Database_Connected");

const Transaction = sequelize.define('trnsaction', {
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
    await sequelize.sync({ force: false });
  })();
  
  module.exports = { Transaction };
  