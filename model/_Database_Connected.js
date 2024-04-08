const { Sequelize } = require("sequelize");

// Client-Side
const sequelize = new Sequelize(
  {
    dialect: "postgres",
    host: "dpg-co9qiasf7o1s739d8bm0-a.singapore-postgres.render.com",
    database: "shops_0kkg",
    username: "shops_0kkg_user",
    password: "W3IJ5Cyjvq4E04oxGKyIS3kGxs1hDj0Z",
    port: 5432,
  }
);

module.exports["sequelize"] = sequelize;
