const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database.js file

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'users', // Ensures the table name matches your MySQL table
    timestamps: false,  // Disables createdAt and updatedAt columns
});

module.exports = User;
