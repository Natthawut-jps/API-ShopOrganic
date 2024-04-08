const { DataTypes } = require("sequelize");
const { sequelize } = require("../_Database_Connected");

const Admin = sequelize.define('admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        field: 'createdAt',
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      updatedAt: {
        field: 'updatedAt',
        allowNull: false,
        type: DataTypes.DATEONLY
      }
});

(async () => {
    await sequelize.sync({ force: false });
  })();
  
  module.exports = { Admin };
  