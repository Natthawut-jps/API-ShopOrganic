const { DataTypes } = require("sequelize");
const { sequelize } = require("../_Database_Connected");
const bcrypt = require("bcrypt");

const Admin = sequelize.define('admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        field: 'createdAt',
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      updatedAt: {
        field: 'updatedAt',
        allowNull: false,
        type: DataTypes.DATEONLY,
      }
});

(async () => {
    await sequelize.sync({ force: false }).then(async () => {
      if( (await Admin.findAll()).length > 0) {
        return false;
      } else {
        await Admin.create({
          username: "admin",
          password: (await bcrypt.hash("0000", 10)).toString()
        })
      }
    })
  })();

  module.exports = { Admin };
  