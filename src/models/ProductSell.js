const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajusta el path según tu estructura

module.exports = (sequelize) => { sequelize.define('ProductSell', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: true
});

 };