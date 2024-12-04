const { Sequelize } = require('sequelize');

// Set up Sequelize connection
const sequelize = new Sequelize('signupDB', 'root', 'rudransh@1', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
