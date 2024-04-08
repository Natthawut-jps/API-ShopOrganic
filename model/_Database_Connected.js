const { Sequelize } = require("sequelize");

// Client-Side
const sequelize = new Sequelize(
{
    dialect: "sqlite",
    storage: "./DB/sqlite.db"
}
);

module.exports["sequelize"] = sequelize;
