const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Припускаємо, що у вас є налаштований файл підключення до БД

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Product;
