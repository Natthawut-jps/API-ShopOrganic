const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    database: 'mydb',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
});