const { Sequelize } = require('sequelize');

// Client-Side
const sequelize = new Sequelize({
    host: 'localhost',
    database: 'shops',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    port: '3306',
    // storage: './model/DB/mydb.sqlite',
    timezone: '+07:00', // for mysql
});
module.exports['sequelize'] = sequelize;

// Admin-Side
const server_sequelize = new Sequelize({
    host: 'localhost',
    database: 'admin',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    port: '3306',
    // storage: './model/DB/mydb_admin.sqlite',
    timezone: '+07:00', // for mysql
});
module.exports['server_sequelize'] = server_sequelize;



