const { DataTypes } = require('sequelize');
const sequelize = require('./_Database_Connected');

const Order = sequelize.define('order', {

    payment_menthod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount_total: {
        type: DataTypes.DECIMAL(32,2),
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING,
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