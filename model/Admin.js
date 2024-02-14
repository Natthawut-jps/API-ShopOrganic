const { DataTypes } = require("sequelize");
const sequelize = require("./_Database_Connected");

const Admin = sequelize.define('admin', {
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
  
  module.exports = { Admin };
  