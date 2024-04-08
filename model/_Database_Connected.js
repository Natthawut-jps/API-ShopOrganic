const { Sequelize } = require("sequelize");

// Client-Side
const sequelize = new Sequelize(
  "postgres://shops_yjan_user:iW8qTfq9RbhudhrzKwiSVPyYHonBjI1a@dpg-co9kl04f7o1s739aadtg-a.singapore-postgres.render.com/shops_yjan"
);

module.exports["sequelize"] = sequelize;
