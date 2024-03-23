const { DataTypes } = require("sequelize");
const { server_sequelize } = require("../_Database_Connected");

const Categories = server_sequelize.define('categories', {
    category_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imgURL: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

(async () => {
    await server_sequelize.sync({ force: false });
  })();
  
  module.exports = { Categories };
  