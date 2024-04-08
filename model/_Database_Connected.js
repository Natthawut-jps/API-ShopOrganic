const { Sequelize } = require("sequelize");

// Client-Side
const sequelize = new Sequelize({
  host: "dpg-co9kl04f7o1s739aadtg-a",
  database: "shops_yjan",
  username: 'shops_yjan_user',
  password: 'iW8qTfq9RbhudhrzKwiSVPyYHonBjI1a',
  dialect: "postgres",
  port: '5432',
});
module.exports["sequelize"] = sequelize;
