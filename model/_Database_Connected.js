const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  database: "shop_organic",
  username: "root",
  password: "root",
  port: "3306"

});

module.exports["sequelize"] = sequelize;
