const { DataTypes } = require('sequelize');
const sequelize = require('./_Database_Connected');

const Order = sequelize.define('order', {
    product_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(2),
    },
    payment_menthod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount_total: {
        type: DataTypes.DECIMAL(2),
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }

});
(async () => {
    await sequelize.sync({ force: false })
})();
module.exports = { Order }