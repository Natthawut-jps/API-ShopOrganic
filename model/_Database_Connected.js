const { Sequelize } = require("sequelize");

// Client-Side
// const sequelize = new Sequelize(
//   "mysql://avnadmin:AVNS_QZSJ00OV-68XQ5kyRrV@mysql-3700c843-natthawut-70ad.d.aivencloud.com:24939/defaultdb?ssl-mode=REQUIRED"
// );
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./model/DB/sqlite.sqlite",
})

module.exports["sequelize"] = sequelize;
