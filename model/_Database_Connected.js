const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    database: 'mydb',
    username: 'root',
    password: 'root',
    dialect: 'sqlite',
    storage: './model/DB/mydb.sqlite',
    // timezone: '+07:00', // for mysql
});

module.exports = sequelize;