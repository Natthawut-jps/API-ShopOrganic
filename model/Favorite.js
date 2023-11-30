const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    database: 'mydb',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
});

const Favorite = sequelize.define('favorite', {
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
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

(async () => {
    await sequelize.sync({ force: false })
})();
module.exports = { Favorite }