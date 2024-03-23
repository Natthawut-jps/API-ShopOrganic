const { DataTypes } = require('sequelize');
const { sequelize } = require('./_Database_Connected');

const Cart = sequelize.define('cart', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    categories: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true,
    },
    imgURL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

(async () => {
    await sequelize.sync({ force: false })
})();
module.exports = { Cart }