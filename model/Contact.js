const { DataTypes } = require("sequelize");
const { sequelize } = require("./_Database_Connected");

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = { Contact };
