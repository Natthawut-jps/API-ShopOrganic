const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    database: 'mydb',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    timezone: '+07:00',
});

module.exports = sequelize;