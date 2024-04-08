const { Sequelize } = require("sequelize");

// Client-Side
const sequelize = new Sequelize(
 "postgres://shops_0kkg_user:W3IJ5Cyjvq4E04oxGKyIS3kGxs1hDj0Z@dpg-co9qiasf7o1s739d8bm0-a/shops_0kkg"
);

module.exports["sequelize"] = sequelize;
