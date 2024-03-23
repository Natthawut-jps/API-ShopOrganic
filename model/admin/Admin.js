const { DataTypes } = require("sequelize");
const { server_sequelize } = require("../_Database_Connected");

const Admin = server_sequelize.define('admin', {
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
    await server_sequelize.sync({ force: false });
  })();
  
  module.exports = { Admin };
  