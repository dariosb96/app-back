const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
            name: {
                type:  DataTypes.STRING,
                allowNull: false,
            }, 
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            image: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            imageCloudinary: {
          type: DataTypes.ARRAY(DataTypes.JSON), // Usamos un array de objetos JSON
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        { timestamps: false }
    );
};